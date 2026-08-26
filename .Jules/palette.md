## 2026-08-22 - Adding accessibility roles to interactive elements
**Learning:** The application had several instances where standard 'div's were used as interactive headers without semantic roles, tabindex or keyboard event handlers.
**Action:** Implemented the accessible interactive elements by ensuring that whenever a non-native interactive component is made, it incorporates 'role="button"', 'tabIndex={0}', 'aria-expanded', and 'onKeyDown' logic handling both Enter and Space keys.
## 2024-05-18 - Added keyboard accessibility to export options
**Learning:** Found custom UI elements acting as buttons (`<div className="export-option">`) that were missing `role="button"`, `tabIndex={0}`, and keyboard event listeners (`onKeyDown`), making them inaccessible to keyboard users.
**Action:** Always add `role="button"`, `tabIndex={0}`, and handle `Enter`/`Space` keys for any custom interactive element that acts like a button.
