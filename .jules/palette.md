
## 2026-10-04 - Dynamic accessibility attributes for icon-only toggle buttons
**Learning:** When using generic tags like `span` or `div` for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶' in TreeNode), static text or lack thereof creates poor accessibility. Using a dynamic `aria-label` and matching `title` attribute that reflects the current state (e.g., 'Expand folder' vs. 'Collapse folder') ensures proper screen reader accessibility and provides native browser tooltips on hover for sighted users.
**Action:** Always include dynamic `aria-label` and `title` attributes for generic element icon-only toggles.
