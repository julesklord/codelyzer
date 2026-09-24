## 2026-09-24 - Dynamic Accessibility Attributes for Visual Characters
**Learning:** When using generic tags like `span` or `div` for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶' in TreeNode), relying solely on 'aria-expanded' is not enough for proper screen reader announcement and visual tooltip support.
**Action:** Always include a dynamic `aria-label` and matching `title` attribute that reflects the current state (e.g., 'Expand folder' vs. 'Collapse folder') on such elements to ensure full accessibility and native tooltips.
