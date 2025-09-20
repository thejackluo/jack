# Migration Strategy
1. Initialize Astro project (`npm create astro@latest .`) inside `website/` (after backing up existing files).
2. Move existing HTML into Astro pages without altering layout to verify parity (`npm run dev` screenshot diff).
3. Gradually refactor shared structural elements into layouts/components.
4. Introduce Markdown collections starting with blogs (Story 1.2) while verifying each post renders identically.
5. Deprecate legacy HTML pages once Astro equivalents deployed.
6. Update documentation/README with new commands and contributor guidance.
