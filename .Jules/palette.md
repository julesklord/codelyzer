## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.

## 2024-05-24 - Accessible Icon-Only Tree Toggles
**Learning:** In highly interactive custom UI components like file trees (`TreeNode`), generic spans used for icon-only expand/collapse toggles (e.g., just rendering '▶') are invisible to screen readers without explicit ARIA labels. Adding a `title` alongside `aria-label` is crucial for sighted users as well, providing a native browser tooltip for clarity.
**Action:** Always verify custom tree views and collapsible sections for icon-only buttons. Apply both `aria-label` (for screen readers) and `title` (for sighted users) dynamically based on the component's `isOpen` or `isExpanded` state.
