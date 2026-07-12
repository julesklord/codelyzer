## 2024-07-09 - Math.max.apply on Large Data Structures
**Learning:** Using `Math.max.apply(null, array.map(...))` on large datasets (like graph nodes) creates two major performance/stability issues: it allocates intermediate arrays (increasing GC pressure) and runs the risk of throwing a "Maximum call stack size exceeded" error if the array length exceeds ~65k items.
**Action:** Always replace `Math.max.apply` or `Math.min.apply` with a simple `for` loop to find extrema in a single pass with O(1) memory. Avoid using them inside React `.map()` renders to prevent O(N²) scaling.

## 2026-07-12 - Memoizing Derived Graph Structures
**Learning:** Computing relational graph statistics (like incoming/outgoing edges) by iterating over the entire `connections` list (O(N) operation) on every file selection blocks the main thread in large repositories.
**Action:** Pre-calculate and memoize a global O(1) lookup map (like `globalConnectionsMap`) based purely on `[data]`, so that rapidly changing state (like `[selected]`) only triggers an O(1) object lookup, preventing UI lag.
