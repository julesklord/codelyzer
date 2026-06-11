// Read GitHub Actions inputs (INPUT_<UPPERCASE_NAME>) and provide a
// process.env-friendly fallback for local dry-runs.

'use strict';

function readInput(name, defaultValue) {
  // GitHub's node24 runtime preserves dashes in env var names
  // (`INPUT_SHOW-GRADE`), but composite actions and some docs imply
  // underscore conversion (`INPUT_SHOW_GRADE`). Check both so the action
  // works regardless of which form the runtime uses.
  const upper = name.toUpperCase();
  const dashKey = 'INPUT_' + upper;
  const underscoreKey = 'INPUT_' + upper.replace(/-/g, '_');
  let v = process.env[dashKey];
  if (v === undefined || v === '') v = process.env[underscoreKey];
  if (v === undefined || v === '') return defaultValue;
  return v;
}

function asBool(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value === 'boolean') return value;
  return /^(true|1|yes|on)$/i.test(String(value).trim());
}

function asInt(value, fallback) {
  const n = parseInt(String(value), 10);
  return Number.isFinite(n) ? n : fallback;
}

function asList(value, fallback) {
  if (!value) return fallback;
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadInputs() {
  const output = readInput('output', '.github/codelyzer-card.svg');
  const state = readInput('state', '.github/codelyzer-card.json');
  const theme = readInput('theme', 'auto');
  const accent = readInput('accent', '');
  const style = readInput('style', 'compact');
  // panels only used when style=detailed. Empty means "show everything for the style".
  const panels = asList(readInput('panels', ''), []);
  // Privacy: hide judgmental metrics on a publicly displayed README.
  const showGrade = asBool(readInput('show-grade', ''), true);
  const showScore = asBool(readInput('show-score', ''), true);
  const receipts = asBool(readInput('receipts', ''), false);
  const sparklineWindow = asInt(readInput('sparkline-window', ''), 30);
  const pin = asBool(readInput('pin', ''), true);
  const commitMessage = readInput('commit-message', 'chore: update codelyzer card [skip ci]');
  const commitAuthorName = readInput('commit-author-name', 'codelyzer-card[bot]');
  const commitAuthorEmail = readInput(
    'commit-author-email',
    'codelyzer-card[bot]@users.noreply.github.com'
  );
  const token = readInput('github-token', process.env.GITHUB_TOKEN || '');
  return {
    output,
    state,
    theme,
    accent,
    style,
    panels,
    showGrade,
    showScore,
    receipts,
    sparklineWindow,
    pin,
    commitMessage,
    commitAuthorName,
    commitAuthorEmail,
    token,
  };
}

module.exports = { loadInputs };
