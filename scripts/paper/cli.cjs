'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const C = require('./common.cjs');
async function main() {
  const command = process.argv[2];
  if (command === 'recipe') return console.log(C.recipe());
  if (command === 'status') {
    const result = C.status();
    console.log(JSON.stringify(result));
    if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `state=${result.state}\n`);
    return;
  }
  if (command === 'build') {
    const args = process.argv.slice(3), values = {};
    for (let i = 0; i < args.length; i += 2) {
      assert(['--root', '--source', '--out', '--mode', '--commit'].includes(args[i]) && args[i + 1], 'Unknown/missing build argument');
      values[args[i].slice(2)] = args[i + 1];
    }
    if (values.root) values.root = path.resolve(values.root);
    const {build} = require('./build.cjs');
    console.log(JSON.stringify(await build(values), null, 2));
    return;
  }
  throw new Error('Use status, recipe, or build [--root paper-workspace] [--source relative.html] [--out empty-directory] [--mode preview|release|draft-release] [--commit SHA]');
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
