## 2024-05-18 - Icon-only toggles in custom UI elements
**Learning:** When using generic tags like `span` or `div` for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶' in TreeNode), an explicit `aria-label` (e.g., 'Expand folder') and `title` must be included to ensure their purpose is properly conveyed to screen readers and visible to sighted users on hover.
**Action:** Always verify that custom icon-only toggle buttons have an appropriate `aria-label` and `title` attributes reflecting their current state.
