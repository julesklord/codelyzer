
## 2024-05-30 - Screen reader and tooltip accessibility for unicode toggle buttons
**Learning:** Using generic tags (e.g. span or div) for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶') causes accessibility issues. These elements lack native screen reader context and visible tooltips for sighted users.
**Action:** When creating custom toggle buttons with unicode characters (like in `TreeNode.jsx`), always add a dynamic `aria-label` and matching `title` attribute that reflects the current state (e.g., 'Expand folder' vs. 'Collapse folder') to ensure screen reader compatibility and provide native browser tooltips on hover.
