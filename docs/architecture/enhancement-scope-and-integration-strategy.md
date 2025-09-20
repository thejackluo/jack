# Enhancement Scope and Integration Strategy
**Integration validation (2025-02-14):** The proposed approach keeps the current `website/` directory intact while introducing an Astro project alongside it. Migration occurs page-by-page, ensuring parity with the legacy output before removing old pages.

## Enhancement Overview
- **Enhancement Type:** Static Site Generator adoption with structured content model.
- **Scope:** 
  - Install Astro in `website/` (or `website/astro/`) and configure build to emit static HTML/CSS/JS to `website/dist/`.
  - Convert existing pages into Astro layouts/components while preserving styling and behavior.
  - Introduce Markdown collections for blogs, projects, and journey timeline content.
  - Add Plausible (preferred) or GoatCounter analytics snippet through Astro integration.
  - Establish local dev (`npm run dev`) and production build (`npm run build`) scripts.

## Integration Points
- Legacy assets (`assets/`, `lib/`, `src/css`, `src/js`) remain readable by Astro via `public/` or static imports.
- Shared layout fragments (header, footer) extracted into Astro layout components and applied to pages.
- Existing interactive JS (modals, toggles) either migrates into Astro client scripts or reused via static `<script>` tags.
- Markdown collections feed `/writing`, `/projects`, and `/journey` pages while preserving current routes.

## Boundary Definition
- `website/astro/` (new) – Astro source files (`src/pages`, `src/layouts`, `src/content`).
- `website/public/` – houses fonts/images/icons copied from existing `assets/` for Astro build access.
- Legacy HTML remains available during migration; final deployment serves `dist/` contents.

## Compatibility Requirements
- During transition, ensure root-level assets keep same URLs to avoid breaking external references or SEO.
- Maintain existing meta tags and structured data to preserve search indexing.
- Ensure SSG outputs match the current DOM to avoid visual regressions before enhancements (filters, modals) roll out.
