# Content & Data Architecture
## Blogs (`/writing`)
- Directory: `src/content/blogs/slug.md`.
- Frontmatter fields: `title` (string), `publishDate` (ISO), `tags` (array), `excerpt` (string), `heroImage` (optional path), `externalUrl` (optional).
- Generated pages: list view (`src/pages/writing.astro`) with filtering by tag/year, detail pages via Astro dynamic routes (`src/pages/writing/[slug].astro`).

## Projects (`/projects`)
- Directory: `src/content/projects/slug.md`.
- Frontmatter: `title`, `role`, `tech`, `summary`, `description` (Markdown body), `gallery` (array of image paths), `links` (array of { label, url }).
- Astro builds cards for listing and modals hydrated client-side using `client:idle` components consuming frontmatter.

## Journey Timeline (`/journey`)
- Directory: `src/content/timeline/yyyymm-identifier.md` or single `timeline.mdx` with structured data.
- Fields: `title`, `date`, `category`, `milestones` (array). Rendered into timeline component with sorted chronology.
