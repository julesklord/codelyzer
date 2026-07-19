import test from 'node:test';
import assert from 'node:assert/strict';
import { findSuggestedReviewers } from '../src/lib/parser.js';

test('findSuggestedReviewers', async (t) => {
    await t.test('returns empty array when prData is null', () => {
        const result = findSuggestedReviewers(null, { files: [] });
        assert.deepEqual(result, []);
    });

    await t.test('returns empty array when repoData is null', () => {
        const result = findSuggestedReviewers({ files: [] }, null);
        assert.deepEqual(result, []);
    });

    await t.test('returns empty array when repoData.files is missing', () => {
        const result = findSuggestedReviewers({ files: [] }, {});
        assert.deepEqual(result, []);
    });
});
