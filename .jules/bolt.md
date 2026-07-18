## 2024-07-09 - Math.max.apply on Large Data Structures
**Learning:** Using `Math.max.apply(null, array.map(...))` on large datasets (like graph nodes) creates two major performance/stability issues: it allocates intermediate arrays (increasing GC pressure) and runs the risk of throwing a "Maximum call stack size exceeded" error if the array length exceeds ~65k items.
**Action:** Always replace `Math.max.apply` or `Math.min.apply` with a simple `for` loop to find extrema in a single pass with O(1) memory. Avoid using them inside React `.map()` renders to prevent O(N²) scaling.

## 2026-07-12 - Memoizing Derived Graph Structures
**Learning:** Computing relational graph statistics (like incoming/outgoing edges) by iterating over the entire `connections` list (O(N) operation) on every file selection blocks the main thread in large repositories.
**Action:** Pre-calculate and memoize a global O(1) lookup map (like `globalConnectionsMap`) based purely on `[data]`, so that rapidly changing state (like `[selected]`) only triggers an O(1) object lookup, preventing UI lag.

## 2024-07-15 - Graph Traversal Performance Optimization
**Learning:** Computing graph layout logic (e.g. Metro layout) by nesting operations like `.filter()`, `.find()`, and `.some()` over large Node and Link collections results in O(N*L) or O(N*(N+L)) performance and blocks the main thread.
**Action:** When computing graph layout structures, always pre-compute fast-lookup objects (`nodeById`, `hasIncoming`, `outgoingById`) in O(N+L) time. Use these lookup maps during BFS/DFS graph traversals instead of repeatedly iterating the raw arrays.

## 2024-07-24 - Chunked Promise.all for File Resolving
**Learning:** Sequential resolution of `FileSystemFileHandle.getFile()` across thousands of files incurs significant performance bottlenecks because the runtime awaits every single file's I/O handle sequentially. Full parallel mapping with `Promise.all` improves this but may strain memory for enormous sets.
**Action:** Use a chunked `Promise.all` pattern (e.g. `CHUNK_SIZE=100`) combined with `yieldToBrowser()` to parallelize I/O without blocking the main thread or overflowing memory, which resulted in significant execution time reduction in file resolution.
