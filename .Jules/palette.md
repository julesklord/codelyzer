## 2024-05-24 - Accessibility on Modal Close Buttons
**Learning:** Found a widespread pattern in this React application where icon-only modal close buttons ("×" character) lack accessible names.
**Action:** Always verify icon-only buttons across all modals for screen reader accessibility using `aria-label`.
## 2026-07-01 - Adding ARIA labels to icon-only buttons
**Learning:** Found several icon-only buttons (like "x" or eye icons) acting as modal closers or specific actions that lacked `aria-label` attributes, making them inaccessible to screen readers. It's crucial to ONLY add `aria-label` to buttons that do not have visible descriptive text, as adding them to buttons with visible text overrides the visible text in screen readers.
**Action:** Implemented a targeted sweep through the UI codebase and added semantic `aria-label` attributes only to these specific icon-only interactive elements.
## 2026-07-09 - Adding tooltips to icon-only canvas tools
**Learning:** Found several icon-only buttons on the canvas toolbar (`+`, `-`, `⟲`, `⊡`, `⚙`) that had `aria-label`s for screen readers but no native `title` attribute for visual tooltips. This is critical UX for sighted mouse users since icons can be ambiguous.
**Action:** Implemented a sweep through the canvas toolbar code and added `title` attributes matching the `aria-label` to provide built-in browser tooltips on hover.
## 2026-07-11 - Adding native tooltips to remaining icon-only interactive elements
**Learning:** Discovered that many icon-only buttons throughout the application (such as view source buttons, modal close buttons, mobile navigation toggles, etc.) had `aria-label` attributes for screen readers but lacked `title` attributes. Adding native `title` tooltips to all these elements provides crucial visual feedback on hover for sighted mouse users, drastically improving discoverability of secondary actions.
**Action:** Performed a comprehensive sweep through `App.jsx` to ensure that any interactive element equipped with an `aria-label` but lacking visible text now also has a corresponding `title` attribute.

## 2026-07-13 - Form Controls Accessibility with `htmlFor` and `id`
**Learning:** Found several explicit `<label>` elements in `App.jsx` (like "Pull Request URL" and "Custom Patterns") that lacked the `htmlFor` attribute. Consequently, the corresponding `<input>` and `<textarea>` elements lacked `id` attributes. This breaks the programmatic association required for screen readers and prevents users from clicking the label to focus the input.
**Action:** Added `htmlFor` to the labels and matching `id` attributes to their respective form inputs/textareas to ensure proper form control accessibility. Ensure all explicit labels use `htmlFor` going forward.

## 2024-07-18 - Fix form control accessibility and label attributes
**Learning:** Adding explicit `htmlFor` properties to `<label>` elements and matching `id` properties to their respective `<input>` elements improves robust accessibility. Furthermore, `htmlFor` can only be applied when pointing to labelable form controls (e.g. `input`); using it to label a non-form block element (like a list of chips in a `div`) is invalid. Instead, that pattern requires an `id` on a generic label element and an `aria-labelledby` attribute on the container `div`.
**Action:** Always verify that the targeted element of an `htmlFor` is a valid labelable element. When assigning labels to non-interactive containers, prefer ARIA labeling techniques.

## 2026-07-18 - Missing global focus-visible styles
**Learning:** Found that this application lacked global `:focus-visible` styles for interactive elements, resulting in poor keyboard navigation accessibility where users could not easily see which element was focused when tabbing through the UI.
**Action:** Always verify that a global `:focus-visible` rule exists for interactive elements (buttons, inputs, selects, textareas, links, and role="button" elements) to ensure consistent focus indicators for keyboard navigation across the entire application.
