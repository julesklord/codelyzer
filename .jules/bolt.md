## 2024-07-09 - Math.max.apply on Large Data Structures
**Learning:** Using `Math.max.apply(null, array.map(...))` on large datasets (like graph nodes) creates two major performance/stability issues: it allocates intermediate arrays (increasing GC pressure) and runs the risk of throwing a "Maximum call stack size exceeded" error if the array length exceeds ~65k items.
**Action:** Always replace `Math.max.apply` or `Math.min.apply` with a simple `for` loop to find extrema in a single pass with O(1) memory. Avoid using them inside React `.map()` renders to prevent O(N²) scaling.

## 2026-07-12 - Memoizing Derived Graph Structures
**Learning:** Computing relational graph statistics (like incoming/outgoing edges) by iterating over the entire `connections` list (O(N) operation) on every file selection blocks the main thread in large repositories.
**Action:** Pre-calculate and memoize a global O(1) lookup map (like `globalConnectionsMap`) based purely on `[data]`, so that rapidly changing state (like `[selected]`) only triggers an O(1) object lookup, preventing UI lag.

## 2024-07-15 - Graph Traversal Performance Optimization
**Learning:** Computing graph layout logic (e.g. Metro layout) by nesting operations like `.filter()`, `.find()`, and `.some()` over large Node and Link collections results in O(N*L) or O(N*(N+L)) performance and blocks the main thread.
**Action:** When computing graph layout structures, always pre-compute fast-lookup objects (`nodeById`, `hasIncoming`, `outgoingById`) in O(N+L) time. Use these lookup maps during BFS/DFS graph traversals instead of repeatedly iterating the raw arrays.

## 2024-07-21 - Avoiding Intermediate Array Allocations in Mappings
**Learning:** Mapping large arrays of objects to strings just to pass them into utility functions (e.g. `array.map(obj => obj.name)`) forces unnecessary memory allocation and Garbage Collection pressure, slowing down hot paths significantly.
**Action:** When a utility function iterates over elements to extract a property, modify the utility to accept the original array and an optional `getter` function instead of creating a mapped string array upfront.
