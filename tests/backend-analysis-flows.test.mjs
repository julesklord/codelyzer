import assert from 'node:assert/strict';
import test from 'node:test';
import JSZip from 'jszip';
import { Parser, buildAnalysisData, runAnalysisData } from '../src/lib/parser.js';

test('buildAnalysisData parses localFiles option correctly on the main thread', async () => {
  const localFiles = [
    {
      path: 'src/main.js',
      name: 'main.js',
      size: 150,
      file: {
        text: async () => 'import { add } from "./math.js";\nconsole.log(add(2, 3));'
      }
    },
    {
      path: 'src/math.js',
      name: 'math.js',
      size: 100,
      file: {
        text: async () => 'export function add(a, b) {\n  return a + b;\n}'
      }
    }
  ];

  const data = await buildAnalysisData({
    localFiles,
    excludePatterns: [],
    progress() {},
    yieldFn: async () => {}
  });

  assert.equal(data.stats.files, 2);
  assert.equal(data.functions.length, 1);
  assert.equal(data.functions[0].name, 'add');
  assert.equal(data.functions[0].file, 'math.js');
  assert.ok(data.connections.some(c => c.fn === 'add' && c.source === 'math.js'));
});

test('buildAnalysisData parses zipFile option correctly on the main thread', async () => {
  const zip = new JSZip();
  zip.file('src/main.js', 'import { subtract } from "./math.js";\nconsole.log(subtract(5, 2));');
  zip.file('src/math.js', 'export function subtract(a, b) {\n  return a - b;\n}');

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  const data = await buildAnalysisData({
    zipFile: zipBuffer,
    excludePatterns: [],
    progress() {},
    yieldFn: async () => {}
  });

  assert.equal(data.stats.files, 2);
  assert.equal(data.functions.length, 1);
  assert.equal(data.functions[0].name, 'subtract');
  assert.equal(data.functions[0].file, 'math.js');
  assert.ok(data.connections.some(c => c.fn === 'subtract' && c.source === 'math.js'));
});

test('runAnalysisData falls back cleanly to main thread in Node.js environment', async () => {
  const localFiles = [
    {
      path: 'src/greet.js',
      name: 'greet.js',
      size: 80,
      file: {
        text: async () => 'export function greet(name) { return "Hello " + name; }'
      }
    }
  ];

  const data = await runAnalysisData({
    localFiles,
    excludePatterns: [],
    progress() {},
    yieldFn: async () => {}
  });

  assert.equal(data.stats.files, 1);
  assert.equal(data.functions.length, 1);
  assert.equal(data.functions[0].name, 'greet');
});
