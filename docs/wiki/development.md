# Development Guide

## Local Setup

Codelyzer has zero build-time dependencies for the frontend.

1. **Clone the repo**:
   ```bash
   git clone https://github.com/julesklord/codelyzer.git
   ```
2. **Run a local server**:
   While you can open `index.html` directly, some features (like Tree-sitter WASM loading) require a server context.
   ```bash
   npx serve .
   ```

## Testing Protocol

Tests are located in the `tests/` directory and use the native Node.js test runner.

### Running Tests
```bash
node --test tests/
```

### Test Categories
- **Extraction Tests**: Validate that the parser correctly identifies functions in various languages (see `tests/md-extractors.test.mjs`).
- **Smoke Tests**: Ensure the analyzer can process a real repository without crashing (see `tests/codelyzer-repo-smoke.mjs`).
- **Security Tests**: Verify that the scanner detects known patterns of secrets/vulnerabilities.

## Adding Language Support

To add a new language:
1. Locate the `Parser` object in `index.html`.
2. Add the file extension to `isCode`.
3. Add a regex pattern to `extract` for function/dependency identification.
4. Add a test case in `tests/fixtures/` and a corresponding unit test.

## GitHub Action Development
The "Codelyzer Card" lives in `card/`.
- **Entry**: `card/index.js`.
- **Logic**: It extracts the parser source from the root `index.html` and executes it in a Node `vm` context to ensure the Action and Web App always share the same analysis logic.
