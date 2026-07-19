## 2024-06-29 - Fixed XSS in File Preview Highlight
**Vulnerability:** XSS vulnerability in `App.jsx` where `dangerouslySetInnerHTML` was used directly with unsanitized `lineHtml` strings from the custom regex-based syntax highlighter.
**Learning:** The custom syntax highlighting did not properly sanitize input beyond basic tag escaping, allowing malicious code to potentially execute in the file preview component. A direct DOM injection vulnerability existed in a code review tool.
**Prevention:** Always use a sanitization library like `DOMPurify` when rendering untrusted or partially processed strings via `dangerouslySetInnerHTML`.
## 2024-06-30 - Strictly Configured DOMPurify for File Preview Highlight
**Vulnerability:** XSS vulnerability in `App.jsx` where `DOMPurify.sanitize` was used without an explicit configuration alongside `dangerouslySetInnerHTML`.
**Learning:** Although DOMPurify strips dangerous tags by default, relying on the default configuration may be less secure or flag strict security checks. It is safer to use an explicit configuration whitelist, allowing only exactly the tags and attributes needed by the code.
**Prevention:** Use an explicit configuration with `ALLOWED_TAGS` and `ALLOWED_ATTR` when using `DOMPurify.sanitize` with `dangerouslySetInnerHTML`.
## 2024-08-05 - [XSS Fix] ForceGraph3D .nodeLabel Tooltips
**Vulnerability:** Found an XSS vulnerability in `ForceGraph3D` where `node.name` was being unsafely concatenated into raw HTML string within the `.nodeLabel` tooltip rendering.
**Learning:** Third-party graph rendering libraries that accept raw HTML strings for labels are prime targets for XSS if they accept user-controlled data. Here, repository file paths/names were passed directly.
**Prevention:** Always manually escape strings (`escapeHtml`) or use `DOMPurify` before injecting dynamic variables into HTML strings passed to external visualization libraries.
## 2024-05-18 - [XSS in 3D Force Graph Tooltips]
**Vulnerability:** Found an XSS vulnerability where node details were concatenated into an HTML string and rendered using `ForceGraph3D` tooltips without sanitization.
**Learning:** Even though `node.name` was being correctly sanitized using `escapeHtml`, the `details` variable (which was constructed dynamically with potentially unchecked data) was concatenated into an HTML string returned by `.nodeLabel()`. These dynamically constructed strings can lead to XSS if they include unfiltered properties.
**Prevention:** Any HTML strings rendered dynamically inside components like `ForceGraph3D` must always be passed through a trusted sanitization library like `DOMPurify.sanitize()` before being returned, regardless of localized escaping.
## 2026-07-16 - DOMPurify for D3 Tooltips
**Vulnerability:** XSS vulnerability in `renderTooltipHtml` where dynamically constructed tooltip strings were returned as raw HTML to be consumed by D3's `.html()` method, even though constituent strings were manually escaped.
**Learning:** Relying purely on localized `escapeHtml` for parts of a string is brittle. Tooltips rendered by D3 visualizations (which internally set `innerHTML`) are an XSS vector if raw HTML assembly is trusted.
**Prevention:** Any HTML strings rendered dynamically inside components like D3 charts must always be passed through a trusted sanitization library like `DOMPurify.sanitize()` before being returned.
## 2024-08-05 - [XSS Fix] Sanitize Mermaid SVG Output
**Vulnerability:** XSS vulnerability in `App.jsx` where Mermaid SVG output (`result.svg`) was dynamically injected into the DOM via `innerHTML` without explicit sanitization.
**Learning:** Third-party visualization tools, even those with internal security settings (like Mermaid's `securityLevel: 'strict'`), can still return SVG strings containing potentially malicious payloads. Trusting these raw SVG strings by assigning them to `innerHTML` creates an XSS vulnerability vector.
**Prevention:** Always use `DOMPurify.sanitize` with `{ USE_PROFILES: { svg: true } }` when dynamically injecting SVG output from Mermaid (or similar tools) into the DOM.
