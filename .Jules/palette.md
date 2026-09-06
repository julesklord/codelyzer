## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.

## 2024-11-20 - Ensure tooltips and labels for icon-only custom elements
**Learning:** Some custom UI elements, like the `span` tags used for expanding/collapsing tree nodes, contain only visual Unicode characters (like `▶`). Without an explicit `aria-label`, screen readers may not convey the element's purpose, and sighted users lose context without a `title` tooltip.
**Action:** When implementing icon-only buttons using generic tags (`div`, `span`) with visual characters or SVGs, always provide an `aria-label` (e.g. "Expand folder" or "Collapse folder" based on state) for screen readers and a corresponding `title` attribute to show native browser tooltips on hover for sighted users.
