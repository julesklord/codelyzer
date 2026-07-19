import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Parser } from '../src/lib/parser.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconSource = readFileSync(join(__dirname, '..', 'src', 'components', 'Icon.jsx'), 'utf8');
const match = iconSource.match(/export function getFilePreviewIconName\s*\([^)]*\)\s*{[\s\S]*?}(?=\n\s*export|$)/);

const getFilePreviewIconName = new Function('Parser', `
  return ${match[0].replace('export ', '')}
`)(Parser);

test('getFilePreviewIconName correctly identifies code files', () => {
    assert.equal(getFilePreviewIconName('file.js'), 'code');
    assert.equal(getFilePreviewIconName('file.ts'), 'code');
    assert.equal(getFilePreviewIconName('file.py'), 'code');
});

test('getFilePreviewIconName correctly identifies non-code files', () => {
    assert.equal(getFilePreviewIconName('file.txt'), 'file');
    assert.equal(getFilePreviewIconName('file.md'), 'file');
    assert.equal(getFilePreviewIconName('file.jpg'), 'file');
    assert.equal(getFilePreviewIconName('file.unknown'), 'file');
});

test('getFilePreviewIconName correctly identifies VBA files', () => {
    assert.equal(getFilePreviewIconName('file.vba'), 'chart');
    assert.equal(getFilePreviewIconName('file.bas'), 'chart');
    assert.equal(getFilePreviewIconName('file.cls'), 'chart');
});

test('getFilePreviewIconName correctly identifies HTML files', () => {
    assert.equal(getFilePreviewIconName('file.html'), 'globe');
    assert.equal(getFilePreviewIconName('file.htm'), 'globe');
    assert.equal(getFilePreviewIconName('file.xhtml'), 'globe');
});

test('getFilePreviewIconName correctly identifies CSS files', () => {
    assert.equal(getFilePreviewIconName('file.css'), 'brush');
    assert.equal(getFilePreviewIconName('file.scss'), 'brush');
    assert.equal(getFilePreviewIconName('file.less'), 'brush');
});

test('getFilePreviewIconName correctly identifies JSON files', () => {
    assert.equal(getFilePreviewIconName('file.json'), 'note');
});

test('getFilePreviewIconName correctly handles edge cases', () => {
    assert.equal(getFilePreviewIconName(''), 'file');
    // For safety
    assert.equal(getFilePreviewIconName('filename-without-extension'), 'file');
});
