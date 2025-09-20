# Next Steps
## Story Manager Handoff
Use this architecture (docs/architecture.md) when preparing stories. Emphasize:
- New Astro project within `website/` using Markdown collections.
- Preserve existing asset paths during migration.
- First development story: **Story 1.1** (Astro installation, layout parity, build/dev scripts).

## Developer Handoff
Developers should:
- Read `docs/architecture.md` for Astro structure and migration plan.
- Follow tasks in Story 1.1 to scaffold Astro, set up build/dev scripts, and convert `index.html` using supplied layouts while keeping asset paths stable.
- Validate `npm run build` output matches current site before refactoring additional pages.
- Commit updated README instructions for running the site with Astro commands.
