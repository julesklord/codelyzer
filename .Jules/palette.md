## 2026-10-05 - Accessibility for Unicode Icon-Only Toggle Elements
**Learning:** When using generic tags like `span` or `div` for custom toggle elements containing only visual unicode characters, standard accessibility features fail because screen readers lack sufficient text context and users miss native tooltips.
**Action:** Always include dynamic `aria-label` and `title` attributes that update based on the component's state (e.g., Expanded vs. Collapsed) to ensure both screen reader compatibility and visible browser tooltips.
