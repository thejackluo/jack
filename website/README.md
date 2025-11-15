# Jack Luo's Personal Website

**Version 5.0.1** — Modern Astro-powered portfolio and blog platform

Hello everyone! This is the fifth major iteration of my personal website, built with [Astro](https://astro.build) for optimal performance and developer experience. Everything is open source and free to use—just remember to contact me for author permission.

## 🚀 What's New in v5.0

This version represents a complete architectural overhaul, migrating from static HTML to a modern static site generator (SSG) powered by Astro. Key improvements include:

- **Content Collections**: Structured Markdown-based content management for blogs and projects
- **Dynamic Blog System**: Filterable blog listing with tag/year filtering and analytics integration
- **Component Architecture**: Reusable Astro components and layouts for maintainability
- **Performance Optimized**: Static site generation with minimal JavaScript for fast load times
- **Developer Experience**: Hot reloading, TypeScript support, and automated content validation
- **Analytics Integration**: Plausible analytics for privacy-friendly visitor tracking

## 🏗️ Architecture Overview

### Built with Astro

This site uses [Astro](https://astro.build), a modern static site generator that delivers:

- **Zero JS by default**: Astro ships zero JavaScript to the browser by default, resulting in faster page loads
- **Component Islands**: Interactive components are hydrated only when needed, keeping bundle sizes small
- **Content Collections**: Type-safe Markdown content management with schema validation
- **Framework Flexibility**: Can use React, Vue, Svelte, or vanilla JS for interactive components
- **SSG + SSR**: Static site generation with optional server-side rendering support

### Project Structure

```
website/
├── src/
│   ├── components/      # Reusable Astro components (Header, Footer, SEO)
│   ├── layouts/         # Base layout templates
│   ├── pages/           # Astro pages (file-based routing)
│   ├── content/         # Markdown content collections
│   │   ├── blogs/       # Blog post Markdown files
│   │   ├── projects/    # Project case study Markdown files
│   │   └── config.ts    # Content collection schemas (Zod)
│   └── lib/             # Utility functions and helpers
├── public/              # Static assets (copied verbatim to dist/)
│   ├── assets/          # Images, fonts, icons
│   └── src/css/        # Legacy CSS files
├── scripts/             # CLI helpers for content authoring
│   ├── new-blog.mjs    # Generate new blog post template
│   └── new-project.mjs # Generate new project template
└── dist/               # Build output (generated, gitignored)
```

### Content Collections

Blogs and projects are managed through Astro's content collections system, which provides:

- **Type Safety**: Zod schemas ensure frontmatter matches expected structure
- **Validation**: Automatic validation during build and development
- **TypeScript Support**: Full autocomplete and type checking for content
- **Migration Path**: Easy to migrate from legacy HTML to structured Markdown

## 📦 Getting Started

### Prerequisites

- **Node.js 18+** (Astro requires modern Node.js runtime)
- **npm** or **yarn** package manager

### Installation

```bash
npm install
```

This installs Astro and all development dependencies including TypeScript, Prettier, and Astro's type checker.

### Local Development

Start the Astro development server with hot reloading:

```bash
npm run dev
```

The site will be available at `http://localhost:4321` (default port). The dev server provides:

- **Hot Module Replacement (HMR)**: Instant updates when you change files
- **Markdown Pipeline**: Content collections are processed in real-time
- **Type Checking**: TypeScript errors shown in terminal and browser console

### Production Build

Generate optimized static files:

```bash
npm run build
```

This command:

- Processes all Astro pages and components
- Validates all content collections against their schemas
- Generates static HTML, CSS, and JavaScript
- Outputs everything to `website/dist/` directory

### Preview Production Build

Test the production build locally before deploying:

```bash
npm run preview
```

This serves the `dist/` directory exactly as it would appear in production, useful for catching build-time issues.

## ✅ Content Validation

### How `npm run validate:content` Works

The `validate:content` script runs `astro check`, which performs comprehensive validation:

```bash
npm run validate:content
```

**What it validates:**

1. **Content Collection Schemas**:
   - Verifies all Markdown files in `src/content/blogs/` and `src/content/projects/` match their Zod schemas
   - Checks required fields (`title`, `publishDate`, `tags`, etc.) are present
   - Validates data types (dates, URLs, arrays) match schema expectations
   - Ensures optional fields are properly formatted when present

2. **TypeScript Type Safety**:
   - Type-checks all `.astro`, `.ts`, and `.tsx` files
   - Validates component props and function signatures
   - Catches type errors before runtime

3. **Astro-Specific Checks**:
   - Validates Astro component syntax
   - Checks for proper use of Astro directives (`client:load`, `set:html`, etc.)
   - Verifies import paths and module resolution

**Example validation errors:**

```bash
# Missing required field
❌ Blog "my-post.md" is missing required field "tags"

# Invalid date format
❌ Blog "another-post.md" has invalid "publishDate": expected ISO date string

# Type mismatch
❌ Project "cool-project.md" has invalid "tech": expected array of strings
```

**When to run:**

- Before committing new content (catch schema errors early)
- In CI/CD pipelines (prevent broken builds)
- After migrating legacy content (verify migration correctness)
- When updating content schemas (ensure existing content still validates)

**Integration with build:**

The build process (`npm run build`) also runs validation automatically. If validation fails, the build will fail with clear error messages pointing to the problematic files.

## 📝 Content Authoring Workflow

### Creating a New Blog Post

1. **Generate template**:

   ```bash
   npm run new:blog my-post-slug "My Post Title"
   ```

   This creates `src/content/blogs/my-post-slug.md` with pre-filled frontmatter.

2. **Add assets**:
   Place images in `public/assets/blogs/my-post-slug/` and reference them in frontmatter:

   ```yaml
   heroImage: /assets/blogs/my-post-slug/hero.jpg
   ```

3. **Write content**:
   Fill in required frontmatter fields:

   ```yaml
   title: 'My Post Title'
   publishDate: 2025-01-15
   tags: ['web-dev', 'astro']
   excerpt: 'A brief summary of the post'
   heroImage: '/assets/blogs/my-post-slug/hero.jpg'
   ```

   Then write your Markdown content below the frontmatter.

4. **Validate**:

   ```bash
   npm run validate:content
   ```

   Fix any schema errors before proceeding.

5. **Build and test**:
   ```bash
   npm run build
   npm run preview
   ```
   Verify the post renders correctly at `/writing/my-post-slug`.

### Creating a New Project

1. **Generate template**:

   ```bash
   npm run new:project project-slug "Project Name"
   ```

2. **Fill in project details**:

   ```yaml
   title: 'Project Name'
   role: 'Lead Developer'
   tech: ['React', 'TypeScript', 'Node.js']
   summary: 'Brief one-sentence description'
   description: 'Detailed project description in Markdown'
   gallery:
     - src: '/assets/projects/project-slug/screenshot.jpg'
       alt: 'Project screenshot'
       caption: 'Optional caption'
   links:
     - label: 'Live Demo'
       url: 'https://example.com'
   ```

3. **Validate and build** (same process as blogs)

## 🎨 Style & Voice Guidelines

### Blog Writing Style

Research-backed guidelines derived from high-performing Medium articles:

- **Hook fast**: Open with a vivid metaphor or tension in the first 2 sentences
- **Section the narrative**: Use `##` headings every 3–4 paragraphs to alternate between story and analysis
- **Data + reflection pairing**: Cite stats/anecdotes, then immediately unpack the personal lesson
- **CTA framing**: Close with a prompt—experiment to try, question to journal on, or resource to explore
- **Tone**: Curious, candid, slightly contrarian; avoid corporate jargon, prefer concrete verbs, keep sentences under ~22 words

### Project Case Studies

- **Hero summary**: Lead with problem → solution → outcome in 2 sentences; mention differentiator
- **Structure**: Use Problem/Solution/Impact headers with short bullet lists for technical decisions
- **Evidence**: Include metrics, user quotes, or shipped artifacts (screenshots, links) to prove traction
- **Tech stack**: Limit to 3–5 technologies, focusing on pieces that explain how the solution works
- **Role transparency**: Dedicate a line to what you personally owned (architecture? research? ops?)

## 🧪 Testing

### Unit Tests

Run Vitest unit tests:

```bash
npm run test:unit
```

Tests cover:

- Content filtering logic (`src/lib/blog.ts`)
- Date utilities (`src/lib/date.ts`)
- Analytics helpers (`src/lib/analytics.ts`)

### End-to-End Tests

Playwright E2E tests validate user workflows:

```bash
npm run test:e2e
```

Tests cover:

- Blog listing page navigation
- Filter functionality (tags, years)
- Blog post detail page rendering
- Content collection integration

### Build Validation

Always run before deploying:

```bash
npm run build
```

This ensures:

- All content collections validate against schemas
- TypeScript compiles without errors
- Static assets are properly copied
- No broken links or missing files

## 📊 Analytics

The site uses [Plausible Analytics](https://plausible.io) for privacy-friendly visitor tracking:

- **No cookies**: GDPR-compliant, no cookie banners needed
- **Lightweight**: ~1KB script, minimal performance impact
- **Custom Events**: Blog post views tracked via `plausible('Blog Post View', { props: { slug } })`

Analytics script is included in `src/layouts/Base.astro` and automatically loads on all pages.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` directory contains all static files ready for deployment.

### Deployment Options

- **Vercel**: Connect GitHub repo, auto-deploys on push
- **Netlify**: Connect GitHub repo, uses `dist/` as publish directory
- **GitHub Pages**: Build locally, push `dist/` to `gh-pages` branch
- **Any static host**: Upload `dist/` contents to your hosting provider

### CI/CD Integration

Add to your CI pipeline:

```yaml
- run: npm install
- run: npm run validate:content
- run: npm run build
- deploy: dist/ directory
```

## 📚 Available Scripts

| Command                              | Description                                 |
| ------------------------------------ | ------------------------------------------- |
| `npm run dev`                        | Start development server with hot reload    |
| `npm run build`                      | Build production static site to `dist/`     |
| `npm run preview`                    | Preview production build locally            |
| `npm run validate:content`           | Validate content collections and TypeScript |
| `npm run new:blog <slug> "Title"`    | Generate new blog post template             |
| `npm run new:project <slug> "Title"` | Generate new project template               |
| `npm run format`                     | Format code with Prettier                   |
| `npm run format:check`               | Check code formatting without modifying     |

## 🗂️ Directory Structure Notes

- **`src/`**: Astro source files (components, layouts, pages, content)
- **`public/`**: Static assets copied verbatim to `dist/` (images, fonts, CSS, JS)
- **`src/content/`**: Markdown content collections with Zod schema validation
- **`scripts/`**: CLI helpers for content authoring workflows
- **`dist/`**: Build output (gitignored, generated on build)
- **`_legacy_backup_pre_astro/`**: Backup of original static HTML site

## 🔄 Migration Notes

This site was migrated from a static HTML/CSS/JS site to Astro. Legacy files are preserved in `_legacy_backup_pre_astro/` for reference. The migration process:

1. **Preserved visual design**: All CSS and styling maintained
2. **Migrated content**: 8 legacy blogs converted to Markdown
3. **Seeded projects**: 4 project case studies created from existing content
4. **Maintained URLs**: Routing structure preserved for SEO
5. **Added features**: Dynamic filtering, analytics, content validation

## 🎯 Future Roadmap

- [ ] Enhanced project showcase pages with interactive galleries
- [ ] Search functionality for blogs and projects
- [ ] RSS feed generation for blog posts
- [ ] Dark mode support
- [ ] Performance optimizations (image optimization, code splitting)
- [ ] Additional content types (talks, publications, etc.)

## 📖 Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Zod Schema Validation](https://zod.dev)
- [Plausible Analytics](https://plausible.io/docs)

## 📝 Version History

### v5.0.1 (January 2025) — Astro Migration Complete

- Migrated to Astro static site generator
- Implemented content collections for blogs and projects
- Built dynamic blog system with filtering and analytics
- Added content validation workflows
- Created authoring templates and CLI helpers
- Integrated Plausible analytics
- Set up testing infrastructure (Vitest + Playwright)

### v4.3.2 (October 2024) — Legacy Static Site

- Organized files into new folder structure
- Added toy design content
- Updated blog posts and journey section
- Added books page

### v4.2 (September - October 2024)

- Updated blogs and resume
- Added books page
- Updated journey book list

### v4.1 (July 2024)

- Updated tagline
- Added new blog posts

### v4.0 (January 2024)

- Major projects section update
- Separated creative and project sections
- Updated journey section

## 👤 Author

**Jack Luo**

- Website: [jack-luo.com](https://jack-luo.com)
- GitHub: [@thejackluo](https://github.com/thejackluo)

---

_This website is a continuous work in progress. Feel free to explore, learn, and adapt the code for your own projects!_
