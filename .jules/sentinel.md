## 2024-06-29 - Fixed XSS in File Preview Highlight
**Vulnerability:** XSS vulnerability in `App.jsx` where `dangerouslySetInnerHTML` was used directly with unsanitized `lineHtml` strings from the custom regex-based syntax highlighter.
**Learning:** The custom syntax highlighting did not properly sanitize input beyond basic tag escaping, allowing malicious code to potentially execute in the file preview component. A direct DOM injection vulnerability existed in a code review tool.
**Prevention:** Always use a sanitization library like `DOMPurify` when rendering untrusted or partially processed strings via `dangerouslySetInnerHTML`.
## 2024-06-30 - Strictly Configured DOMPurify for File Preview Highlight
**Vulnerability:** XSS vulnerability in `App.jsx` where `DOMPurify.sanitize` was used without an explicit configuration alongside `dangerouslySetInnerHTML`.
**Learning:** Although DOMPurify strips dangerous tags by default, relying on the default configuration may be less secure or flag strict security checks. It is safer to use an explicit configuration whitelist, allowing only exactly the tags and attributes needed by the code.
**Prevention:** Use an explicit configuration with `ALLOWED_TAGS` and `ALLOWED_ATTR` when using `DOMPurify.sanitize` with `dangerouslySetInnerHTML`.
## $(date +%Y-%m-%d) - [XSS Fix] ForceGraph3D .nodeLabel Tooltips
**Vulnerability:** Found an XSS vulnerability in `ForceGraph3D` where `node.name` was being unsafely concatenated into raw HTML string within the `.nodeLabel` tooltip rendering.
**Learning:** Third-party graph rendering libraries that accept raw HTML strings for labels are prime targets for XSS if they accept user-controlled data. Here, repository file paths/names were passed directly.
**Prevention:** Always manually escape strings (`escapeHtml`) or use `DOMPurify` before injecting dynamic variables into HTML strings passed to external visualization libraries.
