# Github Repo Name: jack

Hello everyone, this is the fourth iteration of my personal website.
Everything is open source and free to use, just remember to contact me for author permission.
Current version: 4.3.2 (planning to create a basic update log for the website).

## Getting Started

### Prerequisites
- Node.js 18 or higher (Astro requires the modern runtime)

### Installation
```bash
npm install
```

### Local Development
Run the Astro dev server and open the site at the printed URL (default http://localhost:4321):
```bash
npm run dev
```
The command provides hot reloading and uses the Markdown/SSG pipeline so future content stories slot in without additional configuration.

### Production Build & Preview
```bash
npm run build   # outputs static assets to website/dist/
npm run preview # serves the built output for smoke testing
```
`npm run build` is also the command you should wire into CI to guard against regressions in the static build.

## Directory Notes
- `src/` now contains Astro components, layouts, and pages.
- Markdown collections live in `src/content/{blogs,projects}` with schemas defined in `src/content/config.ts`.
- Legacy static assets (CSS, JS, HTML, images, fonts, icons) live in `public/` so they are copied verbatim into `dist/` during builds.
- Historical static files are preserved under `_legacy_backup_pre_astro/` for reference.

## What is this project about?
This is the most up-to-date version of my [personal website](https://jack-luo.com)!
It details my progress with discovering life, blogs, and (in the future) projects. My goal for this website is to capture who I am as a person and create a space with freedom to explore how to best arrange visual content!!
This website is going to be a continuous process. My next steps is to put more blogs in!

## Future Updates
- A better rendition of the journey section. Especially showing the projects (DONE)
- More blogs on the website (hosted natively) (WIP)
- Convert to Next.js (WIP)

## Version History

### v4.3 (October 2024) (new pages)
- Organized different files into new folders (Oct 18, 2024)
- Added funny scenarios on personal website (Oct 18, 2024)
- Added toy design content:
  - Toy week 2 (Oct 14, 2024)
  - Toy week 1 (Oct 14, 2024)
  - Updated descriptions for toy ideas (Oct 14, 2024)
  - Migrated PDFs (Oct 11, 2024)
  - Set up toy design site (Oct 11, 2024)

### v4.2 (September - October 2024) (2024 information update)
- Added books page (Oct 7, 2024)
- Updated blogs (Sep 7, 2024)
- Updated journey book list (Sep 7, 2024)
- Updated resume (2024 edition) (Sep 7, 2024)
- Updated website description (Sep 6, 2024)
- Updated preliminary description (Sep 4, 2024)

### v4.1 (July 2024) (minor blog updates)
- Updated tagline (Jul 9, 2024)
- Edited existing blog (Jul 9, 2024)
- Added a new blog (Jul 8, 2024)

### v4.0 (January 2024) (major page adds)
- Major update to projects section:
  - Updated images for projects (Jan 6, 2024)
  - Finished updating project descriptions (Jan 6, 2024)
  - Created project cards (Jan 6, 2024)
- Separated creative section and project section (Jan 6, 2024)
- Updated scrollbar and style (Jan 6, 2024)
- Updated journey section:
  - Updated journey background (Jan 2, 2024)
  - Created journey button (Jan 2, 2024)
  - Updated creative section (Jan 2, 2024)
- Updated main descriptions and files (Jan 2, 2024)
- Fixed "thejackluo" link bug (Jan 2, 2024)

### v3.0 (December 2023) (major page adds)
UPDATE THIS

## Content Collections
- Blogs and projects are now powered by Astro content collections. Schemas live in `src/content/config.ts` to enforce required frontmatter.
- Legacy HTML sources remain under `public/` and `_legacy_backup_pre_astro/` for reference; migrated Markdown lives in `src/content/blogs/` and `src/content/projects/`.

## Authoring Workflow
1. Generate a stub: `npm run new:blog <slug> "Title"` or `npm run new:project <slug> "Title"`. This copies the template and fills placeholders (date, hero paths).
2. Drop supporting assets in `public/assets/blogs/<slug>/` or `public/assets/projects/` before wiring them into frontmatter.
3. Fill in required fields (`tags`, `summary`, `description`, `tech`, etc.) and follow the style guidance below for the main body.
4. Run `npm run validate:content` to catch schema issues early, then `npm run build` before opening a PR.
5. Update any cross-links (e.g., README lists, nav cards) if the new entry should be surfaced elsewhere.

## Style & Voice Guidelines
Research inputs: reviewed the Medium posts listed in `ALL_BLOGS.md` (e.g., *The World Map of Higher Ed*, *Vending Machine Dreams*, *Why do people like quirky cultures?*, *Building for Decades*) and benchmarked portfolio case studies from Linear, Figma, and Superlist. Key takeaways drive the guidance below.

### Blog Voice & Structure
- **Hook fast**: open with a vivid metaphor or tension in the first 2 sentences (mirrors the high-performing Medium posts).
- **Section the narrative**: use `##` headings every 3–4 paragraphs to alternate between story and analysis.
- **Data + reflection pairing**: cite a stat, anecdote, or quote, then immediately unpack the personal lesson (keeps the tone honest but tactical).
- **CTA framing**: close with a prompt—experiment to try, question to journal on, or resource to explore—to maintain the reflective yet actionable voice.
- **Tone checklist**: curious, candid, slightly contrarian; avoid corporate jargon, prefer concrete verbs, and keep sentences under ~22 words.

### Project Case Studies
- **Hero summary**: lead with problem → solution → outcome in 2 sentences; mention differentiator (e.g., automation depth) to echo best-in-class design portfolios.
- **Problem/Solution/Impact** headers: readers scan for the before/after quickly; use short bullet lists for key technical decisions.
- **Surface evidence**: include metrics, user quotes, or shipped artifacts (screenshots, links) to prove traction.
- **Tech stack clarity**: limit to 3–5 technologies, focusing on the pieces that explain how the solution works.
- **Role transparency**: a dedicated line on what you personally owned (architecture? research? ops?) builds trust.

## Validation Checklist
- `npm run validate:content` — runs `astro check` to confirm schema + type safety.
- `npm run build` — ensures the production content pipeline compiles without frontmatter regressions.
- Manual spot-check: open generated Markdown in a Markdown preview (or Astro dev) to verify hero paths and internal links.

## Author
Jack Luo
