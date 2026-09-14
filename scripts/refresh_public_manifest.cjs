'use strict';
// Deliberately refresh PUBLICATION_MANIFEST.json. This script never discovers
// files: it re-hashes the entries the manifest already lists and changes the
// allowlist only through explicit --add/--remove arguments, so a private file
// cannot enter the public snapshot by being present in the working tree.
// scripts/export_public_snapshot.cjs consumes the result.
//
// Usage: node scripts/refresh_public_manifest.cjs [--add <path>]... [--remove <path>]... [--dry-run]
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');

const sha256 = buf => crypto.createHash('sha256').update(buf).digest('hex');

function main(args) {
  const adds = [], removes = [];
  let dryRun = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--add') adds.push(args[++i].replaceAll('\\', '/'));
    else if (args[i] === '--remove') removes.push(args[++i].replaceAll('\\', '/'));
    else if (args[i] === '--dry-run') dryRun = true;
    else throw new Error(`Unknown argument: ${args[i]}`);
  }
  const manifestPath = path.join(ROOT, 'PUBLICATION_MANIFEST.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const byPath = new Map(manifest.files.map(e => [e.path, e]));
  assert.equal(byPath.size, manifest.files.length, 'Duplicate manifest path');

  for (const rel of removes) {
    assert(byPath.delete(rel), `--remove ${rel}: not in the manifest`);
    console.log(`removed  ${rel}`);
  }
  for (const rel of adds) {
    assert(!byPath.has(rel), `--add ${rel}: already in the manifest`);
    assert(!path.relative(ROOT, path.join(ROOT, rel)).startsWith('..'), `--add ${rel}: escapes the root`);
    byPath.set(rel, {path: rel, sha256: '', bytes: 0, source: null, transformations: []});
    console.log(`added    ${rel}`);
  }
  let updated = 0;
  for (const entry of byPath.values()) {
    const p = path.join(ROOT, entry.path);
    assert(fs.existsSync(p), `${entry.path}: listed in the manifest but missing from the working tree ` +
      '(pass --remove if it was deliberately deleted)');
    const body = fs.readFileSync(p);
    const hash = sha256(body);
    if (hash !== entry.sha256 || body.length !== entry.bytes) {
      if (entry.sha256) { console.log(`updated  ${entry.path}`); updated++; }
      entry.sha256 = hash;
      entry.bytes = body.length;
    }
  }
  manifest.files = [...byPath.values()].sort((a, b) => (a.path < b.path ? -1 : 1));
  if (dryRun) { console.log('Dry run: manifest not written.'); return; }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Manifest now lists ${manifest.files.length} files ` +
    `(${adds.length} added, ${removes.length} removed, ${updated} re-hashed).`);
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Manifest refresh failed: ${error.message}`);
    process.exitCode = 1;
  }
}
