## 2024-09-18 - Accessible icon-only toggles
**Learning:** When using generic HTML tags (`span`, `div`) for custom icon-only toggle buttons containing visual unicode characters, the visual content doesn't provide meaningful context to screen reader users, and it lacks context on hover for sighted users.
**Action:** Always provide an explicit `aria-label` attribute and a `title` attribute for icon-only custom toggles implemented using generic tags. The text provided should be dynamic, conveying the action that will occur, such as "Expand folder" or "Collapse folder".
