# Jack Luo's Website Repository

This repository contains multiple iterations and approaches to building my personal website. Each branch and folder represents a different stage of development, experimentation, or architectural approach.

## Repository Structure

### 📁 Main Folders

#### `website/` - Astro-based Website (v4.x)

The current production website built with Astro. This is the most stable and feature-complete version.

- **Tech Stack**: Astro, Markdown content collections, SSG
- **Status**: Production-ready, actively maintained
- **Features**: Blog system, project showcase, journey timeline, writing section
- **See**: [`website/README.md`](./website/README.md) for detailed documentation

#### `jack-portfolio/` - Next.js + Sanity CMS (Main Branch)

The latest iteration using Next.js with Sanity CMS integration. This is the most up-to-date version with comprehensive documentation and stories.

- **Tech Stack**: Next.js 14+, Sanity CMS, TypeScript, Tailwind CSS
- **Status**: Currently being refactored
- **Features**:
  - Sanity-powered content management
  - Dynamic blog system with filtering and analytics
  - Comprehensive architecture documentation
  - Story-driven development approach
- **Documentation**: Contains PRD, architecture docs, and development stories in `docs/`

#### `jack-sanity/` - Sanity CMS Studio

Standalone Sanity Content Studio configuration for content management.

- **Purpose**: Content editing environment for the Next.js portfolio
- **Status**: Configured and ready for use

#### `docs/` - Project Documentation

Comprehensive documentation including:

- **PRD** (`docs/prd/`): Product Requirements Document with goals, epics, and story structure
- **Architecture** (`docs/architecture/`): Detailed architecture documentation covering:
  - Application architecture
  - Tech stack decisions
  - Content and data architecture
  - Migration strategies
  - Testing strategies
- **Stories** (`docs/stories/`): Development stories tracking implementation progress

## 🌿 Branches Overview

### `main` Branch

**Status**: Most updated, actively being refactored

The main branch contains:

- **Next.js portfolio** (`jack-portfolio/`) with Sanity CMS integration
- **Comprehensive documentation** in `docs/` including:
  - PRD with epics and stories
  - Detailed architecture documentation
  - Development stories tracking progress
- **Current focus**: Refactoring and improving the Next.js implementation

This branch represents the most mature approach with:

- Spec-driven engineering practices
- Story-based development workflow
- Comprehensive architecture planning
- Sanity CMS for content management

### `5.0-website` Branch

**Status**: Experimental, limited scope

A quirky experimental version with:

- Funny scenarios and creative additions
- Relatively limited functionality
- Experimental features and design concepts

**Note**: This branch serves as a creative playground for testing ideas that may or may not make it into production.

### `v5.0-website` Branch

**Status**: Spec-driven engineering attempt

An attempt to rebuild the website using:

- **Kiro** (spec-driven engineering tool)
- **Next.js** conversion from Astro
- Spec-driven development methodology

This branch represents an experimental approach to converting the Astro website to Next.js using specification-driven engineering principles.

## 🗂️ Additional Folders

### `web-bundles/`

BMAD-METHOD agent configurations and team setups for various development workflows.

### `docs/mcp/`

MCP (Model Context Protocol) configuration examples for Claude Desktop and Codex.

### `AGENTS.md`

BMAD-METHOD agent definitions and workflows for the project.

## 🚀 Getting Started

### For the Astro Website (`website/`)

```bash
cd website
npm install
npm run dev
```

### For the Next.js Portfolio (`jack-portfolio/`)

```bash
cd jack-portfolio
npm install
npm run dev
```

### For Sanity Studio (`jack-sanity/`)

```bash
cd jack-sanity
npm install
npm run dev
```

## 📝 Development Workflow

The main branch follows a story-driven development approach:

1. **PRD** defines goals and epics
2. **Stories** break down epics into implementable tasks
3. **Architecture docs** guide technical decisions
4. **Development** follows the story specifications

See `docs/stories/` for current development progress.

## 🎯 Current Status

- **Main Branch**: Active refactoring of Next.js + Sanity implementation
- **Website Folder**: Production Astro site (stable)
- **Documentation**: Comprehensive PRD and architecture docs available

## 📚 Documentation

- **Website README**: [`website/README.md`](./website/README.md)
- **PRD**: [`docs/PRD.md`](./docs/PRD.md)
- **Architecture**: [`docs/architecture/`](./docs/architecture/)
- **Stories**: [`docs/stories/`](./docs/stories/)

## 👤 Author

Jack Luo

---

**Note**: This repository contains multiple approaches to building the same website. The `main` branch with `jack-portfolio/` represents the current direction, while `website/` remains the stable production version.
