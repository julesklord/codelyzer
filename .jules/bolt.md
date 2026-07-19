## Performance Optimizations

### Loops and Complexity Calculation
When flattening nested loops over large collections into a single loop, ensure that yielding to the browser (e.g. `yieldFn()`) using modulo arithmetic `(ci + 1) % CALL_BATCH === 0` prevents main thread blocking. Removing the internal looping variable overhead provides a minor speedup and improves readability for array batching.
