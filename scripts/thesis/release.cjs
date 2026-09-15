'use strict';
// Thesis release: renders and publishes the versioned thesis-v artifact.
// Runs only when the public authorization record state/thesis_release.json
// exists and binds the current published thesis page and the P3G2 gate record;
// otherwise every command is an explicit no-op. Reuses the paper pipeline's
// pinned renderer and the immutable-release plumbing from scripts/paper/release.cjs.
//
//   node scripts/thesis/release.cjs render --commit <sha>   (build job, container)
//   node scripts/thesis/release.cjs publish                 (release job, main push)
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const C = require('../paper/common.cjs');
const {compareVersion, assertCurrentMain, githubAPI, tagCommit} = require('../paper/release.cjs');

const SITE = path.join(C.ROOT, '.paper-build/thesis-site');
const AUTH = path.join(C.ROOT, 'state/thesis_release.json');
const GATE = path.join(C.ROOT, 'state/acceptance_P3G2.json');

function readAuthorization() {
  if (!fs.existsSync(AUTH)) return null;
  const auth = C.readJSON(AUTH);
  assert.equal(auth.schema, 1, 'Thesis release schema');
  assert.equal(auth.status, 'authorized-release', 'Explicit thesis release authorization required');
  assert(C.SEMVER.test(auth.thesis_version), 'Semantic thesis version required');
  const thesis = C.readJSON(path.join(C.ROOT, 'thesis/thesis.json'));
  assert.equal(thesis.version, auth.thesis_version, 'thesis.json version differs from the authorization');
  assert.equal(thesis.stage, 'released', 'thesis.json stage must be released');
  assert.equal(C.sha(C.regular(path.join(C.ROOT, 'paper/thesis.html'))), auth.thesis_html_sha256,
    'Published thesis page differs from the authorized hash');
  assert(fs.existsSync(GATE), 'P3G2 gate record required for a thesis release');
  assert.equal(C.sha(C.regular(GATE)), auth.p3g2_record_sha256, 'P3G2 gate record differs from the authorized hash');
  assert.equal(C.recipe(), auth.renderer_sha256, 'Renderer differs from the authorized recipe');
  assert(auth.publication_authorized_by?.trim() && auth.authorization?.trim().length >= 20,
    'Record the actual owner release authorization');
  return auth;
}

async function render(commit) {
  const auth = readAuthorization();
  if (!auth) { console.log('No thesis release authorization; nothing to render.'); return; }
  assert(C.COMMIT.test(commit), 'Source commit required');
  fs.rmSync(SITE, {recursive: true, force: true});
  const {build} = require('../paper/build.cjs');
  const out = path.relative(C.ROOT, SITE).split(path.sep).join('/');
  const built = await build({source: 'paper/thesis.html', out, mode: 'preview', commit});
  assert.equal(built.html_sha256, auth.thesis_html_sha256, 'Rendered thesis differs from the authorized page');
  const manifest = {schema: 1, artifact: 'thesis', thesis_version: auth.thesis_version,
    article_version: built.version, date: built.date, source_commit: commit,
    thesis_html_sha256: built.html_sha256, pdf_sha256: built.pdf_sha256,
    renderer_sha256: auth.renderer_sha256, p3g2_record_sha256: auth.p3g2_record_sha256,
    authorization_sha256: C.sha(C.regular(AUTH)), verification: built.verification};
  // The staged pair is exactly index.html (byte copy of the source page) and
  // paper.pdf plus release.json; restage under thesis names with our manifest.
  fs.renameSync(path.join(SITE, 'index.html'), path.join(SITE, 'thesis.html'));
  fs.renameSync(path.join(SITE, 'paper.pdf'), path.join(SITE, 'thesis.pdf'));
  fs.rmSync(path.join(SITE, 'release.json'), {force: true});
  fs.writeFileSync(path.join(SITE, 'thesis-release.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(JSON.stringify({rendered: auth.thesis_version, pdf_sha256: built.pdf_sha256}));
}

async function publish() {
  const auth = readAuthorization();
  if (!auth) { console.log('No thesis release authorization; nothing to publish.'); return; }
  assert.equal(process.env.GITHUB_EVENT_NAME, 'push', 'Publish only a main push');
  assert.equal(process.env.GITHUB_REF, 'refs/heads/main');
  const commit = process.env.GITHUB_SHA;
  assert(C.COMMIT.test(commit));
  const manifest = C.readJSON(path.join(SITE, 'thesis-release.json'));
  assert.equal(manifest.source_commit, commit, 'Thesis build source commit mismatch');
  assert.equal(manifest.thesis_html_sha256, auth.thesis_html_sha256, 'Manifest/authorization page mismatch');
  const names = ['thesis.html', 'thesis.pdf', 'thesis-release.json'];
  const expected = Object.fromEntries(names.map(n => [n, C.regular(path.join(SITE, n))]));
  assert.equal(C.sha(expected['thesis.html']), manifest.thesis_html_sha256, 'Staged thesis page hash mismatch');
  assert.equal(C.sha(expected['thesis.pdf']), manifest.pdf_sha256, 'Staged thesis PDF hash mismatch');
  const api = githubAPI(process.env.GITHUB_REPOSITORY, process.env.GITHUB_TOKEN);
  await assertCurrentMain(api, commit);
  const tag = `thesis-v${auth.thesis_version}`;
  const releases = [];
  for (let page = 1; ; page++) {
    const batch = await api('GET', `/releases?per_page=100&page=${page}`);
    releases.push(...batch);
    if (batch.length < 100) break;
    assert(page < 100, 'Release inventory unexpectedly large');
  }
  for (const r of releases.filter(r => !r.draft && r.tag_name.startsWith('thesis-v'))) {
    const version = r.tag_name.replace(/^thesis-v/, '');
    if (C.SEMVER.test(version))
      assert(compareVersion(version, auth.thesis_version) <= 0, 'Older thesis version cannot replace a newer one');
  }
  const same = releases.filter(r => r.tag_name === tag);
  assert(same.length <= 1, 'Duplicate thesis release records');
  let release = same[0], previous;
  const target = await tagCommit(api, tag);
  if (release) {
    const asset = release.assets.find(x => x.name === 'thesis-release.json');
    assert(asset, 'Existing thesis release lacks provenance; manual inspection required');
    previous = JSON.parse(await api('GET', asset.url, undefined, true));
    for (const key of ['thesis_version', 'thesis_html_sha256', 'pdf_sha256', 'renderer_sha256', 'p3g2_record_sha256'])
      assert.equal(previous[key], manifest[key], `Immutable thesis release field differs: ${key}`);
    if (target) assert.equal(target, previous.source_commit, 'Existing thesis tag/manifest commit mismatch');
    else assert(release.draft, 'Published thesis release tag missing');
  } else {
    assert(!target, 'Thesis version tag already exists without release; refuse to reuse');
    release = await api('POST', '/releases', {tag_name: tag, target_commitish: commit,
      name: `Thesis ${auth.thesis_version}`, draft: true, prerelease: false,
      body: `Thesis ${auth.thesis_version} (${manifest.date}), released with research article ${manifest.article_version}. ` +
        `All Phase 3 gates are closed with recorded decisions (P3G1, P3R20, P3G2); P2R20 and P2G2 close through them. ` +
        `Acceptance is methodological: it asserts recorded method, review and honest limits, not metaphysical truth, and no external peer review is claimed. ` +
        `All twelve stronger-conclusion gates remain withheld, as the thesis itself records.\n\n` +
        `Source commit: ${commit}\nThesis HTML SHA-256: ${manifest.thesis_html_sha256}\nThesis PDF SHA-256: ${manifest.pdf_sha256}\n\n` +
        `See thesis-release.json for renderer and gate provenance.`});
  }
  const wantedManifest = previous ? Buffer.from(JSON.stringify(previous, null, 2) + '\n') : expected['thesis-release.json'];
  expected['thesis-release.json'] = wantedManifest;
  assert(release.assets.every(x => names.includes(x.name)), 'Unexpected thesis release assets; do not mutate');
  for (const name of ['thesis-release.json', ...names.filter(n => n !== 'thesis-release.json')]) {
    let asset = release.assets.find(x => x.name === name);
    if (asset) {
      const bytes = await api('GET', asset.url, undefined, true);
      assert.equal(C.sha(bytes), C.sha(expected[name]), `Immutable thesis release asset differs: ${name}`);
    } else {
      assert(release.draft, 'Published thesis release incomplete; never patch it');
      const upload = release.upload_url.replace(/\{.*$/, '') + '?name=' + encodeURIComponent(name);
      asset = await api('POST', upload, expected[name], true);
      const verified = await api('GET', asset.url, undefined, true);
      assert.equal(C.sha(verified), C.sha(expected[name]), 'Uploaded thesis asset hash mismatch');
    }
  }
  if (release.draft) {
    await assertCurrentMain(api, commit);
    await api('PATCH', `/releases/${release.id}`, {draft: false, make_latest: 'false'});
  }
  console.log(JSON.stringify({tag, release_id: release.id}));
}

async function main() {
  const cmd = process.argv[2];
  if (cmd === 'render') {
    const i = process.argv.indexOf('--commit');
    return render(process.argv[i + 1]);
  }
  if (cmd === 'publish') return publish();
  throw new Error('usage: node scripts/thesis/release.cjs render --commit <sha> | publish');
}
if (require.main === module) main().catch(error => {console.error(error.stack); process.exitCode = 1;});
module.exports = {readAuthorization, render, publish};
