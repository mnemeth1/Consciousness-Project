'use strict';
// Materialize a clean public tree from PUBLICATION_MANIFEST.json.
//
// The private working archive and the public snapshot share this working tree;
// this script makes the publication boundary mechanical instead of careful:
// it copies exactly the files the manifest allowlists into an export directory
// (default .public-export/), verifies every byte against the manifest hash,
// re-checks the forbidden-content screens, asserts the export inventory equals
// the manifest, and then runs the canonical Python validator inside the export.
// Nothing is discovered from the filesystem; a file absent from the manifest
// cannot reach the export. A working-tree file that differs from its manifest
// entry fails the export until the manifest is deliberately refreshed
// (scripts/refresh_public_manifest.cjs).
//
// Usage: node scripts/export_public_snapshot.cjs [--out <dir>]
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');

const sha256 = buf => crypto.createHash('sha256').update(buf).digest('hex');

const FORBIDDEN_EXTENSIONS = new Set(['.pdf', '.epub', '.djvu', '.mobi', '.mp3', '.mp4', '.wav',
  '.png', '.jpg', '.jpeg', '.webp', '.zip', '.7z', '.sqlite', '.db', '.pem', '.key']);
const FORBIDDEN_PARTS = new Set(['downloaded papers', 'tmp', 'cache', 'screenshots', 'source_text',
  'source_texts', 'extracted_text', 'downloads', 'input_snapshots', 'versions', '.env']);

function* walk(dir) {
  for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function exportSnapshot(target) {
  assert(path.relative(target, ROOT).startsWith('..'), 'Export target must not contain the project root');
  const manifestPath = path.join(ROOT, 'PUBLICATION_MANIFEST.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  if (fs.existsSync(target)) {
    const prior = fs.readdirSync(target);
    assert(!prior.length || prior.includes('PUBLICATION_MANIFEST.json'),
      `Refusing to overwrite ${target}: not empty and not a previous export`);
    fs.rmSync(target, {recursive: true, force: true});
  }
  // The manifest copy doubles as the marker that this directory is an export
  // (including a failed partial one), so reruns may safely replace it.
  fs.mkdirSync(target, {recursive: true});
  fs.copyFileSync(manifestPath, path.join(target, 'PUBLICATION_MANIFEST.json'));

  const exported = new Set();
  let bytes = 0;
  for (const entry of manifest.files) {
    assert(!exported.has(entry.path), `Duplicate manifest path: ${entry.path}`);
    const src = path.join(ROOT, entry.path);
    assert(!path.relative(ROOT, src).startsWith('..'), `Manifest path escapes the root: ${entry.path}`);
    assert(fs.existsSync(src), `Manifest names a missing file: ${entry.path}`);
    const body = fs.readFileSync(src);
    assert.equal(sha256(body), entry.sha256,
      `${entry.path}: working tree differs from the manifest; refresh PUBLICATION_MANIFEST.json first`);
    assert.equal(body.length, entry.bytes, `${entry.path}: size differs from the manifest`);
    assert(!FORBIDDEN_EXTENSIONS.has(path.extname(entry.path).toLowerCase()),
      `Forbidden file type in manifest: ${entry.path}`);
    assert(!entry.path.split('/').some(part => FORBIDDEN_PARTS.has(part)),
      `Private category in manifest: ${entry.path}`);
    const dest = path.join(target, entry.path);
    fs.mkdirSync(path.dirname(dest), {recursive: true});
    fs.writeFileSync(dest, body);
    exported.add(entry.path);
    bytes += body.length;
  }

  const inventory = new Set([...walk(target)].map(p => path.relative(target, p).replaceAll('\\', '/')));
  assert.deepEqual(inventory, new Set([...exported, 'PUBLICATION_MANIFEST.json']),
    'Export inventory differs from the manifest');
  console.log(`Exported ${inventory.size} files (${bytes} bytes) to ${target}`);
  return target;
}

function runValidator(target) {
  for (const [cmd, pre] of [['py', ['-3']], ['python3', []], ['python', []]]) {
    const run = spawnSync(cmd, [...pre, path.join('scripts', 'validate_public_snapshot.py')],
      {cwd: target, encoding: 'utf8'});
    // Skip missing launchers and the Windows Store python alias.
    if (run.error || /Python was not found/i.test(run.stderr || '')) continue;
    process.stdout.write(run.stdout || '');
    process.stderr.write(run.stderr || '');
    assert.equal(run.status, 0, `Canonical validator failed inside the export (${cmd})`);
    console.log(`Canonical validator passed inside the export (${cmd}).`);
    return true;
  }
  console.log('Python not found on this machine: the export is hash- and inventory-verified,');
  console.log('but run scripts/validate_public_snapshot.py inside the export before publishing.');
  return false;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf('--out');
  const target = path.resolve(ROOT, outIndex >= 0 ? args[outIndex + 1] : '.public-export');
  try {
    runValidator(exportSnapshot(target));
  } catch (error) {
    console.error(`Export failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {exportSnapshot};
