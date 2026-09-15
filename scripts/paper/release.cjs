'use strict';
// This module has no network or write side effects until its explicit CLI/function is invoked.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const C = require('./common.cjs');
const {validatePair} = require('./build.cjs');
const artifactNames = manifest => manifest.landing_html_sha256
  ? ['index.html', 'paper.html', 'companion.html', 'thesis.html', 'methodology.html', 'favicon.png', 'social-preview.jpg',
    'robots.txt', 'sitemap.xml', 'paper.pdf', 'release.json']
  : ['index.html', 'paper.pdf', 'release.json'];
function compareVersion(a, b) {
  const x = a.split('.').map(BigInt), y = b.split('.').map(BigInt);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1;
  return 0;
}
function githubAPI(repository, token) {
  assert(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository), 'Repository identity required');
  assert(token, 'GITHUB_TOKEN required');
  return async function api(method, route, body, binary = false) {
    const url = route.startsWith('https:') ? new URL(route) : new URL(`https://api.github.com/repos/${repository}${route}`);
    assert(['api.github.com', 'uploads.github.com'].includes(url.hostname), 'Only GitHub API/upload hosts');
    const response = await fetch(url, {method, headers: {
      'Authorization': `Bearer ${token}`, 'Accept': binary && method === 'GET' ? 'application/octet-stream' : 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? {'Content-Type': binary ? 'application/octet-stream' : 'application/json'} : {})
    }, body: body ? (binary ? body : JSON.stringify(body)) : undefined});
    if (response.status === 404 && method === 'GET') return null;
    assert(response.ok, `GitHub ${method} ${url.pathname}: HTTP ${response.status}`);
    return binary && method === 'GET' ? Buffer.from(await response.arrayBuffer()) : response.json();
  };
}
async function assertCurrentMain(api, commit) {
  const ref = await api('GET', '/git/ref/heads/main');
  assert.equal(ref?.object?.sha, commit, 'Obsolete workflow: main moved; do not release/deploy this run');
}
async function tagCommit(api, tag) {
  let ref = await api('GET', `/git/ref/tags/${tag}`);
  if (!ref) return null;
  let obj = ref.object;
  for (let i = 0; obj.type === 'tag' && i < 4; i++) obj = (await api('GET', `/git/tags/${obj.sha}`)).object;
  assert.equal(obj.type, 'commit', 'Tag must resolve to a commit');
  return obj.sha;
}
async function publishPair({directory, api, commit}) {
  const next = validatePair(directory);
  const isDraft = next.mode === 'draft-release';
  const isArticle = next.presentation === 'research-article';
  assert.equal(next.source_commit, commit, 'Build source commit mismatch');
  await assertCurrentMain(api, commit);
  const tag = `paper-v${next.version}`;
  const releases = [];
  for (let page = 1; ; page++) {
    const batch = await api('GET', `/releases?per_page=100&page=${page}`);
    releases.push(...batch);
    if (batch.length < 100) break;
    assert(page < 100, 'Release inventory unexpectedly large; inspect manually');
  }
  for (const release of releases.filter(r => !r.draft)) {
    const version = release.tag_name.replace(/^paper-v/, '');
    if (release.tag_name.startsWith('paper-v') && C.SEMVER.test(version))
      assert(compareVersion(version, next.version) <= 0, 'Older released version cannot replace newer Pages paper');
  }
  const same = releases.filter(r => r.tag_name === tag);
  assert(same.length <= 1, 'Duplicate release records');
  let release = same[0], previous;
  const target = await tagCommit(api, tag);
  if (release) {
    assert.equal(release.prerelease, isDraft, 'Existing release draft/reviewed label mismatch');
    const asset = release.assets.find(x => x.name === 'release.json');
    assert(asset, 'Existing release lacks provenance; manual inspection required, no overwrite');
    previous = JSON.parse(await api('GET', asset.url, undefined, true));
    C.assertSameRelease(previous, next);
    assert(C.COMMIT.test(previous.source_commit), 'Existing release source commit invalid');
    if (target) assert.equal(target, previous.source_commit, 'Existing tag/manifest commit mismatch');
    else assert(release.draft, 'Published release tag missing');
  } else {
    assert(!target, 'Version tag already exists without release; refuse to reuse');
    const gatesClosed = (next.draft?.pending_reviews ?? ['P2R20', 'P2G2']).length === 0;
    const pendingNote = gatesClosed
      ? 'P2R20 and P2G2 are closed through the recorded Phase 3 gates (P3G1, P3R20, P3G2); acceptance remains methodological.'
      : 'P2R20 and P2G2 remain pending in release records.';
    const description = isDraft && isArticle
      ? `Research article ${next.version} (${next.date}). This is a versioned manuscript. Publication is authorized; scientific acceptance is false. ${pendingNote} No external peer review is claimed.`
      : isDraft
      ? `Phase 2 working draft ${next.version} (${next.date}). Publication is authorized; scientific acceptance is false. ${pendingNote} This draft can be improved in later versions.`
      : `Reviewed paper ${next.version} (${next.date}).`;
    release = await api('POST', '/releases', {tag_name: tag, target_commitish: commit,
      name: isDraft && isArticle ? `Research article ${next.version}` : isDraft ? `Phase 2 working draft ${next.version}` : `Research paper ${next.version}`,
      draft: true, prerelease: isDraft,
      body: `${description} HTML and PDF are one versioned pair.\n\nSource commit: ${commit}\nHTML SHA-256: ${next.html_sha256}\nPDF SHA-256: ${next.pdf_sha256}\n\nSee release.json for renderer and publication provenance.`});
  }
  // Publish manifest first to make an interrupted draft recoverable without guessing its identity.
  const wanted = {...next, ...(previous ? {source_commit: previous.source_commit} : {})};
  const manifestBytes = previous ? Buffer.from(JSON.stringify(previous, null, 2) + '\n')
    : C.regular(path.join(directory, 'release.json'));
  const assetNames = artifactNames(next);
  const expected = Object.fromEntries(assetNames.map(name =>
    [name, name === 'release.json' ? manifestBytes : C.regular(path.join(directory, name))]));
  assert(release.assets.every(x => assetNames.includes(x.name)), 'Unexpected release assets; do not mutate');
  assert.equal(new Set(release.assets.map(x => x.name)).size, release.assets.length, 'Duplicate release asset');
  for (const name of ['release.json', ...assetNames.filter(name => name !== 'release.json')]) {
    let asset = release.assets.find(x => x.name === name);
    if (asset) {
      const bytes = await api('GET', asset.url, undefined, true);
      assert.equal(C.sha(bytes), C.sha(expected[name]), `Immutable release asset differs: ${name}`);
    } else {
      assert(release.draft, 'Published release incomplete; never patch or overwrite it');
      const upload = release.upload_url.replace(/\{.*$/, '') + '?name=' + encodeURIComponent(name);
      asset = await api('POST', upload, expected[name], true);
      const verified = await api('GET', asset.url, undefined, true);
      assert.equal(C.sha(verified), C.sha(expected[name]), 'Uploaded release asset hash mismatch');
    }
  }
  if (release.draft) {
    await assertCurrentMain(api, commit);
    await api('PATCH', `/releases/${release.id}`, {draft: false, make_latest: isDraft ? 'false' : 'true'});
  }
  assert.equal(await tagCommit(api, tag), wanted.source_commit, 'Published tag commit mismatch');
  // On an idempotent rerun preserve the original release manifest/commit for Pages.
  fs.writeFileSync(path.join(directory, 'release.json'), manifestBytes);
  validatePair(directory);
  return {tag, source_commit: wanted.source_commit, release_id: release.id};
}
async function main() {
  assert.equal(process.env.GITHUB_EVENT_NAME, 'push', 'Publish only a main push, never a pull request');
  assert.equal(process.env.GITHUB_REF, 'refs/heads/main');
  assert(C.COMMIT.test(process.env.GITHUB_SHA));
  const api = githubAPI(process.env.GITHUB_REPOSITORY, process.env.GITHUB_TOKEN);
  if (process.argv[2] === 'verify-main') return assertCurrentMain(api, process.env.GITHUB_SHA);
  assert.equal(process.argv[2], 'publish');
  const directory = path.join(C.ROOT, '.paper-build/site');
  const manifest = validatePair(directory);
  assert.equal(C.sha(C.regular(path.join(C.ROOT, 'paper/paper.html'))), manifest.html_sha256, 'Canonical source changed after build');
  assert.equal(C.recipe(), manifest.renderer_sha256, 'Renderer changed after build');
  if (manifest.landing_html_sha256) {
    for (const [field, file] of Object.entries(C.AUX_SOURCES))
      assert.equal(C.sha(C.regular(path.join(C.ROOT, file))), manifest[field], `Canonical ${file} changed after build`);
  } else {
    assert(!C.auxPresent(C.ROOT), 'Landing/companion sources exist but the artifact omits them');
  }
  if (manifest.mode === 'release') {
    const review = C.validateReview(C.ROOT, manifest, manifest.html_sha256, manifest.renderer_sha256);
    assert.equal(C.sha(C.regular(path.join(C.ROOT, 'paper/reviewed-release.json'))), manifest.review_sha256);
    assert.equal(review.status, 'approved');
    assert.equal(review.pdf_sha256, manifest.pdf_sha256, 'Artifact differs from reviewed PDF');
  } else {
    C.validateDraft(C.ROOT, manifest, manifest.html_sha256, manifest.renderer_sha256);
    assert.equal(C.sha(C.regular(path.join(C.ROOT, 'paper/draft-release.json'))), manifest.draft_authorization_sha256);
  }
  console.log(JSON.stringify(await publishPair({directory, api, commit: process.env.GITHUB_SHA})));
}
if (require.main === module) main().catch(error => {console.error(error.stack); process.exitCode = 1;});
module.exports = {publishPair, compareVersion, assertCurrentMain, githubAPI, tagCommit};
