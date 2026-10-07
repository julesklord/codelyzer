## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.

## 2026-10-07 - Dynamic ARIA Labels on Icon-only Elements
**Learning:** When using generic tags like `span` or `div` for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶' in TreeNode), relying solely on visual state (like a CSS rotation class) leaves screen reader users with no context of the action. Adding a dynamic `aria-label` (e.g., 'Expand folder' vs 'Collapse folder') along with a matching `title` attribute ensures proper accessibility and provides a native tooltip for sighted users.
**Action:** Always include a dynamic `aria-label` and matching `title` attribute that reflects the current state when implementing custom icon-only toggle buttons with generic tags.
