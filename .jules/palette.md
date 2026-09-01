## 2024-05-24 - Missing aria-label on generic span toggle buttons
**Learning:** Custom interactive elements, like folder toggle buttons built with `span` containing only visual text like '▶', must always explicitly provide an `aria-label` (e.g., 'Expand folder' / 'Collapse folder'). Otherwise, screen readers will vocalize the literal unicode character, completely obscuring its purpose.
**Action:** When inspecting or adding custom icon-only toggle buttons in components like `TreeNode.jsx`, ensure they have proper accessible labels if they lack text.
