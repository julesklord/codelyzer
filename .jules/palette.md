## 2026-09-15 - Add aria-label and title to icon-only buttons
**Learning:** Generic tags (`span` or `div`) used as icon-only toggle buttons containing only visual unicode characters (e.g., '▶') need explicit `aria-label` attributes to convey their purpose to screen readers. Additionally, providing a `title` attribute ensures visible native browser tooltips on hover for sighted users.
**Action:** When implementing custom icon-only toggle buttons using generic tags, always include both `aria-label` and `title` attributes reflecting the current state (e.g., 'Expand folder' / 'Collapse folder').
