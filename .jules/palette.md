## 2024-05-24 - Dynamic ARIA Labels and Titles on Icon-Only Toggle Buttons
**Learning:** Custom icon-only toggle buttons using generic tags (like `span` or `div`) containing visual unicode characters (e.g., '▶') require dynamic `aria-label` and `title` attributes that update with their state to ensure screen reader accessibility and native tooltips.
**Action:** When implementing custom icon-only toggle elements (e.g. `tree-toggle`), always add an `aria-label` and matching `title` attribute that dynamically reflects the element's current state (e.g., "Expand folder" vs. "Collapse folder").
