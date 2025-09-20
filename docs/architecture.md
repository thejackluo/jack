# Jack Portfolio Brownfield Enhancement Architecture

## Introduction
This document outlines the architectural approach for enhancing the Jack portfolio website with a modern static site generator (SSG), content-as-code workflows, and supporting analytics. It serves as the blueprint for AI-driven development while ensuring upgrades integrate cleanly with the existing static HTML/CSS/JS site.

*Relationship to existing architecture:* the current site ships prebuilt HTML from the `website/` directory without a build pipeline. The modernization wraps the site in an Astro-based SSG that preserves today’s visual layer and assets while introducing structured content directories and repeatable build tooling. Where new patterns are introduced (e.g., Markdown content collections, templated layouts), this document specifies how they sit alongside legacy assets during migration.

## Existing Project Analysis
**Validated with user 2025-02-14:** Current system is a manually curated static site served from the `website/` folder, with vanilla HTML/CSS/JS, vendor bundles under `lib/`, and content duplicated across individual pages.

### Current Project State
- **Primary Purpose:** Public portfolio highlighting journey, projects, blogs, and resume.
- **Current Tech Stack:** Plain HTML5 pages, handcrafted CSS (`src/css/*.css`), vanilla JavaScript (`src/js/*.js`), vendor CSS/JS libraries (Bootstrap, AOS, fullPage.js) under `lib/`.
- **Architecture Style:** Monolithic static site; no templating, no build step, duplicated markup per page.
- **Deployment Method:** Copy static files to hosting/CDN (no automated pipeline discovered).

### Available Documentation
- `docs/prd/*.md` – product goals, epic/story breakdown.
- `website/README.md` – high-level project description and version history.

### Identified Constraints
- No existing build tooling; must introduce Node-based pipeline from scratch.
- Assets referenced with relative paths (`lib/...`, `src/...`, `assets/...`); migration must preserve URLs during incremental rollout.
- Multiple standalone HTML files share duplicated sections (nav/footer) that will require layout extraction.
- Current `package.json` lacks scripts; adding Astro must not break ad-hoc static hosting during transition.

## Enhancement Scope and Integration Strategy
**Integration validation (2025-02-14):** The proposed approach keeps the current `website/` directory intact while introducing an Astro project alongside it. Migration occurs page-by-page, ensuring parity with the legacy output before removing old pages.

### Enhancement Overview
- **Enhancement Type:** Static Site Generator adoption with structured content model.
- **Scope:** 
  - Install Astro in `website/` (or `website/astro/`) and configure build to emit static HTML/CSS/JS to `website/dist/`.
  - Convert existing pages into Astro layouts/components while preserving styling and behavior.
  - Introduce Markdown collections for blogs, projects, and journey timeline content.
  - Add Plausible (preferred) or GoatCounter analytics snippet through Astro integration.
  - Establish local dev (`npm run dev`) and production build (`npm run build`) scripts.

### Integration Points
- Legacy assets (`assets/`, `lib/`, `src/css`, `src/js`) remain readable by Astro via `public/` or static imports.
- Shared layout fragments (header, footer) extracted into Astro layout components and applied to pages.
- Existing interactive JS (modals, toggles) either migrates into Astro client scripts or reused via static `<script>` tags.
- Markdown collections feed `/writing`, `/projects`, and `/journey` pages while preserving current routes.

### Boundary Definition
- `website/astro/` (new) – Astro source files (`src/pages`, `src/layouts`, `src/content`).
- `website/public/` – houses fonts/images/icons copied from existing `assets/` for Astro build access.
- Legacy HTML remains available during migration; final deployment serves `dist/` contents.

### Compatibility Requirements
- During transition, ensure root-level assets keep same URLs to avoid breaking external references or SEO.
- Maintain existing meta tags and structured data to preserve search indexing.
- Ensure SSG outputs match the current DOM to avoid visual regressions before enhancements (filters, modals) roll out.

## System Architecture Overview
### Target State Diagram (Conceptual)
1. **Content Layer:** Markdown files under `src/content/{blogs,projects,timeline}` with frontmatter.
2. **Build Layer:** Astro project compiles Markdown + layouts into static pages.
3. **Presentation Layer:** Generated HTML/CSS served from `dist/`, reusing existing styles and scripts.
4. **Analytics Layer:** Lightweight script (Plausible) embedded via Astro integration component.

## Technology Stack Decisions
- **Static Site Generator:** Astro (Node 18+). Chosen for incremental adoption, Markdown collection support, component islands for future interactivity (blog filters, project modals), and strong asset handling.
- **Styling:** Keep existing CSS; imported into Astro layouts globally. No immediate switch to Tailwind or CSS-in-JS to minimize risk.
- **JavaScript:** Continue using vanilla JS where sufficient; optionally encapsulate future interactive widgets as Astro components with client directives.
- **Content Format:** Markdown with YAML frontmatter for blogs (`title`, `description`, `publishDate`, `tags`), projects (`title`, `summary`, `tags`, `images`, `links`), timeline entries (`date`, `title`, `bullets`).
- **Analytics:** Plausible Analytics via official script (self-hosted optional) or GoatCounter fallback if Plausible unavailable.

## Content & Data Architecture
### Blogs (`/writing`)
- Directory: `src/content/blogs/slug.md`.
- Frontmatter fields: `title` (string), `publishDate` (ISO), `tags` (array), `excerpt` (string), `heroImage` (optional path), `externalUrl` (optional).
- Generated pages: list view (`src/pages/writing.astro`) with filtering by tag/year, detail pages via Astro dynamic routes (`src/pages/writing/[slug].astro`).

### Projects (`/projects`)
- Directory: `src/content/projects/slug.md`.
- Frontmatter: `title`, `role`, `tech`, `summary`, `description` (Markdown body), `gallery` (array of image paths), `links` (array of { label, url }).
- Astro builds cards for listing and modals hydrated client-side using `client:idle` components consuming frontmatter.

### Journey Timeline (`/journey`)
- Directory: `src/content/timeline/yyyymm-identifier.md` or single `timeline.mdx` with structured data.
- Fields: `title`, `date`, `category`, `milestones` (array). Rendered into timeline component with sorted chronology.

## Application Architecture
### Layout Extraction
- Create `src/layouts/Base.astro` replicating `index.html` head/meta, linking to CSS/JS.
- Additional partials: `src/components/Header.astro`, `Footer.astro`, `SEO.astro` for meta management.
- Use Astro’s `setHtmlAttributes` to retain `<html lang>` and meta tags.

### Routing Plan
- Map existing pages: `/` → `src/pages/index.astro`, `/resume` → `src/pages/resume.astro`, `/journey` etc.
- 404 page: migrate `404.html` to `src/pages/404.astro` with same content.
- Legacy special pages under `special/` become nested routes.

### Asset Strategy
- Move static assets into `public/` with same relative paths (e.g., `public/assets/images/...`). Astro copies them untouched.
- For vendor JS/CSS, place under `public/lib` and include via `<link>`/`<script>` to avoid bundler interference.

## Build & Deployment Architecture
### Local Development
- `npm install` (Astro + adapters) inside `website/`.
- Scripts:
  - `npm run dev` → `astro dev` serving on localhost with hot reload.
  - `npm run build` → `astro build` output to `website/dist/`.
  - `npm run preview` optional for staging.

### Production Build Flow
1. Clear previous `dist/` output.
2. Run `npm run build` to generate static assets.
3. Deploy contents of `dist/` to static hosting provider (e.g., Netlify, Vercel static export, GitHub Pages, or current hosting solution).
4. During migration, optionally deploy both `dist/` and legacy bundle until parity confirmed.

### CI/CD Recommendation
- Add GitHub Actions workflow that runs `npm ci && npm run build` on push to main and publishes `dist/` to target host.
- Include caching for `node_modules` to speed builds.

## Observability & Analytics
- Embed Plausible script in `Base.astro` layout with domain configuration (`<script defer data-domain="jack-luo.com" src="https://plausible.io/js/script.js"></script>`).
- For blog analytics, use custom events fired in post template when articles mount.
- Monitor build metrics via CI logs; optional integration with Astro’s telemetry disabled for privacy.

## Performance & SEO Considerations
- Maintain existing `<meta>` tags and Open Graph data; enhance with structured JSON-LD for articles/projects once Markdown metadata available.
- Use Astro’s image optimization for project galleries (Story 1.3) where beneficial.
- Ensure CSS remains split to avoid blocking; consider bundling vendor CSS via Astro if size becomes an issue.

## Security Posture
- Static output continues to have minimal attack surface.
- Keep third-party scripts limited (analytics only) and loaded over HTTPS.
- For forms (if added later), plan serverless endpoint integration with validation.

## Migration Strategy
1. Initialize Astro project (`npm create astro@latest .`) inside `website/` (after backing up existing files).
2. Move existing HTML into Astro pages without altering layout to verify parity (`npm run dev` screenshot diff).
3. Gradually refactor shared structural elements into layouts/components.
4. Introduce Markdown collections starting with blogs (Story 1.2) while verifying each post renders identically.
5. Deprecate legacy HTML pages once Astro equivalents deployed.
6. Update documentation/README with new commands and contributor guidance.

## Testing Strategy
- **Existing Test Framework:** none; adopt Astro’s recommended tooling.
- **New Unit Tests:** use Vitest for utility functions/components (tests under `tests/` or `src/components/__tests__`).
- **Integration Tests:** leverage Playwright or Cypress to verify generated routes render and interactive filters/modals function.
- **Regression:** add Lighthouse CI checks to ensure performance parity; run `npm run build` in CI to catch build regressions.

## Change Log
| Change | Date | Version | Description | Author |
| --- | --- | --- | --- | --- |
| Initial architecture draft | 2025-02-14 | 0.1 | Brownfield modernization architecture created after validating current static site state with user | Winston |

## Next Steps
### Story Manager Handoff
Use this architecture (docs/architecture.md) when preparing stories. Emphasize:
- New Astro project within `website/` using Markdown collections.
- Preserve existing asset paths during migration.
- First development story: **Story 1.1** (Astro installation, layout parity, build/dev scripts).

### Developer Handoff
Developers should:
- Read `docs/architecture.md` for Astro structure and migration plan.
- Follow tasks in Story 1.1 to scaffold Astro, set up build/dev scripts, and convert `index.html` using supplied layouts while keeping asset paths stable.
- Validate `npm run build` output matches current site before refactoring additional pages.
- Commit updated README instructions for running the site with Astro commands.
