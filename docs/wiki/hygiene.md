# Git & Hygiene Standards

## Commit Message Standard

We follow the **Conventional Commits** specification.

### Format
`<type>(<scope>): <description>`

### Types
- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **test**: Adding missing tests or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools and libraries.

## Versioning

We use **Semantic Versioning (SemVer)**.
- **MAJOR**: Incompatible API changes or complete UI redesigns.
- **MINOR**: Add functionality in a backwards-compatible manner.
- **PATCH**: Backwards-compatible bug fixes.

The version is defined in the `VERSION` file and must match the `card/package.json` version.

## Code Standards

1. **Vanilla Preference**: Avoid adding external libraries unless absolutely necessary.
2. **Documentation**: Every complex regex or non-obvious logic block must have an explanatory comment.
3. **Performance**: Analysis logic must be non-blocking. Use `yieldToBrowser` (async/await) for loops that process large file sets.
4. **Safety**: Never log or store GitHub tokens. Ensure they are handled as transient state in memory.

## Release Process
1. Update `CHANGELOG.md`.
2. Update `VERSION` and `card/package.json`.
3. Tag the commit: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
4. Push tags: `git push origin --tags`.
