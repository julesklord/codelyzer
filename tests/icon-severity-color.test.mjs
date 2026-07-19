import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// We need a way to execute the function.
// Let's create a temporary JS file without the JSX, or just evaluate the function.
const iconSource = readFileSync(join(__dirname, '..', 'src', 'components', 'Icon.jsx'), 'utf8');
const match = iconSource.match(/export function getSeverityColor\s*\([^)]*\)\s*\{([^}]*)\}/);

test('getSeverityColor logic', () => {
  if (match) {
    const fnBody = match[1];
    const getSeverityColor = new Function('level', fnBody);

    assert.equal(getSeverityColor('critical'), 'var(--red)');
    assert.equal(getSeverityColor('high'), 'var(--red)');
    assert.equal(getSeverityColor('medium'), 'var(--orange)');
    assert.equal(getSeverityColor('low'), 'var(--blue)');
    assert.equal(getSeverityColor('anything else'), 'var(--blue)');
    assert.equal(getSeverityColor(), 'var(--blue)');
  } else {
    assert.fail('Could not find getSeverityColor function in Icon.jsx');
  }
});
