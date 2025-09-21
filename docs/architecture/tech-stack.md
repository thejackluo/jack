# Tech Stack Overview

This summary provides the quick-reference view of the technologies used across the modernization effort. Consult `docs/architecture/technology-stack-decisions.md` for the detailed rationale behind each choice.

## Runtime & Frameworks
- **Node.js 18+** powers local development, Astro builds, and scaffolding scripts.
- **Astro 5** is the primary static site generator, producing HTML from Markdown-driven content collections and shared layouts.
- **TypeScript 5** enforces typing in Astro frontmatter, component utilities, and generator scripts.

## Styling & Assets
- Legacy CSS lives in `website/public/` and is imported globally through `src/layouts/Base.astro`.
- Component-scoped styles reside under `website/src/styles/` (CSS modules / utility files) to promote reuse.
- Fonts, images, and vendor libraries live beneath `website/public/{assets,lib}` and are copied verbatim during `astro build`.

## Content Pipeline
- Markdown collections are defined in `website/src/content/config.ts` and stored under `website/src/content/{blogs,projects}`.
- Authoring helpers (`npm run new:blog`, `npm run new:project`) generate frontmatter-complete stubs and enforce naming conventions.
- `npm run validate:content` (Astro check) validates schema compliance and TypeScript types prior to builds.

## Tooling & Quality Gates
- **Astro CLI** scripts: `npm run dev`, `npm run build`, `npm run preview` manage the dev server and build pipeline.
- **Vitest** and **Playwright** are the preferred frameworks for unit and end-to-end coverage respectively (see Testing Strategy).
- **Plausible Analytics** is embedded through `Base.astro`; blog-specific events fire via lightweight client islands.

## Supporting Projects
- The legacy Next.js site under `jack-portfolio/` remains as reference material but is not part of the Astro build.
- Sanity Studio under `jack/` is kept isolated; no runtime coupling with the Astro site is expected during Epic 1.
