## 2024-06-29 - Fixed XSS in File Preview Highlight
**Vulnerability:** XSS vulnerability in `App.jsx` where `dangerouslySetInnerHTML` was used directly with unsanitized `lineHtml` strings from the custom regex-based syntax highlighter.
**Learning:** The custom syntax highlighting did not properly sanitize input beyond basic tag escaping, allowing malicious code to potentially execute in the file preview component. A direct DOM injection vulnerability existed in a code review tool.
**Prevention:** Always use a sanitization library like `DOMPurify` when rendering untrusted or partially processed strings via `dangerouslySetInnerHTML`.
