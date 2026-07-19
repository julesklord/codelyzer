import test from 'node:test';
import assert from 'node:assert/strict';
import { getColors, getLayerColors, setColors, setLayerColors } from '../src/lib/parser.js';

test('setColors and getColors work as expected', () => {
  const originalColors = getColors();
  const testColors = { node: '#123456', link: '#654321' };

  setColors(testColors);
  assert.deepEqual(getColors(), testColors);

  // Restore original colors
  setColors(originalColors);
  assert.deepEqual(getColors(), originalColors);
});

test('setLayerColors and getLayerColors work as expected', () => {
  const originalLayerColors = getLayerColors();
  const testLayerColors = { components: '#abcdef', utils: '#fedcba' };

  setLayerColors(testLayerColors);
  assert.deepEqual(getLayerColors(), testLayerColors);

  // Restore original layer colors
  setLayerColors(originalLayerColors);
  assert.deepEqual(getLayerColors(), originalLayerColors);
});
