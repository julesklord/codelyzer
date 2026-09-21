## 2026-09-21 - [Accessibility for Unicode Icon Buttons]
**Learning:** When using generic tags like `span` or `div` for custom icon-only toggle buttons containing only visual unicode characters (e.g., '▶' in TreeNode), they lack implicit semantic meaning for screen readers.
**Action:** Always include an explicit `aria-label` (e.g., 'Expand folder' or 'Collapse folder') to ensure their purpose is properly conveyed to screen readers, and add a `title` attribute so sighted users can see a native tooltip on hover.
