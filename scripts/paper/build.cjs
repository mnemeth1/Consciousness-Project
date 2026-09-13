'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {createRequire} = require('node:module');
const {pathToFileURL} = require('node:url');
const C = require('./common.cjs');
// The override is for an offline local preview with preinstalled dependencies.
// Release mode forbids it; CI installs the committed lockfile.
const dep = process.env.PAPER_NODE_MODULES
  ? createRequire(path.join(process.env.PAPER_NODE_MODULES, '__paper__.cjs')) : require;
const normalize = text => text.normalize('NFKC').replace(/[\s\u00ad\u200b]+/gu, '');
function validateMetadata(meta) {
  assert(C.SEMVER.test(meta.version), 'Stable semantic paper-version required (e.g. 2.0.0)');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.date) &&
    new Date(meta.date).toISOString().slice(0, 10) === meta.date, 'Valid ISO paper-date required');
  assert(meta.title && meta.author, 'Title and author metadata required');
}
async function inspectHTML(page, html) {
  assert(!/<meta\b[^>]*\bhttp-equiv\b/i.test(html), 'No meta http-equiv navigation or refresh');
  await page.setContent(html, {waitUntil: 'load'});
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate(requiredIDs => {
    const errors = [];
    const error = (condition, message) => { if (!condition) errors.push(message); };
    const all = [...document.querySelectorAll('*')];
    const meta = name => document.querySelector(`meta[name="${name}"]`)?.content || '';
    const ids = all.map(x => x.id).filter(Boolean);
    error(new Set(ids).size === ids.length, 'Duplicate HTML IDs');
    for (const id of requiredIDs) error(!!document.getElementById(id), `Missing #${id}`);
    error(document.documentElement.lang === 'en', 'Set html lang=en');
    error(meta('viewport').includes('width=device-width'), 'Responsive viewport required');
    error(!document.querySelector('script, iframe, object, embed, form, base, link, audio, video, svg, math'), 'No active, vector, or external document resources');
    error(!document.querySelector('meta[http-equiv]'), 'No meta refresh, including delayed redirects');
    error(!all.some(el => [...el.attributes].some(a => /(^|:)href$/i.test(a.name) &&
      !(el.tagName === 'A' && a.name === 'href'))), 'Only ordinary HTML anchor href attributes');
    error(!all.some(el => [...el.attributes].some(a => /^on/i.test(a.name))), 'No event handlers');
    error(!all.some(el => el.hasAttribute('srcset')), 'No external source sets');
    const css = [...document.querySelectorAll('style')].map(x => x.textContent).join('\n');
    error(/@media\s+print/.test(css) && /@page/.test(css), 'Embedded print CSS and @page required');
    error(!/@import/i.test(css), 'No CSS imports');
    const allCSS = css + all.map(x => x.getAttribute('style') || '').join('\n');
    for (const match of allCSS.matchAll(/url\(\s*['"]?([^)'"\s]+)/gi)) error(match[1].startsWith('data:'), 'Only embedded CSS resources');
    for (const el of all.filter(x => x.hasAttribute('src'))) {
      error(el.tagName === 'IMG' && /^data:image\/(png|jpeg|webp);base64,/.test(el.getAttribute('src')), 'Only embedded raster images');
      error(!!el.getAttribute('alt'), 'Images require meaningful alt text');
    }
    const download = document.getElementById('download-pdf');
    error(download?.tagName === 'A' && download.getAttribute('href') === 'paper.pdf' &&
      download.hasAttribute('download'), 'Download link must be #download-pdf href=paper.pdf download');
    const paper = document.querySelector('main#paper');
    error(!!paper, 'Main research article must be main#paper');
    error(!paper?.querySelector('.screen-only, [hidden]'), 'Do not hide substantive main text');
    error(document.querySelectorAll('h1').length === 1, 'One title h1 required');
    error(document.getElementById('paper-title')?.textContent.trim() === document.title.trim(), 'Visible title and metadata differ');
    error(document.getElementById('paper-version')?.textContent.trim() === meta('paper-version'), 'Visible version differs');
    error(document.getElementById('paper-date')?.textContent.trim() === meta('paper-date'), 'Visible date differs');
    error(['draft', 'reviewed'].includes(meta('paper-stage')), 'paper-stage must be draft or reviewed');
    const statusText = meta('paper-stage') === 'draft' ? 'Draft: P2R20 and P2G2 pending' : 'Reviewed research synthesis';
    error(document.getElementById('publication-status')?.textContent.trim() === statusText, 'Visible publication status differs');
    const external = [];
    const internal = [];
    for (const a of document.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      if (a.id === 'download-pdf') continue;
      if (href.startsWith('#')) {
        error(!!document.getElementById(decodeURIComponent(href.slice(1))), `Broken citation/section ${href}`);
        if (paper?.contains(a)) internal.push(decodeURIComponent(href.slice(1)));
      } else {
        error(/^https:\/\//.test(href), `Only HTTPS or internal reference links: ${href}`);
        if (paper?.contains(a)) external.push(href);
      }
    }
    const chunks = paper ? [...paper.querySelectorAll('h1,h2,h3,h4,p,li,caption,th,td,figcaption')]
      .filter(el => !el.querySelector('p,li,table'))
      .map(el => el.textContent.trim()).filter(Boolean) : [];
    error(chunks.length >= 10, 'Substantive sections need semantic text blocks');
    return {errors, title: document.title.trim(), author: meta('author'), version: meta('paper-version'),
      date: meta('paper-date'), stage: meta('paper-stage'), fixture: meta('paper-fixture') === 'true', chunks,
      external: [...new Set(external)], internal};
  }, C.requiredIDs);
  assert.deepEqual(info.errors, [], 'HTML contract errors: ' + info.errors.join('; '));
  validateMetadata(info);
  return info;
}
async function extractPDF(bytes) {
  const pdfjs = await import(pathToFileURL(dep.resolve('pdfjs-dist/legacy/build/pdf.mjs')).href);
  const doc = await pdfjs.getDocument({data: new Uint8Array(bytes), isEvalSupported: false, useSystemFonts: false}).promise;
  const pages = [], annotations = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    pages.push((await page.getTextContent()).items.map(x => x.str || '').join(' '));
    annotations.push(...await page.getAnnotations());
  }
  const outline = await doc.getOutline();
  const metadata = await doc.getMetadata();
  const internalDestinations = {};
  for (const name of new Set(annotations.map(a => a.dest).filter(dest => typeof dest === 'string'))) {
    const destination = await doc.getDestination(name);
    let pageIndex = null;
    if (Array.isArray(destination) && destination.length) {
      try { pageIndex = Number.isInteger(destination[0]) ? destination[0] : await doc.getPageIndex(destination[0]); }
      catch { /* An unresolved target remains null and fails expected-target validation. */ }
    }
    internalDestinations[name] = Number.isInteger(pageIndex) && pageIndex >= 0 && pageIndex < doc.numPages ? pageIndex : null;
  }
  await doc.destroy();
  return {pages, annotations, outline, metadata, internalDestinations};
}
async function verifyPDF(bytes, info) {
  const extracted = await extractPDF(bytes);
  // Generated page footers can fall between two parts of one semantic paragraph.
  // Verify each exact trailing footer before removing only that known printer text.
  const bodyPages = extracted.pages.map((pageText, index) => {
    const footer = new RegExp(`\\s*Page\\s+${index + 1}\\s+of\\s+${extracted.pages.length}\\s*$`);
    assert(footer.test(pageText), 'PDF generated trailing page footer missing');
    return pageText.replace(footer, '');
  });
  const text = normalize(bodyPages.join(' '));
  const missing = info.chunks.filter(chunk => !text.includes(normalize(chunk)));
  assert.deepEqual(missing, [], 'PDF omitted or changed HTML text blocks');
  assert(text.includes(normalize(info.version)) && text.includes(normalize(info.date)), 'PDF version/date missing');
  const expectedInternal = [...new Set(info.internal)];
  for (const target of expectedInternal) {
    assert(extracted.annotations.some(a => a.dest === target) &&
      Number.isInteger(extracted.internalDestinations[target]), `PDF lost expected internal target: #${target}`);
  }
  for (const url of info.external) assert(extracted.annotations.some(a => a.url === url), `PDF lost external citation: ${url}`);
  assert(extracted.outline?.length > 0, 'PDF heading outline missing');
  assert.equal(extracted.metadata.info.Title, info.title, 'PDF title metadata mismatch');
  for (let i = 0; i < extracted.pages.length; i++) {
    assert(normalize(extracted.pages[i]).includes(`Page${i + 1}of${extracted.pages.length}`), 'PDF page footer missing');
  }
  return {pages: extracted.pages.length, text_blocks_checked: info.chunks.length,
    external_links_checked: info.external.length, internal_links_present: info.internal.length > 0,
    internal_named_targets_checked: expectedInternal, internal_html_anchor_occurrences: info.internal.length,
    internal_link_scope: 'Every distinct expected target in main#paper has a PDF link annotation and resolves to an actual PDF page. Repeated occurrences/annotation geometry are not proven equivalent.',
    title_version_date_and_page_numbers: true, outline_present: true,
    text_correspondence: 'Every semantic leaf block in main#paper is present in extracted PDF text. This does not replace visual review.'};
}
async function build({root = C.ROOT, source = 'paper/paper.html', out = '.paper-build/site',
  mode = 'preview', commit = '0'.repeat(40), fixture = false} = {}) {
  assert(['preview', 'release', 'draft-release'].includes(mode));
  assert(C.COMMIT.test(commit), 'Source commit must be 40 lowercase hexadecimal characters');
  if (mode !== 'preview') {
    assert(!fixture && !process.env.PAPER_NODE_MODULES && !process.env.PAPER_BROWSER_EXECUTABLE,
      'No fixture or local dependency/browser overrides in release mode');
    assert.equal(source, 'paper/paper.html', 'Release only canonical paper');
    assert.equal(path.resolve(root), C.ROOT, 'Release root must be the checked-out repository');
    assert.notEqual(commit, '0'.repeat(40), 'Real source commit required');
  }
  const html = C.regular(C.inside(root, source));
  const htmlHash = C.sha(html), rendererHash = C.recipe();
  const toolchain = C.readJSON(path.join(__dirname, 'toolchain.json'));
  assert.equal(dep('playwright/package.json').version, toolchain.playwright, 'Playwright pin mismatch');
  assert.equal(dep('pdf-lib/package.json').version, toolchain.pdf_lib, 'pdf-lib pin mismatch');
  assert.equal(dep('pdfjs-dist/package.json').version, toolchain.pdfjs_dist, 'PDF parser pin mismatch');
  const target = C.inside(root, out);
  assert(!fs.existsSync(target) || fs.readdirSync(target).length === 0, 'Output must be fresh and empty; never reuse a stale PDF');
  const browser = await dep('playwright').chromium.launch({headless: true,
    executablePath: process.env.PAPER_BROWSER_EXECUTABLE || undefined});
  let info, review, draft, pdfBytes, verification, browserVersion;
  try {
    browserVersion = browser.version();
    const context = await browser.newContext({javaScriptEnabled: false, locale: 'en-US', timezoneId: 'UTC',
      viewport: {width: 1000, height: 900}, serviceWorkers: 'block'});
    const network = [];
    await context.route('**/*', route => { network.push(route.request().url()); return route.abort(); });
    const page = await context.newPage();
    info = await inspectHTML(page, html.toString('utf8'));
    assert.equal(info.fixture, fixture, 'Fixture flag mismatch');
    // PR previews validate an existing draft authorization without acquiring publication permissions.
    if (source === 'paper/paper.html' && C.status(root).state === 'draft-candidate')
      draft = C.validateDraft(root, info, htmlHash, rendererHash);
    if (mode !== 'preview') {
      assert.equal(process.platform + '-' + process.arch, toolchain.ci_platform, 'Release must use pinned CI platform');
      assert.equal(process.versions.node, toolchain.node, 'Release Node pin mismatch');
      if (mode === 'release') review = C.validateReview(root, info, htmlHash, rendererHash);
      else assert(draft, 'Explicit draft publication authorization required');
    }
    await page.emulateMedia({media: 'print', reducedMotion: 'reduce'});
    await page.evaluate(() => document.fonts.ready);
    const raw = await page.pdf({format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: '<div style="font-family:Arial,sans-serif;font-size:8px;text-align:center;width:100%;color:#555">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      margin: {top: '20mm', bottom: '22mm', left: '19mm', right: '19mm'}, tagged: true, outline: true});
    assert.deepEqual(network, [], 'HTML attempted external resource requests');
    const {PDFDocument, PDFHexString} = dep('pdf-lib');
    const pdf = await PDFDocument.load(raw, {updateMetadata: false});
    const date = new Date(info.date + 'T00:00:00.000Z');
    pdf.setCreationDate(date); pdf.setModificationDate(date);
    pdf.setTitle(info.title); pdf.setAuthor(info.author);
    pdf.setCreator('Consciousness Project HTML renderer');
    pdf.setProducer(`Chromium ${browserVersion}; pdf-lib ${toolchain.pdf_lib}`);
    pdf.context.trailerInfo.ID = [PDFHexString.of(htmlHash.slice(0, 32)), PDFHexString.of(htmlHash.slice(0, 32))];
    pdfBytes = Buffer.from(await pdf.save({useObjectStreams: false, addDefaultPage: false}));
    verification = await verifyPDF(pdfBytes, info);
    if (mode === 'release') assert.equal(C.sha(pdfBytes), review.pdf_sha256, 'Generated PDF differs from the reviewed Linux PDF');
  } finally { await browser.close(); }
  const manifest = {schema: 1, version: info.version, date: info.date, title: info.title, stage: info.stage,
    mode, fixture, source_commit: commit, html_sha256: htmlHash, pdf_sha256: C.sha(pdfBytes),
    renderer_sha256: rendererHash, review_sha256: review ? C.sha(C.regular(path.join(root, 'paper/reviewed-release.json'))) : null,
    draft_authorization_sha256: draft ? C.sha(C.regular(path.join(root, 'paper/draft-release.json'))) : null,
    ...(draft ? {scientific_acceptance: false, draft: {status: draft.status, author: draft.author,
      publication_authorized_by: draft.publication_authorized_by, authorization: draft.authorization,
      pending_reviews: draft.pending_reviews}} : {}),
    toolchain: {...toolchain, actual_browser: browserVersion, actual_platform: process.platform + '-' + process.arch,
      actual_node: process.versions.node}, verification,
    review: review ? {review_id: review.review_id, reviewer: review.reviewer, gate_id: review.gate_id,
      adjudicator: review.adjudicator, reviewed_at: review.reviewed_at, records: review.records} : null};
  fs.mkdirSync(target, {recursive: true});
  fs.writeFileSync(path.join(target, 'index.html'), html);
  fs.writeFileSync(path.join(target, 'paper.pdf'), pdfBytes);
  C.writeJSON(path.join(target, 'release.json'), manifest);
  validatePair(target, {allowPreview: mode === 'preview'});
  return manifest;
}
function validatePair(directory, {allowPreview = false} = {}) {
  assert.deepEqual(fs.readdirSync(directory).sort(), ['index.html', 'paper.pdf', 'release.json'], 'Publish exactly the paired paper and manifest; no source library');
  const manifest = C.readJSON(path.join(directory, 'release.json'));
  assert.equal(manifest.schema, 1);
  assert(C.SEMVER.test(manifest.version) && C.COMMIT.test(manifest.source_commit), 'Manifest identity invalid');
  assert.equal(C.sha(C.regular(path.join(directory, 'index.html'))), manifest.html_sha256, 'HTML/manifest hash mismatch');
  assert.equal(C.sha(C.regular(path.join(directory, 'paper.pdf'))), manifest.pdf_sha256, 'Stale or corrupted PDF');
  assert(C.regular(path.join(directory, 'paper.pdf')).subarray(0, 5).equals(Buffer.from('%PDF-')), 'Expected generated PDF');
  if (!allowPreview) {
    assert(['release', 'draft-release'].includes(manifest.mode), 'Preview cannot be published');
    assert.equal(manifest.fixture, false, 'Fixture cannot be published');
    if (manifest.mode === 'release') {
      assert(C.HASH.test(manifest.review_sha256) && manifest.review?.gate_id === 'P2G2', 'Reviewed release required');
      assert(!manifest.draft_authorization_sha256, 'No mixed draft/reviewed provenance');
    } else {
      assert(C.HASH.test(manifest.draft_authorization_sha256) && manifest.draft?.status === 'authorized-draft', 'Draft publication authorization required');
      assert.equal(manifest.scientific_acceptance, false, 'Working draft is not scientifically accepted');
      assert.equal(manifest.stage, 'draft');
      assert.equal(manifest.review_sha256, null); assert.equal(manifest.review, null);
      assert.deepEqual(manifest.draft.pending_reviews, ['P2R20', 'P2G2']);
      assert(/^Phase 2 working draft(?:[: -]|$)/.test(manifest.title), 'Working-draft label required');
    }
  }
  return manifest;
}
module.exports = {build, validatePair, validateMetadata, inspectHTML, verifyPDF, extractPDF};
