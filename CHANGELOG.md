# Changelog

All notable changes to this project will be documented in this file.
Format: [keepachangelog.com](https://keepachangelog.com/en/1.0.0/) · Versioning: [semver.org](https://semver.org/spec/v2.0.0.html)

## [1.1.1] - 2026-06-11

### Added
- Drag & Drop support to analyze local folders and ZIP archives, bypassing native file pickers.

### Fixed
- Web Worker ES Module import errors in development mode (`npm run dev`).
- Browser tab lockup (stuck) when refreshing local directories.
- Robust main-thread analysis fallback when Web Workers are unavailable or blocked.
- Skipped Rust build directory `target` and system/agent cache directories (`.codegraph`, `.agents`, `.claude`, `.gemini`, `.skills`) by default.

## [1.1.0] - 2026-06-11

### Added
- Three distinct selectable layout themes: **Brutalist** (default, sharp, monospace), **Glassmorphism** (rounded, blurred, clean UI), and **Cyber-Neon** (cyberpunk, scanlines, glowing neon accents).
- High-integrity dark and light sub-modes for all three themes.
- Dynamically retargeted color palettes for the interactive D3 dependency graph.
- Animated Blast Radius propagation: concentric waves (ripples) emit from the clicked file node, connecting links display marching neon flow dashes, and affected file nodes animate with a physical bounce transition.
- Interactive Onboarding Walkthrough (Guía de bienvenida interactiva) to orient first-time users.
- Live demo loader within the tour using the `julesklord/codelyzer` codebase.
- Custom overlay highlights and responsive popovers.
- Help/tour icon button inside the topbar.

## [1.0.0] - 2026-06-11

### Added
- Initial release as Codelyzer (fork of CodeFlow).
- Interactive dependency graph for 30+ languages.
- Blast radius analysis.
- Security scanner.
- GitHub Action (Codelyzer Card) for repository health visualization.
- Local folder and ZIP analysis.

### Changed
- Complete rebranding from CodeFlow to Codelyzer.
- Updated all repository links to julesklord/codelyzer fork.
- Applied FMG Repository Development Bible standard.
