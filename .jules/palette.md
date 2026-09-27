## 2026-09-27 - [Add ARIA label and title to icon-only toggle buttons]
**Learning:** Custom icon-only toggle buttons that rely solely on visual unicode characters (e.g., '▶') for state indication must include both an `aria-label` and a `title` attribute to ensure proper screen reader accessibility and provide native tooltips for sighted users.
**Action:** Always add dynamic `aria-label` and `title` attributes to icon-only elements that use generic tags and visual characters.
