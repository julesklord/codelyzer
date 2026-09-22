## 2024-05-18 - Icon-only buttons with visual unicode characters
**Learning:** Custom icon-only toggle buttons that rely solely on visual unicode characters (like "▶") require explicit `aria-label` attributes for screen reader accessibility, and matching `title` attributes to provide native tooltips for sighted users.
**Action:** When implementing custom toggle or expand/collapse buttons using non-semantic tags and unicode icons, always include dynamic `aria-label` and `title` attributes reflecting the current state.
