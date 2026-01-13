# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Activepieces marketing website built with Nuxt 3, Vue 3, and Tailwind CSS. It serves as the public-facing website for Activepieces, an open-source business automation platform.

## Commands

```bash
# Install dependencies
yarn install

# Development server (http://localhost:3000)
yarn dev

# Production build
yarn build

# Preview production build
yarn preview

# Static site generation
yarn generate
```

## Architecture

### Directory Structure
- `pages/` - File-based routing (Nuxt auto-routes)
- `components/` - Vue components, with `components/pages/` containing page-specific sections
- `composables/` - Vue composables (auto-imported by Nuxt)
- `layouts/` - Page layouts (`default`, `home` with transparent header, `playbook`)
- `server/api/` - Server-side API endpoints using H3
- `assets/css/main.css` - Global Tailwind CSS entry point

### Key Patterns

**Component Organization**: Page sections live in `components/pages/{page-name}/`. For example, homepage sections are in `components/pages/index/` (Hero.vue, Features.vue, Pieces.vue, etc.).

**Layouts**: The `home` layout uses a transparent header for dark hero sections. The `playbook` layout is used for content-heavy pages like embedded-ipaas and ai-transformation routes.

**Dynamic Routes**: The playbook system uses `pages/playbook/[...all].vue` as a catch-all, with routes configured in `nuxt.config.ts` hooks to map `/embedded-ipaas/*` and `/ai-transformation/*` to this handler.

**Server API**: Endpoints in `server/api/` are auto-mapped to `/api/*` routes. They use H3's `defineEventHandler` pattern.

**Composables**: Auto-imported by Nuxt. Examples: `useGithubStars()` for star count with localStorage caching, `usePiecesCount()` for integration count.

### External Services
- **Strapi**: Blog content via `STRAPI_URL` env variable
- **Supabase**: Backend storage
- **Brandfetch**: Company logo API for customer logos

### Styling
- Tailwind CSS with Flowbite plugin for UI components
- Primary color: `#6e41e2` (purple) with full palette defined in `tailwind.config.js`
- Custom font: Libre Baskerville (loaded via Google Fonts)
- Custom animations: `infinite-scroll`, `border` gradient animation

### Route Redirects
Several routes redirect to external resources (docs to Mintlify, roadmap to GitHub, etc.) - these are configured in `nuxt.config.ts` routeRules.
