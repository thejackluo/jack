# Jack Luo's Personal Website - Content Management Modernization PRD

## 1. Goals and Background Context

**Goals:**
* To upgrade the static portfolio website into a dynamic content platform.
* Enable easy management and sophisticated display of an expanding collection of blogs, projects, and a personal timeline.
* Incorporate modern development practices (SSG, content-as-code) for better maintainability.
* Add basic analytics to track blog post engagement.

**Background Context:**
The current website is a classic HTML/CSS/JS build where all content is manually coded into static files. This makes updates infrequent and cumbersome, especially with a growing library of over 40 blog posts and new projects to showcase. This PRD outlines the plan to introduce a content management system using Markdown files and a Static Site Generator (SSG). This will keep the site fast and secure while making content updates as simple as adding a text file.

**Change Log:**

| Date       | Version | Description              | Author   |
| :--------- | :------ | :----------------------- | :------- |
| 2025-09-19 | 1.0     | Initial PRD draft        | pm (John)|

## 2. Epic and Story Structure

The modernization will be handled within a single, focused epic.

### Epic 1: Content Management Modernization

**Epic Goal:** To upgrade the static portfolio website into a dynamic content platform, enabling easy management and sophisticated display of an expanding collection of blogs, projects, and a personal journey timeline.

---

### **Story 1.1: Foundational Content Engine & SSG Setup**

**As a** site owner,
**I want** a modern static site generator integrated into my project,
**so that** future content additions and updates can be managed efficiently with Markdown.

**Acceptance Criteria:**
1.  A lightweight Static Site Generator (e.g., Eleventy, Astro) is installed and configured in the `website/` directory.
2.  A `npm run build` script is established that processes source files and outputs a static site to a `dist/` or `_site/` directory.
3.  The `index.html` page is converted to use the SSG's templating system while maintaining its exact visual layout and functionality.
4.  All existing CSS and JavaScript files are correctly integrated into the new build process.
5.  All assets (fonts, images, icons) are correctly copied to the output directory and referenced properly.
6.  The SSG provides a local development server via an `npm run dev` command.

---

### **Story 1.2: Implement Dynamic Blog System with Filtering & Analytics**

**As a** site owner,
**I want** a dynamic, filterable blog system,
**so that** I can easily display all 40 of my articles and allow visitors to find relevant content.

**Acceptance Criteria:**
1.  A new `/writing` page dynamically lists all blog posts from a `/content/blogs` directory.
2.  Each blog post is a separate Markdown (`.md`) file with frontmatter for metadata (title, date, tags).
3.  The `/writing` page includes UI controls to filter blog posts by tags or year.
4.  Clicking a blog post navigates to its unique page (e.g., `/writing/my-first-post`).
5.  A blog post template correctly renders Markdown content into the site's existing HTML blog style.
6.  A simple, privacy-focused analytics tool (e.g., Plausible, GoatCounter) is integrated to track blog post views.
7.  All existing blog content is converted to the new Markdown format.

---

### **Story 1.3 (Revised): Implement Dynamic Projects Page with Modals and Separate Journey Page**

**As a** site owner,
**I want** a dedicated projects page with interactive pop-ups and a separate journey timeline,
**so that** I can professionally showcase my work in detail and clearly present my personal history.

**Acceptance Criteria:**
1.  A new `/projects` page is created that dynamically renders project cards from Markdown files in a `/content/projects` directory.
2.  A new `/journey` page is created that dynamically renders the personal timeline from a `/content/timeline` directory/file.
3.  The main site navigation is updated with distinct links to "Projects" and "Journey".
4.  Clicking a project card on the `/projects` page opens a pop-up modal.
5.  The modal displays the project's detailed description and an image gallery/carousel with all associated images.
6.  The modal is responsive and can be easily closed.

## 3. Next Steps

This document provides the full context for the modernization epic. Once saved as `docs/prd.md` in your project, use your IDE agents to shard this document and begin the development cycle with Story 1.1.