import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import test from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const require = createRequire(import.meta.url);
const { locateIndexHtml, loadAnalyzer } = require('../card/lib/analyzer.js');

test('card action loads analyzer from its own package', () => {
  assert.equal(locateIndexHtml(join(repoRoot, 'card')), join(repoRoot, 'index.html'));
});

test('card action loads and initializes analyzer successfully', () => {
  const indexHtmlPath = locateIndexHtml(join(repoRoot, 'card'));
  const analyzer = loadAnalyzer(indexHtmlPath);
  assert.ok(analyzer.Parser, 'Parser should be loaded');
  assert.ok(analyzer.buildAnalysisData, 'buildAnalysisData should be loaded');
  assert.ok(analyzer.calcBlast, 'calcBlast should be loaded');
  assert.ok(analyzer.calcHealth, 'calcHealth should be loaded');
});

test('card action does not fall back to the repository being analyzed', async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), 'codelyzer-card-'));
  try {
    const actionDir = join(tempRoot, 'action', 'card');
    const consumerRepo = join(tempRoot, 'consumer');
    await mkdir(actionDir, { recursive: true });
    await mkdir(consumerRepo, { recursive: true });
    await writeFile(join(consumerRepo, 'index.html'), '<script>throw new Error("owned")</script>');

    assert.throws(
      () => locateIndexHtml(actionDir, consumerRepo),
      /Could not find Codelyzer analyzer source/
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
