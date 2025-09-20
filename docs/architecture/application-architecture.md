# Application Architecture
## Layout Extraction
- Create `src/layouts/Base.astro` replicating `index.html` head/meta, linking to CSS/JS.
- Additional partials: `src/components/Header.astro`, `Footer.astro`, `SEO.astro` for meta management.
- Use Astro’s `setHtmlAttributes` to retain `<html lang>` and meta tags.

## Routing Plan
- Map existing pages: `/` → `src/pages/index.astro`, `/resume` → `src/pages/resume.astro`, `/journey` etc.
- 404 page: migrate `404.html` to `src/pages/404.astro` with same content.
- Legacy special pages under `special/` become nested routes.

## Asset Strategy
- Move static assets into `public/` with same relative paths (e.g., `public/assets/images/...`). Astro copies them untouched.
- For vendor JS/CSS, place under `public/lib` and include via `<link>`/`<script>` to avoid bundler interference.
