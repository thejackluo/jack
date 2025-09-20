# Build & Deployment Architecture
## Local Development
- `npm install` (Astro + adapters) inside `website/`.
- Scripts:
  - `npm run dev` → `astro dev` serving on localhost with hot reload.
  - `npm run build` → `astro build` output to `website/dist/`.
  - `npm run preview` optional for staging.

## Production Build Flow
1. Clear previous `dist/` output.
2. Run `npm run build` to generate static assets.
3. Deploy contents of `dist/` to static hosting provider (e.g., Netlify, Vercel static export, GitHub Pages, or current hosting solution).
4. During migration, optionally deploy both `dist/` and legacy bundle until parity confirmed.

## CI/CD Recommendation
- Add GitHub Actions workflow that runs `npm ci && npm run build` on push to main and publishes `dist/` to target host.
- Include caching for `node_modules` to speed builds.
