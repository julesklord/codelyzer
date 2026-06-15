// Extract the codelyzer analyzer block from src/lib/parser.js and run it in a Node vm
// context. Mirrors what tests/codelyzer-golden.test.mjs does — the analyzer is
// the single source of truth, lives in one file, never drifts.

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadAnalyzer(htmlPath) {
  // htmlPath points to adjacent index.html, so we locate src/lib/parser.js relative to it
  const projectRoot = path.dirname(htmlPath);
  const parserPath = path.join(projectRoot, 'src', 'lib', 'parser.js');
  
  if (!fs.existsSync(parserPath)) {
    throw new Error('Could not locate analyzer source at ' + parserPath);
  }

  let parserSource = fs.readFileSync(parserPath, 'utf8');

  // Strip ES Module imports and exports so that it can run in vm.Script
  parserSource = parserSource
    .replace(/^import\s+.*?;?\s*$/gm, '') // Remove all import statements
    .replace(/^export\s+function\s+/gm, 'function ') // Convert "export function name(" to "function name("
    .replace(/^export\s+class\s+/gm, 'class ') // Convert "export class name " to "class name "
    .replace(/^export\s+const\s+/gm, 'const ') // Convert "export const name" to "const name"
    .replace(/^export\s+\{([^]*?)\};?\s*$/gm, '') // Remove the main export block at the bottom
    .replace(/\bimport\.meta\.env\b/g, '{}')
    .replace(/\bimport\.meta\b/g, 'undefined');

  // Require acorn dynamically if available to allow full AST parsing in VM
  let acornVal;
  try {
    acornVal = require('acorn');
  } catch (e) {
    acornVal = undefined;
  }

  const context = {
    console,
    TreeSitter: undefined,
    Babel: undefined,
    acorn: acornVal,
    getSecurityScanContent(file) {
      return file && file.content ? file.content : '';
    },
    isSanitizedPreviewRenderer() {
      return false;
    },
  };
  vm.createContext(context, {
    codeGeneration: {
      strings: false,
      wasm: false,
    },
  });
  const exposeExports =
    '\nthis.Parser = Parser;' +
    '\nthis.buildAnalysisData = buildAnalysisData;' +
    '\nthis.calcBlast = calcBlast;' +
    '\nthis.calcHealth = calcHealth;' +
    '\nthis.DEFAULT_ANALYSIS_CONFIG = DEFAULT_ANALYSIS_CONFIG;';
  const script = new vm.Script(parserSource + exposeExports, {
    filename: 'codelyzer-analyzer.js',
  });
  script.runInContext(context, { timeout: 1000 });

  return {
    Parser: context.Parser,
    buildAnalysisData: context.buildAnalysisData,
    calcBlast: context.calcBlast,
    calcHealth: context.calcHealth,
    DEFAULT_ANALYSIS_CONFIG: context.DEFAULT_ANALYSIS_CONFIG,
  };
}

function locateIndexHtml(actionDir) {
  // Always load the analyzer from the action package, not the repository being analyzed.
  const adjacent = path.resolve(actionDir, '..', 'index.html');
  if (fs.existsSync(adjacent)) return adjacent;
  throw new Error(
    'Could not find Codelyzer analyzer source at ' + adjacent + '.'
  );
}

module.exports = { loadAnalyzer, locateIndexHtml };
