# Source Tree Overview

This guide outlines the repository layout so contributors know where to add or update files during Epic 1.

```
/
├── docs/                     # Product, architecture, and story documentation
│   ├── prd/                  # Sharded PRD sections
│   ├── architecture/         # Architecture source (this directory)
│   └── stories/              # Story specs and Dev/QAs records
├── website/                  # Astro static site project (target of Epic 1)
│   ├── src/
│   │   ├── components/       # Reusable Astro components and islands
│   │   ├── layouts/          # Shared page layouts (e.g., Base.astro)
│   │   ├── pages/            # Route definitions (`index.astro`, future `/writing`)
│   │   ├── content/          # Markdown collections (blogs, projects, templates)
│   │   └── styles/           # Component-specific CSS modules/utilities
│   ├── public/               # Static assets copied verbatim into builds
│   ├── scripts/              # Authoring helpers (`new:blog`, `new:project`)
│   ├── package.json          # Astro scripts and dependencies
│   └── tsconfig.json         # TypeScript config shared by Astro/Vitest
├── jack-portfolio/           # Legacy Next.js 15 implementation (reference only)
├── jack/                     # Sanity Studio project (content source playground)
├── web-bundles/              # Historical static bundles (unused in Epic 1)
└── .bmad-core/               # Agent configuration and automation metadata
```

## Contribution Notes
- Epic 1 changes belong under `website/` unless a story explicitly targets Sanity or the Next.js project.
- Documentation updates should live in `docs/` with sharded organization respected (`docs/prd`, `docs/architecture`, `docs/stories`).
- Generated assets (`dist/`, `.astro/`) must remain out of version control per `.gitignore`.
- Keep authoring templates (`website/src/content/templates/`) in sync with any schema updates.
