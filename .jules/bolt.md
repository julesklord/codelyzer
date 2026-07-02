## 2024-07-01 - Optimizing React rendering with useMemo
**Learning:** Found an O(n) array sorting operation and deep recursive countFiles inside the body of a React Function Component (`TreeNode`) which is called many times for deeply nested trees. React components that are pure should memoize their expensive operations instead of doing them synchronously during each render pass.
**Action:** Always wrap `children` sorting and recursive tree traversal computations in `React.useMemo` to prevent deep performance degradation during re-renders.
