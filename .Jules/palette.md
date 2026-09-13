## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.

## 2026-09-13 - Enhance Accessibility for Icon-only Unicode Buttons
**Learning:** In custom toggle components, utilizing generic tags containing only visual unicode characters (e.g., '▶' in TreeNode) requires explicit accessibility properties since screen readers might ignore or misinterpret the visual characters. Adding an `aria-label` provides necessary context to screen readers, while a `title` attribute offers a visible native tooltip on hover for sighted users, greatly enhancing micro-UX.
**Action:** When implementing generic tags like span or div for custom icon-only toggle buttons containing only visual unicode characters, always include an explicit `aria-label` (e.g., 'Expand folder') and a corresponding `title` attribute to ensure their purpose is properly conveyed to all users.
