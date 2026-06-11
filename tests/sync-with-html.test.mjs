// Enforces that `Parser.extractMarkdownLinks` / `Parser.resolveMarkdownLink`
// produce identical output to the source-of-truth
// implementation in tests/md-extractors.mjs. This prevents silent drift.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Parser } from '../src/lib/parser.js';
import {
  extractMarkdownLinks as refExtract,
  resolveMarkdownLink as refResolve,
} from './md-extractors.mjs';

const vaultPaths = ['target-note.md', 'note.md', 'deep/nested/target-note.md', 'docs/intro.md', 'docs/guide.markdown', 'docs/readme.md'];
const cases = [
  { content: 'See [[target-note]] and [[foo|bar]] and [[baz#h]].' },
  { content: 'Link: [click](./target-note.md) and image ![x](./y.png) and [g](https://g.com).' },
  { content: 'Nested: [foo [bar] baz](./target-note.md).' },
  { content: 'Fences:\n```\n[[skip-a]]\n```\n~~~\n[[skip-b]]\n~~~\n`[[skip-c]]` Real: [[keep]].' },
];

const J = (v) => JSON.parse(JSON.stringify(v));

test('src/lib/parser.js extractMarkdownLinks matches tests/md-extractors.mjs', () => {
  for (const c of cases) {
    assert.deepStrictEqual(J(Parser.extractMarkdownLinks(c.content)), J(refExtract(c.content)));
  }
});

const resolveCases = [
  ['target-note', 'note.md', 'wikilink'],
  ['./target-note.md', 'note.md', 'mdlink'],
  ['target-note.md', 'note.md', 'mdlink'],
  ['/docs/intro.md', 'note.md', 'mdlink'],
  ['does-not-exist', 'note.md', 'wikilink'],
  ['../nested/target-note.md', 'deep/other.md', 'mdlink'],
  ['guide', 'readme.md', 'wikilink'],
  ['./guide', 'docs/readme.md', 'mdlink'],
];
test('src/lib/parser.js resolveMarkdownLink matches tests/md-extractors.mjs', () => {
  for (const [t, f, k] of resolveCases) {
    assert.equal(Parser.resolveMarkdownLink(t, f, vaultPaths, k), refResolve(t, f, vaultPaths, k));
  }
});
