## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.
## 2026-09-08 - Accessible Tree Nodes Toggle
**Learning:** Custom UI components rendering icon-only toggles using `span` or `div` tags containing visual unicode characters like '▶' are skipped or ambiguously announced by screen readers unless decorated with explicit ARIA descriptions.
**Action:** Always include an explicit `aria-label` (e.g., 'Expand folder' or 'Collapse folder') and a corresponding `title` attribute for native hover tooltips on icon-only interactive toggle elements within custom tree nodes.
