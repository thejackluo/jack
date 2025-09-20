# Observability & Analytics
- Embed Plausible script in `Base.astro` layout with domain configuration (`<script defer data-domain="jack-luo.com" src="https://plausible.io/js/script.js"></script>`).
- For blog analytics, use custom events fired in post template when articles mount.
- Monitor build metrics via CI logs; optional integration with Astro’s telemetry disabled for privacy.
