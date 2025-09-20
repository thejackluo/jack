# Existing Project Analysis
**Validated with user 2025-02-14:** Current system is a manually curated static site served from the `website/` folder, with vanilla HTML/CSS/JS, vendor bundles under `lib/`, and content duplicated across individual pages.

## Current Project State
- **Primary Purpose:** Public portfolio highlighting journey, projects, blogs, and resume.
- **Current Tech Stack:** Plain HTML5 pages, handcrafted CSS (`src/css/*.css`), vanilla JavaScript (`src/js/*.js`), vendor CSS/JS libraries (Bootstrap, AOS, fullPage.js) under `lib/`.
- **Architecture Style:** Monolithic static site; no templating, no build step, duplicated markup per page.
- **Deployment Method:** Copy static files to hosting/CDN (no automated pipeline discovered).

## Available Documentation
- `docs/prd/*.md` – product goals, epic/story breakdown.
- `website/README.md` – high-level project description and version history.

## Identified Constraints
- No existing build tooling; must introduce Node-based pipeline from scratch.
- Assets referenced with relative paths (`lib/...`, `src/...`, `assets/...`); migration must preserve URLs during incremental rollout.
- Multiple standalone HTML files share duplicated sections (nav/footer) that will require layout extraction.
- Current `package.json` lacks scripts; adding Astro must not break ad-hoc static hosting during transition.
