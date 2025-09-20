# Technology Stack Decisions
- **Static Site Generator:** Astro (Node 18+). Chosen for incremental adoption, Markdown collection support, component islands for future interactivity (blog filters, project modals), and strong asset handling.
- **Styling:** Keep existing CSS; imported into Astro layouts globally. No immediate switch to Tailwind or CSS-in-JS to minimize risk.
- **JavaScript:** Continue using vanilla JS where sufficient; optionally encapsulate future interactive widgets as Astro components with client directives.
- **Content Format:** Markdown with YAML frontmatter for blogs (`title`, `description`, `publishDate`, `tags`), projects (`title`, `summary`, `tags`, `images`, `links`), timeline entries (`date`, `title`, `bullets`).
- **Analytics:** Plausible Analytics via official script (self-hosted optional) or GoatCounter fallback if Plausible unavailable.
