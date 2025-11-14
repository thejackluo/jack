# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo containing Jack Luo's personal website projects in multiple iterations and technologies:

- **`website/`** - Astro-based static site (v4.1.0) - Current production website
- **`jack-portfolio/`** - Next.js portfolio with Sanity CMS (v5.0.1) - Modernized version in development
- **`jack/`** - Sanity CMS studio for content management
- **`docs/`** - Architecture documentation and PRD

### Technology Stack by Project

**Website (Astro v4.1.0):**
- Astro static site generator with React integration
- Content collections for blogs and projects (Markdown-based)
- Vitest for unit testing, Playwright for E2E testing
- Custom scripting for content generation

**Jack Portfolio (Next.js v5.0.1):**
- Next.js 15 with App Router
- Sanity CMS integration with structured content
- Tailwind CSS and Framer Motion for animations
- TypeScript throughout

**Sanity Studio:**
- Sanity v3 content management system
- Custom schemas for blogs, projects, experience, education

## Development Commands

### Website (Astro)
```bash
cd website/
npm run dev          # Start dev server at localhost:4321
npm run build        # Build static site to dist/
npm run preview      # Preview built site
npm run test         # Run Astro type checking
npm run test:unit    # Run Vitest unit tests
npm run test:unit:run # Run unit tests once
npm run test:e2e     # Run Playwright E2E tests
npm run validate:content # Validate content schemas
npm run new:blog <slug> "Title"    # Generate new blog post
npm run new:project <slug> "Title" # Generate new project
```

### Jack Portfolio (Next.js)
```bash
cd jack-portfolio/
npm run dev          # Start Next.js dev server at localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run sanity:dev   # Start Sanity studio
npm run sanity:build # Build Sanity studio
npm run sanity:deploy # Deploy Sanity studio
```

### Sanity Studio
```bash
cd jack/
npm run dev          # Start Sanity studio dev server
npm run build        # Build Sanity studio
npm run deploy       # Deploy Sanity studio
```

## Architecture Overview

### Content Management Strategy
The repository is transitioning from static HTML to modern content management:

1. **Legacy Website**: Static HTML/CSS/JS files
2. **Astro Website**: Static site generator with Markdown content collections
3. **Next.js Portfolio**: Dynamic site with Sanity CMS integration

### Content Collections (Astro)
- **Blogs**: `website/src/content/blogs/` - Markdown files with frontmatter
- **Projects**: `website/src/content/projects/` - Project case studies
- Content validated via schemas in `website/src/content/config.ts`

### Sanity Schemas (Next.js)
Located in `jack-portfolio/sanity/schemas/`:
- `blogPost.ts` - Blog posts with rich content
- `project.ts` - Portfolio projects
- `experience.ts` - Work experience
- `education.ts` - Educational background
- `skill.ts` - Technical skills
- `siteSettings.ts` - Global site configuration

### Migration Status
The project is in active migration from Astro (website/) to Next.js (jack-portfolio/).
- Website directory contains the current production Astro site
- Jack-portfolio contains the modernized Next.js version being developed
- Both share content through the Sanity CMS in the jack/ directory

## Content Authoring Workflow

### For Astro Website
1. Generate content stub: `npm run new:blog <slug> "Title"`
2. Place assets in `public/assets/blogs/<slug>/`
3. Edit generated Markdown file with required frontmatter
4. Validate: `npm run validate:content`
5. Test build: `npm run build`

### For Next.js Portfolio
1. Use Sanity Studio to create/edit content
2. Content automatically synced to Next.js app via Sanity client
3. Schemas enforce content structure and validation

## Testing Strategy

### Astro Website
- **Unit Tests**: Vitest for utility functions and components
- **E2E Tests**: Playwright for user journey testing
- **Content Validation**: Schema validation via `astro check`
- **Build Validation**: Ensure production builds complete without errors

### Next.js Portfolio
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode enabled
- **Build Testing**: Next.js build process validates code

## Development Notes

### Asset Management
- **Astro**: Static assets in `public/` directory, copied as-is to build output
- **Next.js**: Next.js Image optimization enabled with multiple formats (WebP, AVIF)
- **Sanity**: Media assets managed through Sanity's CDN

### Performance Considerations
- Next.js config includes image optimization and package import optimization
- Security headers configured in Next.js for production
- Astro generates static files for optimal performance

### Content Guidelines
Follow voice and style guidelines documented in `website/README.md`:
- **Blog Voice**: Hook fast, section narratives, pair data with reflection
- **Project Case Studies**: Hero summary, Problem/Solution/Impact structure
- **Validation**: Use content validation tools before publishing

## Common Development Tasks

### Adding New Content
- **Blog Post**: Use `npm run new:blog` in website/ or create via Sanity Studio
- **Project**: Use `npm run new:project` in website/ or create via Sanity Studio
- **Schema Changes**: Update schemas in respective schema directories

### Running Tests
- Always run `npm run validate:content` before committing Astro content
- Run `npm run test:e2e` for full user journey validation
- Use `npm run lint` for Next.js code quality checks

### Deployment Preparation
- **Astro**: `npm run build` creates production-ready static files in `dist/`
- **Next.js**: `npm run build` prepares optimized production build
- **Sanity**: `npm run deploy` publishes studio changes

## Integration Points

### Sanity CMS Integration
- Sanity project ID: `vzws1a6s` (configured in sanity configs)
- Dataset: `jack`
- Used by both jack/ studio and jack-portfolio/ Next.js app
- Provides structured content management across projects

### Cross-Project Dependencies
- Content created in Sanity studio flows to Next.js portfolio
- Astro website operates independently with Markdown content
- Migration path documented in `docs/architecture.md`