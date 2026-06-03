# Gallery Project Rules

These rules define the baseline structure and dependency policy for the `gallery/` project.

## Baseline structure
- The `gallery/` folder structure as it exists now is the reference baseline.
- New or updated implementations must preserve this structure or extend it while remaining compatible.

## Baseline versions (minimum)
Based on `gallery/package.json`:
- `next`: `16.2.7`
- `react`: `19.2.4`
- `react-dom`: `19.2.4`
- `tailwindcss`: any `4.x` version
- `@tailwindcss/postcss`: any `4.x` version

These versions are the minimum baseline for the `gallery` project. Use this version or newer.

## Core rules
- Tailwind CSS version 4 is required for `gallery`.
- Do not use middleware in `gallery`.
- Use proxy-based handling instead of middleware.

## Notes
- The current `gallery/package.json` is the source of truth for the baseline versions.
- If the project is upgraded, the new version must be equal or newer than these baselines.
