# 2. Epic and Story Structure

**Note:** These epics must be developed sequentially. All stories from Epic 1 must be completed before starting development on Epic 2.

### Epic 1: Content Management Modernization

**Epic Goal:** To upgrade the static portfolio website into a dynamic content platform, enabling easy management and sophisticated display of an expanding collection of blogs, projects, and a personal journey timeline.

---

#### **Story 1.1: Foundational Content Engine & SSG Setup**

**As a** site owner, **I want** a modern static site generator integrated into my project, **so that** future content additions and updates can be managed efficiently with Markdown.

**Acceptance Criteria:**
1.  A lightweight Static Site Generator (e.g., Eleventy, Astro) is installed and configured in the `website/` directory.
2.  An `npm run build` script processes source files and outputs a static site to a `dist/` directory.
3.  The `index.html` page is converted to use the SSG's templating system while maintaining its exact visual layout and functionality.
4.  All existing CSS and JavaScript files are correctly integrated into the new build process.
5.  All assets (fonts, images, icons) are correctly copied to the output directory.
6.  The SSG provides a local development server via an `npm run dev` command.

---

#### **Story 1.2: Implement Dynamic Blog System with Filtering & Analytics**

**As a** site owner, **I want** a dynamic, filterable blog system, **so that** I can easily display all 40 of my articles and allow visitors to find relevant content.

**Acceptance Criteria:**
1.  A new `/writing` page dynamically lists all blog posts from a `/content/blogs` directory.
2.  Each blog post is a separate Markdown (`.md`) file with frontmatter (title, date, tags).
3.  The `/writing` page includes UI controls to filter blog posts by tags or year.
4.  Clicking a blog post navigates to its unique page (e.g., `/writing/my-first-post`).
5.  A blog post template correctly renders Markdown content into the site's existing HTML blog style.
6.  A simple analytics tool is integrated to track blog post views.
7.  All existing blog content is converted to the new Markdown format.

---

#### **Story 1.3: Implement Dynamic Projects Page with Modals and Separate Journey Page**

**As a** site owner, **I want** a dedicated projects page with interactive pop-ups and a separate journey timeline, **so that** I can professionally showcase my work in detail and clearly present my personal history.

**Acceptance Criteria:**
1.  A new `/projects` page is created that dynamically renders project cards from Markdown files in a `/content/projects` directory.
2.  A new `/journey` page is created that dynamically renders the personal timeline from a `/content/timeline` directory/file.
3.  The main site navigation is updated with distinct links to "Projects" and "Journey".
4.  Clicking a project card on the `/projects` page opens a pop-up modal.
5.  The modal displays the project's detailed description and an image gallery/carousel.
6.  The modal is responsive and can be easily closed.

---
### Epic 2: UI/UX Modernization & SPA Transformation

**Epic Goal:** To transition the site from a collection of separate pages into a fluid, single-page experience with modern styling and updated content, paving the way for a future migration to Next.js.

---

#### **Story 2.1: Implement Core Single-Page Structure with Horizontal Scrolling**

**As a** user, **I want** to navigate between the main sections of the site using smooth scrolling, **so that** I can experience the site as a single, fluid application.

**Acceptance Criteria:**
1.  The primary pages (Home, Projects, Journey, Writing) are refactored to be sections within a single, main layout.
2.  The site's main navigation links now trigger a smooth horizontal scroll to the corresponding section instead of a full page load.
3.  The URL hash updates as the user scrolls to each section (e.g., `.../#projects`).
4.  Direct navigation to a section via URL (e.g., `jack-luo.com/#projects`) correctly scrolls to that section on load.

---

#### **Story 2.2: Incremental Migration to Tailwind CSS**

**As a** developer, **I want** to use Tailwind CSS for all styling, **so that** I can build a consistent and maintainable UI with modern utility-first classes.

**Acceptance Criteria:**
1.  Tailwind CSS is installed and configured in the project's build process.
2.  A `tailwind.config.js` file is created, defining the site's primary colors, fonts, and spacing to match the existing design.
3.  The Home section/page is fully refactored to use Tailwind utility classes for all its styling.
4.  The old, manual CSS files related to the Home section (e.g., `index.css`, `landing.css`) are removed after the refactor is complete.

---

#### **Story 2.3: AI-Powered Copywriting and Content Update**

**As a** site owner, **I want** the website's main copy to be professionally updated, **so that** it accurately reflects my current brand and accomplishments.

**Acceptance Criteria:**
1.  New, researched copy for the Home, Journey, and Projects sections is provided and approved.
2.  The provided copy is implemented into the respective components/sections of the website.
3.  The tone and style of the new copy are consistent across the site.

---

#### **Story 2.4: Build "About Me" Page and Implement Site-Wide Animations**

**As a** visitor, **I want** to learn more about the site's author on a dedicated page and enjoy subtle animations, **so that** I have a more engaging and informative experience.

**Acceptance Criteria:**
1.  A new "About Me" section is created within the single-page layout.
2.  The page is built using the established Tailwind CSS components.
3.  The page includes content for the user's backstory, accomplishments, failures, and an FAQ section.
4.  Subtle scroll-based animations (e.g., fade-ins) are added to elements across all sections.
5.  Interactive elements (like buttons) have subtle hover and click animations.