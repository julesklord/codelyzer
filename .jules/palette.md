## 2024-05-24 - Missing ARIA labels in icon-only buttons
**Learning:** In Codelyzer, developers sometimes bypass the `iconLabel` helper to implement custom close or view icon buttons without text, resulting in buttons lacking necessary accessibility attributes.
**Action:** When adding or auditing icon-only UI elements, always manually check and append `aria-label` tags for screen-reader accessibility.
