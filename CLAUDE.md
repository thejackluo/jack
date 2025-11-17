# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing Jack Luo's personal website and documentation. The repository includes:

- **`website/`** - Active Astro-based static site (v4.3.2) - Production website
- **`jack-portfolio-old/`** - Archived Next.js portfolio with Sanity CMS (v5.0.1)
- **`jack-sanity-old/`** - Archived Sanity CMS studio for content management
- **`docs/`** - Comprehensive architecture documentation, PRD, and development stories
- **`AGENTS.md`** - BMAD-METHOD agent definitions and workflows

## Current State

The repository is currently focused on the **Astro website** (`website/` directory). The Next.js and Sanity projects have been archived with the `-old` suffix and are no longer actively maintained.

## Technology Stack

### Website (Astro - Active Project)

**Core Stack:**
- **Astro**: v5.13.9 (using modern Astro 5.x features)
- **Node.js**: v18+ required
- **TypeScript**: v5.6.3
- **Prettier**: v3.5.0 for code formatting

**Content Management:**
- Markdown-based content collections
- Content schemas defined in `src/content/config.ts`
- Collections: blogs, projects, templates

**Build System:**
- Static site generation (SSG)
- Output to `dist/` directory
- Legacy assets in `public/` directory

### Archived Projects

**jack-portfolio-old (Next.js v15.3.5):**
- Next.js 15 with App Router
- Sanity CMS integration
- Tailwind CSS v4, Framer Motion
- React 19, TypeScript 5

**jack-sanity-old (Sanity v3):**
- Standalone Sanity Studio
- Custom schemas for content management

## Development Commands

### Website (Astro) - Primary Project

```bash
cd website/

# Development
npm install              # Install dependencies
npm run dev              # Start dev server at localhost:4321
npm run build            # Build static site to dist/
npm run preview          # Preview built site

# Validation & Formatting
npm run test             # Run Astro type checking
npm run validate:content # Validate content schemas
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Content Generation
npm run new:blog <slug> "Title"    # Generate new blog post
npm run new:project <slug> "Title" # Generate new project
```

### Archived Projects (Reference Only)

**jack-portfolio-old:**
```bash
cd jack-portfolio-old/
npm run dev          # Start Next.js dev server at localhost:3000
npm run build        # Build for production
npm run lint         # Run ESLint
npm run sanity:dev   # Start Sanity studio
```

**jack-sanity-old:**
```bash
cd jack-sanity-old/
npm run dev          # Start Sanity studio dev server
```

## Directory Structure

### Website (Active)

```
website/
├── src/
│   ├── components/    # Astro/React components
│   ├── content/       # Markdown content collections
│   │   ├── blogs/     # Blog posts
│   │   ├── projects/  # Project case studies
│   │   ├── templates/ # Content templates
│   │   └── config.ts  # Content schemas
│   ├── layouts/       # Page layouts
│   └── pages/         # Route pages
├── public/            # Static assets (copied to dist/)
└── dist/              # Build output (generated)
```

### Documentation

```
docs/
├── PRD.md             # Product Requirements Document
├── architecture.md    # Architecture overview
├── architecture/      # Detailed architecture docs
├── prd/               # Detailed PRD with epics
├── stories/           # Development stories
└── mcp/               # MCP configurations
```

## Content Management

### Content Collections (Astro)

All content is Markdown-based with frontmatter validation:

**Blogs**: `website/src/content/blogs/`
- Markdown files with frontmatter metadata
- Validated against schemas in `config.ts`

**Projects**: `website/src/content/projects/`
- Project case studies and portfolio items
- Rich frontmatter for project details

**Templates**: `website/src/content/templates/`
- Reusable content templates

### Content Authoring Workflow

1. **Generate new content**:
   ```bash
   npm run new:blog <slug> "Title"
   # or
   npm run new:project <slug> "Title"
   ```

2. **Add assets**:
   - Place assets in `public/assets/blogs/<slug>/` or `public/assets/projects/<slug>/`

3. **Edit content**:
   - Edit the generated Markdown file
   - Follow required frontmatter schema

4. **Validate**:
   ```bash
   npm run validate:content
   npm run format
   ```

5. **Build & test**:
   ```bash
   npm run build
   npm run preview
   ```

## Development Workflow

### BMAD-METHOD Agents

This repository uses BMAD-METHOD for workflow coordination. Available agents are defined in `AGENTS.md`:

- **dev** - Full Stack Developer for implementation
- **architect** - System design and architecture
- **pm** - Product Manager for strategy and features
- **po** - Product Owner for backlog and stories
- **sm** - Scrum Master for agile processes
- **ux-expert** - UI/UX design and specifications
- **qa** - Test Architect and Quality Advisor
- **analyst** - Business Analyst for research
- **bmad-orchestrator** - Workflow coordination
- **bmad-master** - Comprehensive cross-domain tasks

Reference agents in your work: "As dev, implement feature X" or "Use architect to design..."

### Story-Driven Development

The repository follows a story-driven approach documented in `docs/`:

1. **PRD** (`docs/PRD.md`, `docs/prd/`) - Product requirements and goals
2. **Architecture** (`docs/architecture/`, `docs/architecture.md`) - Technical decisions and system design
3. **Stories** (`docs/stories/`) - Development tasks and implementation tracking

## Testing & Validation

### Current Testing Approach

The website uses a simplified testing strategy:

- **Type Checking**: `npm run test` (Astro type checking)
- **Content Validation**: `npm run validate:content` (schema validation)
- **Build Validation**: `npm run build` (ensure builds complete)
- **Format Checking**: `npm run format:check` (Prettier validation)

**Note**: Unit tests (Vitest) and E2E tests (Playwright) have been removed. Testing focuses on type safety, content validation, and successful builds.

### Pre-Commit Checklist

Before committing:
1. Run `npm run validate:content` to check content schemas
2. Run `npm run format` to format code
3. Run `npm run build` to ensure production build succeeds
4. Review changes for quality

## Asset Management

- **Static Assets**: Place in `public/` directory (copied verbatim to `dist/`)
- **Blog Assets**: `public/assets/blogs/<slug>/`
- **Project Assets**: `public/assets/projects/<slug>/`
- **Images**: Served as static files (no optimization in Astro by default)
- **Fonts**: `public/fonts/`
- **Icons**: `public/icons/`

## Common Development Tasks

### Adding New Content

**New Blog Post:**
```bash
cd website/
npm run new:blog my-blog-title "My Blog Title"
# Edit src/content/blogs/my-blog-title.md
# Add assets to public/assets/blogs/my-blog-title/
npm run validate:content
```

**New Project:**
```bash
cd website/
npm run new:project my-project "My Project Name"
# Edit src/content/projects/my-project.md
# Add assets to public/assets/projects/my-project/
npm run validate:content
```

### Updating Content Schemas

Content schemas are defined in `website/src/content/config.ts`. After modifying schemas:

1. Update the schema definition
2. Run `npm run validate:content`
3. Fix any validation errors in existing content
4. Test build: `npm run build`

### Code Formatting

The project uses Prettier with specific configuration (defined in `package.json`):

```bash
npm run format        # Format all files
npm run format:check  # Check formatting without changes
```

Prettier settings:
- No semicolons
- 100 character line width
- 2 space indentation
- Single quotes
- ES5 trailing commas

### Deployment Preparation

Build for production:
```bash
cd website/
npm run build    # Creates production-ready static files in dist/
npm run preview  # Preview the built site locally
```

The `dist/` directory contains the complete static site ready for deployment to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## Repository Context

### Branch Information

- **Main Branch**: Contains current work with archived Next.js/Sanity projects
- **Development**: Follows story-driven approach with comprehensive documentation

### Migration History

This repository represents multiple iterations:

1. **Legacy**: Static HTML/CSS/JS files (archived in `_legacy_backup_pre_astro/`)
2. **Astro Migration**: Current production site using Astro SSG
3. **Next.js Experiment**: Attempted migration to Next.js + Sanity (now archived)
4. **Current Focus**: Refined Astro-based static site

The Next.js and Sanity projects (`jack-portfolio-old/`, `jack-sanity-old/`) are preserved for reference but are no longer actively developed.

## Documentation Reference

- **Main README**: `/README.md` - Repository overview and branch strategy
- **Website README**: `/website/README.md` - Website-specific documentation and version history
- **PRD**: `/docs/PRD.md` - Product requirements and goals
- **Architecture**: `/docs/architecture.md`, `/docs/architecture/` - System design documentation
- **Stories**: `/docs/stories/` - Development story tracking
- **Agents**: `/AGENTS.md` - BMAD-METHOD agent definitions

## Key Differences from Previous Versions

This updated CLAUDE.md reflects significant changes:

1. **Astro Version**: Now using Astro 5.13.9 (previously documented as 4.1.0)
2. **Project Focus**: Single active project (`website/`), others archived
3. **Testing**: Simplified testing approach (removed Vitest/Playwright)
4. **Formatting**: Added Prettier for code formatting
5. **Directory Names**: Next.js and Sanity projects renamed with `-old` suffix
6. **BMAD Integration**: Added BMAD-METHOD agents for workflow management
7. **Templates**: New content/templates directory added

## Working with This Repository

When making changes:

1. **Focus on `website/` directory** - This is the active project
2. **Use BMAD agents** - Reference agents in AGENTS.md for guidance
3. **Follow story-driven workflow** - Check docs/stories/ for current work
4. **Validate content** - Always run content validation before committing
5. **Format code** - Use Prettier for consistent formatting
6. **Check documentation** - Review relevant docs/ files for context

## Version Information

- **Website Version**: v4.3.2 (see website/README.md for version history)
- **Astro Version**: v5.13.9
- **Node.js Required**: v18+
- **Last Major Update**: Organization and archival of Next.js/Sanity projects

---

**Note**: This repository is actively maintained. The Astro website (`website/`) is the production-ready project, while the Next.js and Sanity projects are archived for reference.
