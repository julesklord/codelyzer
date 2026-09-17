## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.
## 2024-05-18 - Icon-only folder toggles missing ARIA labels and tooltips
**Learning:** Icon-only toggle buttons using visually descriptive text like `▶` (such as the folder expander in `TreeNode.jsx`) are completely opaque to screen readers without an explicit `aria-label`, and lack context for mouse users without a `title`.
**Action:** When creating or modifying custom icon-only elements (e.g. `<span role="button">▶</span>`), always ensure an explicit `aria-label` and `title` attribute is present and accurately reflects the current state (e.g. `aria-label={isOpen ? 'Collapse folder' : 'Expand folder'}`).
