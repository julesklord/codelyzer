# Performance Learnings (Bolt)

- Replaced 16+ separate chained `files.filter(...)` operations in `src/lib/parser.js` inside `detectPatterns` with a single O(N) `for` loop.
- Using a single pass reduces unnecessary array allocations and prevents massive redundant iteration overhead (N array traversals versus 1), resulting in ~45% speedup on 6,000 files in AST tree processing.
- Preserved the existing interface for constructing the output objects and calculating metrics arrays.
- 
## Performance Optimizations

### Loops and Complexity Calculation
When flattening nested loops over large collections into a single loop, ensure that yielding to the browser (e.g. `yieldFn()`) using modulo arithmetic `(ci + 1) % CALL_BATCH === 0` prevents main thread blocking. Removing the internal looping variable overhead provides a minor speedup and improves readability for array batching.

## 2024-07-15 - Graph Traversal Performance Optimization
**Learning:** Computing graph layout logic (e.g. Metro layout) by nesting operations like `.filter()`, `.find()`, and `.some()` over large Node and Link collections results in O(N*L) or O(N*(N+L)) performance and blocks the main thread.
**Action:** When computing graph layout structures, always pre-compute fast-lookup objects (`nodeById`, `hasIncoming`, `outgoingById`) in O(N+L) time. Use these lookup maps during BFS/DFS graph traversals instead of repeatedly iterating the raw arrays.

## 2024-07-21 - Avoiding Intermediate Array Allocations in Mappings
**Learning:** Mapping large arrays of objects to strings just to pass them into utility functions (e.g. `array.map(obj => obj.name)`) forces unnecessary memory allocation and Garbage Collection pressure, slowing down hot paths significantly.
**Action:** When a utility function iterates over elements to extract a property, modify the utility to accept the original array and an optional `getter` function instead of creating a mapped string array upfront.

## 2024-07-24 - Chunked Promise.all for File Resolving
**Learning:** Sequential resolution of `FileSystemFileHandle.getFile()` across thousands of files incurs significant performance bottlenecks because the runtime awaits every single file's I/O handle sequentially. Full parallel mapping with `Promise.all` improves this but may strain memory for enormous sets.
**Action:** Use a chunked `Promise.all` pattern (e.g. `CHUNK_SIZE=100`) combined with `yieldToBrowser()` to parallelize I/O without blocking the main thread or overflowing memory, which resulted in significant execution time reduction in file resolution.

## 2026-07-28 - O(N) Grouping for Graph Hulls
**Learning:** Pre-indexing a large collection (e.g. `nodes`) by a property (e.g. `folder`) using nested iteration (a `.filter()` inside a `.forEach()`) results in $O(F*N)$ complexity. For large codebases (e.g., 5000 files in 200 folders), this leads to over 1,000,000 iterations inside `useEffect` during rendering, blocking the main thread significantly.
**Action:** Replace $O(F*N)$ `.filter()` approaches inside a `.forEach()` loop with a single-pass $O(N)$ loop over the target array that groups items into pre-initialized arrays.
When recursively resolving paths using the File System Access API, cache intermediate directory handles (e.g., using a `useRef` Map) to prevent redundant, sequential asynchronous `getDirectoryHandle` I/O calls for frequently accessed subdirectories.