# Testing Strategy
- **Existing Test Framework:** none; adopt Astro’s recommended tooling.
- **New Unit Tests:** use Vitest for utility functions/components (tests under `tests/` or `src/components/__tests__`).
- **Integration Tests:** leverage Playwright or Cypress to verify generated routes render and interactive filters/modals function.
- **Regression:** add Lighthouse CI checks to ensure performance parity; run `npm run build` in CI to catch build regressions.
