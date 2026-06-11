// Walk a repo and collect file content + parsed functions, mirroring the shape
// the analyzer expects (see tests/codelyzer-golden.test.mjs analyzeFixture).

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DEFAULT_IGNORES = new Set([
  '.git',
  'node_modules',
  '.next',
  '.nuxt',
  'dist',
  'build',
  'out',
  'coverage',
  '.cache',
  '.parcel-cache',
  '.turbo',
  '.vercel',
  '.idea',
  '.vscode',
  '__pycache__',
  '.venv',
  'venv',
  'target',
  'bin',
  'obj',
]);

function walk(root, current, files, Parser) {
  let entries;
  try {
    entries = fs.readdirSync(current, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.git')) continue;
    if (DEFAULT_IGNORES.has(entry.name)) continue;
    const full = path.join(current, entry.name);
    if (entry.isDirectory()) {
      walk(root, full, files, Parser);
      continue;
    }
    if (!entry.isFile()) continue;
    if (!Parser.isIncluded(entry.name)) continue;
    const repoPath = path.relative(root, full).split(path.sep).join('/');
    files.push({
      fullPath: full,
      path: repoPath,
      name: path.basename(repoPath),
      folder: repoPath.includes('/') ? repoPath.slice(0, repoPath.lastIndexOf('/')) : 'root',
      isCode: Parser.isCode(entry.name),
    });
  }
}

function readCache(cachePath) {
  try {
    const raw = fs.readFileSync(cachePath, 'utf8');
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

function writeCache(cachePath, cache) {
  try {
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n');
  } catch {
    // ignore cache write errors (e.g. read-only system)
  }
}

function getAnalyzerHash() {
  try {
    const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
    const content = fs.readFileSync(htmlPath, 'utf8');
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch {
    return 'default';
  }
}

async function buildAnalyzed(repoRoot, Parser) {
  const files = [];
  walk(repoRoot, repoRoot, files, Parser);
  files.sort((a, b) => a.path.localeCompare(b.path));

  const cachePath = path.join(repoRoot, '.github', 'codelyzer-card.cache.json');
  const cacheData = readCache(cachePath);
  const currentAnalyzerHash = getAnalyzerHash();
  const cache = (cacheData.analyzerHash === currentAnalyzerHash && cacheData.files) ? cacheData.files : {};
  const nextFilesCache = {};

  const analyzed = new Array(files.length);
  const allFns = [];
  const concurrencyLimit = 32;
  let fileIndex = 0;

  async function worker() {
    while (true) {
      const i = fileIndex++;
      if (i >= files.length) break;
      const file = files[i];
      let content;
      try {
        content = await fs.promises.readFile(file.fullPath, 'utf8');
      } catch (err) {
        continue;
      }

      const hash = crypto.createHash('sha256').update(content).digest('hex');
      const cached = cache[file.path];

      let functions;
      let actualIsCode;
      let layer;

      if (cached && cached.hash === hash) {
        functions = cached.functions;
        actualIsCode = cached.isCode;
        layer = cached.layer;
      } else {
        layer = Parser.detectLayer(file.path);
        const isContainer = Parser.isScriptContainer(file.path);
        actualIsCode =
          file.isCode !== false && (!isContainer || Parser.hasEmbeddedCode(content, file.path));
        functions = actualIsCode ? Parser.extract(content, file.path) : [];
      }

      nextFilesCache[file.path] = {
        hash,
        functions,
        isCode: actualIsCode,
        layer,
      };

      analyzed[i] = {
        path: file.path,
        name: file.name,
        folder: file.folder,
        content,
        functions,
        lines: content ? content.split('\n').length : 0,
        layer,
        churn: 0,
        isCode: actualIsCode,
      };
    }
  }

  const workers = [];
  const workerCount = Math.min(concurrencyLimit, files.length);
  for (let w = 0; w < workerCount; w++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  writeCache(cachePath, {
    analyzerHash: currentAnalyzerHash,
    files: nextFilesCache,
  });

  const cleanAnalyzed = analyzed.filter(Boolean);

  for (const file of cleanAnalyzed) {
    if (file.isCode) {
      for (const fn of file.functions) {
        allFns.push(Object.assign({}, fn, { folder: file.folder, layer: file.layer }));
      }
    }
  }

  return { analyzed: cleanAnalyzed, allFns };
}

module.exports = { buildAnalyzed };
