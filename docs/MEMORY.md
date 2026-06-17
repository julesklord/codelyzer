# Project Memory

## Context Index

This file serves as persistent memory for sessions with AI agents working on this project.

## Current Status

- **Current Milestone**: Vite migration and 3D graph label rendering integration completed.
- **Blockers**: None.
- **Next Step**: Maintain code parser robustness and enhance visualization features.

## Session Notes

- **June 2026**: Project transitioned from a single-file CDN index.html structure to a modular Vite + React setup with local npm dependencies.
- **June 16, 2026**: Fixed `acorn.parse` regressions in `src/lib/parser.js` caused by incorrect asynchronous `withTimeout` wrapping of synchronous parser calls.
- **June 16, 2026**: Resolved the missing 3D graph labels issue by importing `three` as `THREE` and binding it to `window.THREE` in `src/App.jsx`, allowing Canvas textures to render node label sprites correctly.
