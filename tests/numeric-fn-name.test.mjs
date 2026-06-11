import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const htmlSource = await readFile(join(repoRoot, 'index.html'), 'utf8');
const startMarker = '// ===== CODELYZER_ANALYZER_START =====';
const endMarker = '// ===== CODELYZER_ANALYZER_END =====';
const parserStart = htmlSource.indexOf(startMarker);
const parserEnd = htmlSource.indexOf(endMarker, parserStart);

if (parserStart < 0 || parserEnd < 0) {
  throw new Error('Could not locate analyzer source in index.html');
}

const context = {
  console,
  TreeSitter: undefined,
  Babel: undefined,
  acorn: undefined,
  getSecurityScanContent(file) { return file && file.content ? file.content : ''; },
  isSanitizedPreviewRenderer() { return false; },
};
vm.createContext(context);
vm.runInContext(`${htmlSource.slice(parserStart, parserEnd)}\nthis.Parser = Parser; this.buildAnalysisData = buildAnalysisData;`, context);
const { Parser, buildAnalysisData } = context;

// Regression for issues #54 and #52: a numeric object-literal key like
// `{ 42: function () {} }` made the JS AST walker push a number into
// `fn.name`. Downstream `buildFunctionNameIndex` then called
// `fn.indexOf('.')` and threw "fn.indexOf is not a function", aborting the
// entire analysis ("Analysis failed: fn.indexOf is not a function" /
// "Failed to analyze ZIP archive: fn.indexOf is not a function").
test('buildFunctionNameIndex tolerates non-string entries', () => {
  const index = Parser.buildFunctionNameIndex([42, null, undefined, '', 'foo', 'Bar.baz']);
  assert.ok(index.exact.has('foo'));
  assert.ok(index.exact.has('Bar.baz'));
  assert.ok(!index.exact.has(42));
  assert.ok(!index.exact.has(''));
  assert.equal(index.byBase.baz.length, 1);
  assert.equal(index.byBase.baz[0], 'Bar.baz');
});

test('buildAnalysisData survives a function entry with a numeric name', async () => {
  const analyzed = [{
    path: 'src/file.js',
    name: 'file.js',
    folder: 'src',
    layer: 'utils',
    content: 'export const obj = { 42: function () { return 1; } };',
    functions: [],
    lines: 1,
    churn: 0,
    isCode: true,
  }];
  const allFns = [
    { name: 42, file: 'src/file.js', folder: 'src', layer: 'utils', line: 1, code: '42: function () { return 1; }', isTopLevel: false, type: 'method' },
    { name: 'helper', file: 'src/file.js', folder: 'src', layer: 'utils', line: 1, code: '', isTopLevel: true, type: 'function' },
  ];
  const data = await buildAnalysisData({
    analyzed,
    allFns,
    excludePatterns: [],
    progress() {},
    yieldFn: async () => {},
  });
  assert.equal(data.stats.files, 1);
  assert.ok(data.functions.some((fn) => fn.name === 'helper'));
});
