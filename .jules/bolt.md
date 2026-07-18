## Performance Optimization: Avoiding Array Mappings for Worker Serialization

*   **Learning:** When passing data structures containing pre-compiled regular expressions to a Web Worker via `postMessage`, avoid unnecessarily stripping them down to string representations (e.g., mapping to `.raw`) if the worker is just going to immediately re-compile them.
*   **Context:** `postMessage` supports structured cloning, which successfully serializes and deserializes `RegExp` objects natively without losing their prototype or matching capabilities.
*   **Impact:** By removing the `.map(x => x.raw)` and passing the compiled pattern objects directly, we avoid $O(N)$ string mapping operations on the main thread and $O(N)$ regex re-compilation operations on the worker thread, reducing overhead from milliseconds down to microseconds for large exclusion pattern lists.
