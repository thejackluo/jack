# Jack Portfolio Setup Guide

## Environment Configuration

Create a `.env.local` file in the root of your project with the following variables:

```bash
# Sanity CMS Configuration
# Get these values from your Sanity dashboard: https://sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Optional: Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GTM_ID=

# Optional: Contact Form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_USER_ID=

# Optional: Vercel/Deployment
VERCEL_URL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Sanity CMS Setup

### 1. Create a Sanity Account
- Go to [sanity.io](https://sanity.io)
- Sign up or log in to your account

### 2. Create a New Project
- Run `npx sanity init` in your project directory
- Follow the prompts to create a new project
- Note down your **Project ID** and **Dataset** name

### 3. Configure Environment Variables
- Add your Sanity project ID to `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Add your dataset name to `NEXT_PUBLIC_SANITY_DATASET` (usually "production")
- Generate an API token from your Sanity dashboard and add it to `SANITY_API_TOKEN`

### 4. Start Sanity Studio
```bash
npm run sanity:dev
```

This will start the Sanity Studio on `http://localhost:3333`

### 5. Add Content
Use the Sanity Studio to add:
- Site Settings (contact info, social links, etc.)
- Blog Posts
- Projects
- Experience
- Education
- Skills

## Development Commands

```bash
# Start Next.js development server
npm run dev

# Start Sanity Studio
npm run sanity:dev

# Build for production
npm run build

# Deploy Sanity Studio
npm run sanity:deploy
```

## CSS Modules + Tailwind CSS

This project uses both CSS modules and Tailwind CSS:

- **Global styles**: `src/styles/globals.css`
- **Component modules**: `src/styles/*.module.css`
- **Component-specific modules**: `src/components/**/*.module.css`

### Example Usage:
```tsx
import styles from './Component.module.css'

export function Component() {
  return (
    <div className={cn(styles.container, "flex items-center")}>
      <button className={cn(styles.button, "px-4 py-2")}>
        Click me
      </button>
    </div>
  )
}
```

## Features Implemented

### ✅ Completed
- [x] Next.js 15 with App Router and TypeScript
- [x] Tailwind CSS 4 configuration
- [x] CSS modules integration
- [x] Custom font loading (PP Stellar, Elianto, Dual)
- [x] Sanity CMS schemas and client setup
- [x] Framer Motion for animations
- [x] Asset migration from original project
- [x] Responsive design utilities
- [x] Glass morphism effects
- [x] Component library foundation

### 🚧 In Progress
- [ ] React components for all sections
- [ ] Page layouts and routing
- [ ] Content migration from original HTML
- [ ] Animation implementations
- [ ] Form handling and validation

### 📋 Todo
- [ ] Blog post rendering
- [ ] Project showcases
- [ ] Contact form
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Testing suite
- [ ] CI/CD pipeline
- [ ] Documentation

## Troubleshooting

### Sanity Connection Issues
If you see "Sanity not configured yet" on the homepage:
1. Check your `.env.local` file has the correct values
2. Ensure your Sanity project is created and accessible
3. Verify your API token has the correct permissions

### CSS Module Issues
If styles aren't applying:
1. Check the import path is correct
2. Ensure the CSS module file exists
3. Verify the class names in your CSS match your usage

### Font Loading Issues
If custom fonts aren't loading:
1. Check that font files exist in `public/assets/fonts/`
2. Verify font-face declarations in `src/styles/globals.css`
3. Use the correct Tailwind font classes (e.g., `font-ppstellar`)

## Next Steps

1. Configure your Sanity project using the instructions above
2. Add your content through the Sanity Studio
3. Test the homepage to see your content displayed
4. Continue with component development and page creation 