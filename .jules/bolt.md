## Performance Optimization: Avoiding Array Mappings for Worker Serialization
**Learning:** When passing data structures containing pre-compiled regular expressions to a Web Worker via `postMessage`, avoid unnecessarily stripping them down to string representations (e.g., mapping to `.raw`) if the worker is just going to immediately re-compile them.
**Context:** `postMessage` supports structured cloning, which successfully serializes and deserializes `RegExp` objects natively without losing their prototype or matching capabilities.
**Impact:** By removing the `.map(x => x.raw)` and passing the compiled pattern objects directly, we avoid $O(N)$ string mapping operations on the main thread and $O(N)$ regex re-compilation operations on the worker thread, reducing overhead from milliseconds down to microseconds for large exclusion pattern lists.

## 2026-07-12 - Memoizing Derived Graph Structures
**Learning:** Computing relational graph statistics (like incoming/outgoing edges) by iterating over the entire `connections` list (O(N) operation) on every file selection blocks the main thread in large repositories.
**Action:** Pre-calculate and memoize a global O(1) lookup map (like `globalConnectionsMap`) based purely on `[data]`, so that rapidly changing state (like `[selected]`) only triggers an O(1) object lookup, preventing UI lag.

## 2024-07-15 - Graph Traversal Performance Optimization
**Learning:** Computing graph layout logic (e.g. Metro layout) by nesting operations like `.filter()`, `.find()`, and `.some()` over large Node and Link collections results in O(N*L) or O(N*(N+L)) performance and blocks the main thread.
**Action:** When computing graph layout structures, always pre-compute fast-lookup objects (`nodeById`, `hasIncoming`, `outgoingById`) in O(N+L) time. Use these lookup maps during BFS/DFS graph traversals instead of repeatedly iterating the raw arrays.

## 2024-07-21 - Avoiding Intermediate Array Allocations in Mappings
**Learning:** Mapping large arrays of objects to strings just to pass them into utility functions (e.g. `array.map(obj => obj.name)`) forces unnecessary memory allocation and Garbage Collection pressure, slowing down hot paths significantly.
**Action:** When a utility function iterates over elements to extract a property, modify the utility to accept the original array and an optional `getter` function instead of creating a mapped string array upfront.

## 2024-07-24 - Chunked Promise.all for File Resolving
**Learning:** Sequential resolution of `FileSystemFileHandle.getFile()` across thousands of files incurs significant performance bottlenecks because the runtime awaits every single file's I/O handle sequentially. Full parallel mapping with `Promise.all` improves this but may strain memory for enormous sets.
**Action:** Use a chunked `Promise.all` pattern (e.g. `CHUNK_SIZE=100`) combined with `yieldToBrowser()` to parallelize I/O without blocking the main thread or overflowing memory, which resulted in significant execution time reduction in file resolution.
