## 2026-10-02 - Dynamic Accessible Labels for Visual Toggles
**Learning:** Using generic tags with purely visual unicode characters (like '▶' in TreeNode) requires dynamic `aria-label` and matching `title` attributes that reflect the current state (e.g., 'Expand folder' vs. 'Collapse folder') to ensure screen reader accessibility and provide native tooltips for sighted users.
**Action:** Always include both stateful `aria-label` and `title` attributes on icon-only toggle elements.
