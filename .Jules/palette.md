## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.

## 2026-10-09 - Accessible Unicode Toggle Icons
**Learning:** Custom toggle buttons implemented with generic tags (span/div) that only use visual unicode characters (like '▶') for state indication are inaccessible to screen readers and lack native tooltips.
**Action:** Always include a dynamic `aria-label` and a matching `title` attribute on icon-only interactive elements to provide semantic context (e.g., 'Expand folder' vs. 'Collapse folder') and visible native tooltips for both screen reader and sighted users.
