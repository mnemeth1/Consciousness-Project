'use strict';
const {test, before, after} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');
const C = require('../scripts/paper/common.cjs');
const B = require('../scripts/paper/build.cjs');
const {publishPair} = require('../scripts/paper/release.cjs');
const dep = process.env.PAPER_NODE_MODULES ? createRequire(path.join(process.env.PAPER_NODE_MODULES, '__test__.cjs')) : require;
const base = path.join(C.ROOT, '.paper-build');
const run = path.join(base, 'tests-' + Date.now());
const fixture = fs.readFileSync(path.join(C.ROOT, 'tests/fixtures/pipeline.html'), 'utf8');
let browser, page, built, fixtureDir;
const commit = '1'.repeat(40), hash = 'a'.repeat(64);
before(async () => {
  fs.mkdirSync(run, {recursive: true});
  browser = await dep('playwright').chromium.launch({executablePath: process.env.PAPER_BROWSER_EXECUTABLE || undefined});
  const context = await browser.newContext({javaScriptEnabled: false});
  await context.route('**/*', route => route.abort());
  page = await context.newPage();
});
after(async () => browser?.close());
test('absent paper is waiting and an orphan review is an error', () => {
  const root = path.join(run, 'waiting'); fs.mkdirSync(root);
  assert.equal(C.status(root).state, 'waiting');
  fs.mkdirSync(path.join(root, 'paper')); fs.writeFileSync(path.join(root, 'paper/reviewed-release.json'), '{}');
  assert.throws(() => C.status(root), /without paper/);
});
test('missing or stale PDF download link fails before rendering', async () => {
  await assert.rejects(B.inspectHTML(page, fixture.replace('href="paper.pdf"', 'href="old.pdf"')), /Download link/);
  await assert.rejects(B.inspectHTML(page, fixture.replace('id="download-pdf"', 'id="wrong"')), /download-pdf/);
});
test('missing version/date and broken internal references fail', async () => {
  await assert.rejects(B.inspectHTML(page, fixture.replace('name="paper-version"', 'name="wrong"')), /version/);
  await assert.rejects(B.inspectHTML(page, fixture.replace('href="#ref-example"', 'href="#absent"')), /Broken citation/);
  assert.throws(() => B.validateMetadata({title: 'test', author: 'test', version: '2.0.0', date: '2026-02-30'}), /date/);
});
test('active content, remote styles and file access are rejected', async () => {
  for (const bad of ['<script>throw Error("should not run")</script>', '<link rel="stylesheet" href="https://example.org/style.css">',
    '<img src="' + 'fi' + 'le:///forbidden" alt="bad">']) {
    await assert.rejects(B.inspectHTML(page, fixture.replace('</head>', bad + '</head>')), /contract errors/);
  }
  await assert.rejects(B.inspectHTML(page, fixture.replace('</head>', '<meta http-equiv="refresh" content="120;url=https://example.org/"></head>')), /refresh/);
  await assert.rejects(B.inspectHTML(page, fixture.replace('</main>', '<svg><use xlink:href="https://example.org/image.svg"/></svg></main>')), /anchor href/);
});
function reviewRoot(name) {
  const root = path.join(run, name); fs.mkdirSync(path.join(root, 'paper/reviews'), {recursive: true});
  const review = {schema: 1, status: 'approved', version: '2.0.0', date: '2026-09-13', stage: 'reviewed', fixture: false,
    html_sha256: hash, renderer_sha256: hash, pdf_sha256: hash, author: 'fixture-author', reviewer: 'fixture-reviewer',
    adjudicator: 'fixture-adjudicator', review_id: 'P2R20', review_verdict: 'accept', gate_id: 'P2G2',
    gate_status: 'accepted', reviewed_at: '2026-09-13T00:00:00Z', records: [],
    presentation: {scientifically_reviewed_html_sha256: hash, published_html_sha256: hash}};
  for (const id of ['P2R20', 'P2G2']) {
    const file = `paper/reviews/${id}.json`;
    C.writeJSON(path.join(root, file), {id, version: review.version, html_sha256: hash,
      status: id === 'P2R20' ? 'accept' : 'accepted', summary: 'Synthetic record used only in unit tests.'});
    review.records.push({id, path: file, sha256: C.sha(fs.readFileSync(path.join(root, file)))});
  }
  C.writeJSON(path.join(root, 'paper/reviewed-release.json'), review);
  fs.writeFileSync(path.join(root, 'paper/CHANGELOG.md'), '## 2.0.0 - 2026-09-13\n\nSynthetic release-gate validation fixture only.\n');
  return {root, review};
}
test('review binds HTML, renderer, version, date and independent final gates', () => {
  const {root, review} = reviewRoot('review');
  assert.equal(C.validateReview(root, review, hash, hash).status, 'approved');
  assert.throws(() => C.validateReview(root, review, 'b'.repeat(64), hash), /HTML hash/);
  assert.throws(() => C.validateReview(root, review, hash, 'b'.repeat(64)), /renderer hash/);
  assert.throws(() => C.validateReview(root, {...review, version: '2.0.1'}, hash, hash), /version/);
  assert.throws(() => C.validateReview(root, {...review, date: '2026-09-14'}, hash, hash), /date/);
  C.writeJSON(path.join(root, 'paper/reviewed-release.json'), {...review, reviewer: review.author});
  assert.throws(() => C.validateReview(root, review, hash, hash), /Author cannot/);
});
test('missing review, changelog and altered review evidence fail', () => {
  const {root, review} = reviewRoot('missing-review');
  fs.renameSync(path.join(root, 'paper/CHANGELOG.md'), path.join(root, 'paper/change.saved'));
  assert.throws(() => C.validateReview(root, review, hash, hash), /ENOENT/);
  fs.renameSync(path.join(root, 'paper/reviewed-release.json'), path.join(root, 'paper/review.saved'));
  assert.throws(() => C.validateReview(root, review, hash, hash), /ENOENT/);
  fs.renameSync(path.join(root, 'paper/review.saved'), path.join(root, 'paper/reviewed-release.json'));
  fs.writeFileSync(path.join(root, 'paper/reviews/P2R20.json'), '{}');
  assert.throws(() => C.validateReview(root, review, hash, hash), /evidence hash/);
});
test('successful fixture prints every text block, links, outline and page footer', async () => {
  const out = path.relative(C.ROOT, path.join(run, 'fixture')).split(path.sep).join('/');
  fixtureDir = path.join(C.ROOT, out);
  built = await B.build({source: 'tests/fixtures/pipeline.html', out, fixture: true});
  assert(built.verification.pages >= 2);
  assert(built.verification.text_blocks_checked >= 20);
  C.writeJSON(path.join(base, 'fixture-location.json'), {directory: path.relative(C.ROOT, fixtureDir).split(path.sep).join('/'), manifest: built});
  assert.throws(() => B.validatePair(fixtureDir), /Preview/);
});
test('identical local toolchain produces identical PDF bytes on a second fresh render', async () => {
  const out = path.relative(C.ROOT, path.join(run, 'repeat')).split(path.sep).join('/');
  const repeated = await B.build({source: 'tests/fixtures/pipeline.html', out, fixture: true});
  assert.equal(repeated.pdf_sha256, built.pdf_sha256, 'PDF rendering is not byte-stable');
  await assert.rejects(B.build({source: 'tests/fixtures/pipeline.html', out, fixture: true}), /fresh and empty/);
});
test('portable S03 preview writes only its separate root while using the locked renderer', async () => {
  const root = path.join(run, 'portable'); fs.mkdirSync(root);
  fs.writeFileSync(path.join(root, 'paper.html'), fixture);
  const result = await B.build({root, source: 'paper.html', out: 'render', fixture: true});
  assert.equal(result.pdf_sha256, built.pdf_sha256);
  assert.equal(C.sha(fs.readFileSync(path.join(root, 'render/index.html'))), built.html_sha256);
  assert.deepEqual(fs.readdirSync(root).sort(), ['paper.html', 'render']);
});
function linkProbe(name, style = '', css = '') {
  const root = path.join(run, name); fs.mkdirSync(root);
  const html = fixture.replace('<section id="methods">', `<p>Continue to <a href="#discussion" ${style}>Discussion</a>.</p><section id="methods">`)
    .replace('</style>', `${css}\n</style>`);
  fs.writeFileSync(path.join(root, 'paper.html'), html);
  return {root, source: 'paper.html', out: 'site', fixture: true};
}
test('multiple internal PDF targets each have an annotation resolving to a page', async () => {
  const options = linkProbe('links-normal');
  const result = await B.build(options);
  assert.deepEqual(result.verification.internal_named_targets_checked, ['ref-example', 'discussion']);
  assert.equal(result.verification.internal_html_anchor_occurrences, 2);
  const extracted = await B.extractPDF(fs.readFileSync(path.join(options.root, 'site/paper.pdf')));
  assert.equal(extracted.internalDestinations.discussion, 1);
  const screenOnly = await B.build(linkProbe('links-screen-only', '', '@media screen { a { display: contents } }'));
  assert.deepEqual(screenOnly.verification.internal_named_targets_checked, ['ref-example', 'discussion']);
});
test('default display:contents cannot silently lose a second internal PDF target', async () => {
  await assert.rejects(B.build(linkProbe('links-default-contents', 'style="display: contents"')),
    /PDF lost expected internal target: #discussion/);
});
test('print-only display:contents cannot bypass internal PDF target verification', async () => {
  await assert.rejects(B.build(linkProbe('links-print-contents', '', '@media print { a { display: contents } }')),
    /PDF lost expected internal target/);
  await assert.rejects(B.build(linkProbe('links-print-second-only', '', '@media print { a[href="#discussion"] { display: contents } }')),
    /PDF lost expected internal target: #discussion/);
});
test('a semantic paragraph spanning PDF pages passes without generated footer contamination', async () => {
  const root=path.join(run,'split-paragraph');fs.mkdirSync(root);
  const paragraph=Array.from({length:1000},(_,i)=>`continuity${i}`).join(' ');
  const html=fixture.replace('</section>\n<section id="conclusion">',`<p>${paragraph}</p></section>\n<section id="conclusion">`);
  assert(html.includes(paragraph));fs.writeFileSync(path.join(root,'paper.html'),html);
  const result=await B.build({root,source:'paper.html',out:'site',fixture:true});
  assert(result.verification.pages>2);
  const extracted=await B.extractPDF(fs.readFileSync(path.join(root,'site/paper.pdf')));
  assert(!extracted.pages.some(page=>page.replace(/\s+/g,'').includes(paragraph.replace(/\s+/g,''))), 'Regression paragraph must actually span pages');
});
function draftRoot(name) {
  const root = path.join(run, name); fs.mkdirSync(path.join(root, 'paper'), {recursive: true});
  const title = 'Phase 2 working draft: synthetic release test';
  const html = fixture.replaceAll('Pipeline fixture: no research findings', title)
    .replaceAll('0.0.1', '0.2.0').replace('name="paper-fixture" content="true"', 'name="paper-fixture" content="false"');
  fs.writeFileSync(path.join(root, 'paper/paper.html'), html);
  const meta = {version: '0.2.0', date: '2026-09-13', stage: 'draft', title};
  const draft = {schema: 1, status: 'authorized-draft', version: meta.version, date: meta.date,
    html_sha256: C.sha(html), renderer_sha256: C.recipe(), fixture: false, scientific_acceptance: false,
    pending_reviews: ['P2R20', 'P2G2'], author: 'Synthetic test author', publication_authorized_by: 'Synthetic test authorizer',
    authorization: 'Synthetic authorization used only by local tests; no remote publication occurs.'};
  C.writeJSON(path.join(root, 'paper/draft-release.json'), draft);
  fs.writeFileSync(path.join(root, 'paper/CHANGELOG.md'), '## 0.2.0 - 2026-09-13\n\nSynthetic draft-release regression fixture only.\n');
  return {root, meta, draft};
}
test('working draft requires explicit matching authorization and honest pending labels', () => {
  const {root, meta, draft} = draftRoot('draft-guards');
  assert.equal(C.status(root).state, 'draft-candidate');
  assert.equal(C.validateDraft(root, meta, draft.html_sha256, draft.renderer_sha256).scientific_acceptance, false);
  assert.throws(() => C.validateDraft(root, meta, hash, draft.renderer_sha256), /HTML hash/);
  assert.throws(() => C.validateDraft(root, meta, draft.html_sha256, hash), /renderer hash/);
  assert.throws(() => C.validateDraft(root, {...meta,version:'0.2.1'}, draft.html_sha256,draft.renderer_sha256), /version/);
  assert.throws(() => C.validateDraft(root, {...meta,title:'Final reviewed paper'}, draft.html_sha256,draft.renderer_sha256), /conspicuously/);
  assert.throws(() => C.validateDraft(root, {...meta,stage:'reviewed'}, draft.html_sha256,draft.renderer_sha256), /draft stage/);
  C.writeJSON(path.join(root, 'paper/draft-release.json'), {...draft,scientific_acceptance:true});
  assert.throws(() => C.validateDraft(root,meta,draft.html_sha256,draft.renderer_sha256), /scientific acceptance/);
  C.writeJSON(path.join(root,'paper/reviewed-release.json'),{});
  assert.throws(() => C.status(root), /cannot coexist/);
  assert.throws(() => C.validateReview(root,meta,draft.html_sha256,draft.renderer_sha256), /cannot coexist/);
});
let authorizedDraft;
test('authorized draft PR preview retains pending reviews and requires no reviewed PDF hash', async () => {
  const {root,draft} = draftRoot('draft-preview');
  const manifest = await B.build({root, source:'paper/paper.html', out:'site', mode:'preview',commit});
  assert.equal(manifest.mode, 'preview');
  assert.equal(manifest.stage, 'draft'); assert.equal(manifest.scientific_acceptance, false);
  assert.equal(manifest.review, null); assert.equal(manifest.review_sha256,null);
  assert.deepEqual(manifest.draft.pending_reviews,['P2R20','P2G2']);
  assert.equal(manifest.draft_authorization_sha256,C.sha(fs.readFileSync(path.join(root,'paper/draft-release.json'))));
  assert.equal(draft.pdf_sha256,undefined);
  assert.throws(() => B.validatePair(path.join(root,'site')), /Preview/);
  authorizedDraft = {directory:path.join(root,'site'), manifest};
});
function pair(name) {
  const directory = path.join(run, name); fs.cpSync(fixtureDir, directory, {recursive: true});
  const manifest = {...built, fixture: false, mode: 'release', source_commit: commit, review_sha256: hash,
    review: {gate_id: 'P2G2'}};
  C.writeJSON(path.join(directory, 'release.json'), manifest);
  return {directory, manifest};
}
test('stale PDF, extra source PDF and mismatched HTML hash fail artifact validation', () => {
  const {directory} = pair('badpair');
  fs.appendFileSync(path.join(directory, 'paper.pdf'), 'stale');
  assert.throws(() => B.validatePair(directory), /Stale/);
  fs.writeFileSync(path.join(directory, 'unrelated.pdf'), 'not a publication PDF');
  assert.throws(() => B.validatePair(directory), /exactly/);
  const other = pair('badhtml'); fs.appendFileSync(path.join(other.directory, 'index.html'), '\nchanged');
  assert.throws(() => B.validatePair(other.directory), /HTML\/manifest/);
});
function mockGitHub(initial = []) {
  const releases = structuredClone(initial), assets = new Map(), tags = new Map();
  let serial = 1, head = commit;
  const calls = [];
  const api = async (method, route, body, binary) => {
    calls.push({method, route});
    if (method === 'GET' && route === '/git/ref/heads/main') return {object: {sha: head, type: 'commit'}};
    if (method === 'GET' && route.startsWith('/releases?')) return releases;
    if (method === 'GET' && route.startsWith('/git/ref/tags/')) {
      const sha = tags.get(route.split('/').pop()); return sha ? {object: {sha, type: 'commit'}} : null;
    }
    if (method === 'POST' && route === '/releases') {
      const release = {...body, id: serial++, assets: [], upload_url: 'https://uploads.github.com/mock{?name}'};
      releases.push(release); return release;
    }
    if (method === 'POST' && route.startsWith('https://uploads.github.com/')) {
      const name = new URL(route).searchParams.get('name'), url = 'https://api.github.com/asset/' + serial++;
      assets.set(url, Buffer.from(body));
      const asset = {name, url}; releases.at(-1).assets.push(asset); return asset;
    }
    if (method === 'GET' && binary) return assets.get(route);
    if (method === 'PATCH') {
      const release = releases.find(x => route.endsWith('/' + x.id)); Object.assign(release, body);
      tags.set(release.tag_name, release.target_commitish); return release;
    }
    throw Error('Unexpected mock request ' + method + ' ' + route);
  };
  return {api, calls, releases, assets, setHead: value => {head = value;}};
}
test('release uploads a complete draft, verifies bytes, publishes once, reruns idempotently', async () => {
  const {directory} = pair('publish'); const mock = mockGitHub();
  const result = await publishPair({directory, api: mock.api, commit});
  assert.equal(result.tag, 'paper-v0.0.1');
  assert.equal(mock.releases[0].draft, false); assert.equal(mock.releases[0].assets.length, 3);
  const mutations = mock.calls.filter(x => x.method !== 'GET').length;
  await publishPair({directory, api: mock.api, commit});
  assert.equal(mock.calls.filter(x => x.method !== 'GET').length, mutations, 'Rerun mutated published release');
  const nextCommit = '2'.repeat(40); mock.setHead(nextCommit);
  const next = C.readJSON(path.join(directory, 'release.json')); next.source_commit = nextCommit;
  C.writeJSON(path.join(directory, 'release.json'), next);
  await publishPair({directory, api: mock.api, commit: nextCommit});
  assert.equal(C.readJSON(path.join(directory, 'release.json')).source_commit, commit, 'Preserve original released commit');
});
test('changed HTML or renderer cannot reuse an already released version', async () => {
  const {directory} = pair('reuse'); const mock = mockGitHub();
  await publishPair({directory, api: mock.api, commit});
  const next = C.readJSON(path.join(directory, 'release.json'));
  fs.appendFileSync(path.join(directory, 'index.html'), '\nchanged');
  next.html_sha256 = C.sha(fs.readFileSync(path.join(directory, 'index.html')));
  C.writeJSON(path.join(directory, 'release.json'), next);
  await assert.rejects(publishPair({directory, api: mock.api, commit}), /cannot be reused.*html/);
  const unchanged = pair('reuse-renderer'); const changed = {...unchanged.manifest, renderer_sha256: hash};
  C.writeJSON(path.join(unchanged.directory, 'release.json'), changed);
  await assert.rejects(publishPair({directory: unchanged.directory, api: mock.api, commit}), /cannot be reused.*renderer/);
});
test('source-commit mismatch, stale main and older release never publish', async () => {
  const {directory} = pair('wrongcommit'); const mock = mockGitHub();
  await assert.rejects(publishPair({directory, api: mock.api, commit: '2'.repeat(40)}), /source commit/);
  mock.setHead('2'.repeat(40));
  await assert.rejects(publishPair({directory, api: mock.api, commit}), /Obsolete/);
  const newer = mockGitHub([{tag_name: 'paper-v2.0.0', draft: false}]);
  await assert.rejects(publishPair({directory, api: newer.api, commit}), /Older released version/);
  assert.equal(newer.calls.filter(x => x.method !== 'GET').length, 0);
});
test('authorized working draft publishes as a labelled prerelease and preserves immutable guards', async () => {
  // Exercise publication mechanics with a mock API only. This fixture is never remotely published.
  const {directory,manifest}=authorizedDraft;
  C.writeJSON(path.join(directory,'release.json'),{...manifest,mode:'draft-release'});
  const mock=mockGitHub();
  const result=await publishPair({directory,api:mock.api,commit});
  assert.equal(result.tag,'paper-v0.2.0');
  assert.equal(mock.releases[0].prerelease,true); assert.equal(mock.releases[0].draft,false);
  assert.equal(mock.releases[0].make_latest,'false');
  assert.match(mock.releases[0].name,/^Phase 2 working draft/);
  assert.match(mock.releases[0].body,/scientific acceptance is false/);
  assert.match(mock.releases[0].body,/P2R20 and P2G2 remain pending/);
  await publishPair({directory,api:mock.api,commit});
  const changed=C.readJSON(path.join(directory,'release.json')); changed.draft_authorization_sha256=hash;
  C.writeJSON(path.join(directory,'release.json'),changed);
  await assert.rejects(publishPair({directory,api:mock.api,commit}), /cannot be reused.*draft_authorization/);
  const unlabelled={...changed,title:'Reviewed final paper'};
  C.writeJSON(path.join(directory,'release.json'),unlabelled);
  assert.throws(() => B.validatePair(directory), /Working-draft label/);
});
