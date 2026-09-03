## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.

## 2026-08-22 - Adding explicit accessibility context to text-character buttons
**Learning:** The application uses character symbols like "▶" in custom UI toggle elements (e.g., `span.tree-toggle` in `TreeNode.jsx`). Without explicit screen reader support, these elements may be announced confusingly or not at all to users. Adding `aria-label` guarantees that screen readers announce the exact function ("Expand folder" / "Collapse folder"), and complementing it with `title` provides identical hover feedback for sighted users.
**Action:** When creating icon-only buttons using non-semantic tags with unicode text symbols (e.g. '▶'), always add an explicit `aria-label` string to ensure the purpose is properly conveyed to screen readers, and include a matching `title` for visual tooltips.
