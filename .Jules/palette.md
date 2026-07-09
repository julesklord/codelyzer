## 2024-05-24 - Accessibility on Modal Close Buttons
**Learning:** Found a widespread pattern in this React application where icon-only modal close buttons ("×" character) lack accessible names.
**Action:** Always verify icon-only buttons across all modals for screen reader accessibility using `aria-label`.
## 2026-07-01 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons (like "x" or eye icons) acting as modal closers or specific actions that lacked `aria-label` attributes, making them inaccessible to screen readers. It's crucial to ONLY add `aria-label` to buttons that do not have visible descriptive text, as adding them to buttons with visible text overrides the visible text in screen readers.
**Action:** Implemented a targeted sweep through the UI codebase and added semantic `aria-label` attributes only to these specific icon-only interactive elements.
## 2026-07-09 - Adding tooltips to icon-only canvas tools
**Learning:** Found several icon-only buttons on the canvas toolbar (`+`, `-`, `⟲`, `⊡`, `⚙`) that had `aria-label`s for screen readers but no native `title` attribute for visual tooltips. This is critical UX for sighted mouse users since icons can be ambiguous.
**Action:** Implemented a sweep through the canvas toolbar code and added `title` attributes matching the `aria-label` to provide built-in browser tooltips on hover.