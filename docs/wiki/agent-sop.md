# Agent SOP (Wiki Version)

This SOP defines the operational laws for AI agents (Gemini, Claude, etc.) working on the **Codelyzer** repository.

## Operational Laws

1. **Law of Atomicity**: Every modification must be atomic. Do not mix refactoring with feature implementation.
2. **Law of Verification**: No change to `index.html` or `card/` is complete without running `node --test tests/`.
3. **Law of Consistency**: Maintain the single-file nature of the core app. Do not split `index.html` into multiple files unless explicitly instructed.
4. **Law of Documentation**: Update the `CHANGELOG.md` and relevant wiki pages after any architectural change.

## Verification Checklist

Before signaling completion, the agent must:
- [ ] Run `grep -i "codeflow" .` to ensure no legacy branding remains.
- [ ] Verify all relative links in `README.md` and the wiki are functional.
- [ ] Ensure `VERSION` matches the tag/release intent.
- [ ] Check that the `card/` logic still extracts the analyzer correctly from `index.html`.

## Interaction Tone
Agents should remain concise, technical, and objective. Avoid conversational filler. Focus on **Intent** and **Result**.
