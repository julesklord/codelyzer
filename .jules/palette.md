## 2024-10-09 - Accessible Tooltips on Visual Icon Buttons
**Learning:** When using generic tags like `span` or `div` for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶' in TreeNode), relying solely on `aria-expanded` is insufficient for clear screen reader feedback or sighted user context.
**Action:** Always include a dynamic `aria-label` and matching `title` attribute that reflects the current state (e.g., 'Expand folder' vs. 'Collapse folder') to ensure proper screen reader accessibility and provide native browser tooltips on hover for sighted users.
