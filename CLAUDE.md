# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Astro 6 site for **Matcom**, a construction company, built on the `astro-template-devanthos` template. Single-page marketing site (Spanish) with animated landing sections, contact form, dark/light theme, and smooth client-side navigation. Site is content-driven from `src/pages/index.astro`; the layout is shared and SEO/social metadata is centralized.

## Commands

- `pnpm dev` — start Astro dev server on `http://localhost:4321` (HMR).
- `pnpm build` — production build into `dist/`.
- `pnpm preview` — preview the production build locally.
- `pnpm astro` — passthrough to the Astro CLI (e.g. `pnpm astro add <integration>`).

Package manager: **pnpm** (a `pnpm-workspace.yaml` and `pnpm-lock.yaml` are present). Node 18+ required.

No test runner, linter, or formatter script is configured. Prettier plugins (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`) are installed as devDependencies — run via editor or add a `format` script if needed. Configuration is split across `.prettierrc` and `.prettierrc.json` (the `.json` file takes precedence); align them before relying on a single set of rules.

VS Code launch config (`.vscode/launch.json`) runs `./node_modules/.bin/astro dev` from the integrated terminal. Recommended extension: `astro-build.astro-vscode`.

## Architecture

### Stack
- **Astro 6** as the framework, with the `@astrojs/react` integration for islands.
- **Tailwind CSS 4** loaded via the `@tailwindcss/vite` plugin in `astro.config.mjs` (no `tailwind.config.*` — theme is configured inline in `src/styles/global.css` via `@theme inline` and CSS variables).
- **shadcn/ui (new-york style)** primitives in `src/components/ui/` — Radix-based, composed with `class-variance-authority` + `tailwind-merge` via the `cn()` helper in `src/lib/utils.ts`. `components.json` declares shadcn config (aliases, base color `zinc`, CSS variables, lucide icon library, and a `@magicui` registry).
- **React 19** only inside `.tsx` components hydrated as islands.
- **framer-motion** for scroll/scrub animations in the React sections (`Gallery`, `Timeline`, `Testimonial`, `Faq`, `Feature`, `Header`).
- **react-hook-form + zod + @hookform/resolvers** for the contact form in `src/components/form.tsx`.
- **lucide-react** for icons; **canvas-confetti** is available for celebratory effects.
- **astro:transitions / ClientRouter** is enabled in `Layout.astro` for view transitions.

### Path alias
`@/*` → `./src/*` (set in `tsconfig.json` and matched by `components.json`). Always use `@/...` imports in both `.astro` and `.tsx` files.

### Layout & page composition
- `src/layouts/Layout.astro` is the only layout. It sets `<html lang="es">`, loads `Rajdhani` from Google Fonts, imports `src/styles/global.css`, mounts `<SEO>`, `<Header client:load />`, a default `<slot />`, and `<Footer />`, and registers `<ClientRouter />` for view transitions.
- `src/pages/index.astro` is the only route. Props passed to `<Layout>` (`title`, `description`, `canonical`, `image`) drive SEO; the existing values are placeholders (`agregarurl.com/...`) that still need to be filled in.
- Sections are mounted in this order: `Hero`, `Feature (client:idle)`, `Services`, `WhyUs`, `Diferenciadores`, `Timeline (client:idle)`, `Gallery (client:idle)`, `Testimonial (client:idle)`, `Faq (client:idle)`, `Contacto`.

### Component conventions
- `src/components/interfaces/` holds page sections.
  - **`.astro`** sections are server-rendered, framework-free pieces (`Hero`, `Services`, `WhyUs`, `Diferenciadores`, `Contacto`, `Footer`, `RichResults`, `SEO`). They are zero-JS by default.
  - **`.tsx`** sections need interactivity (state, effects, motion, refs) and are mounted with a directive: `client:load` for the Header (needed immediately) and `client:idle` for everything else (defer until the browser is idle). Export as a **named** function — index.astro imports them as `{ Name }` from the file.
- `src/components/ui/` holds shadcn primitives (Button, Card, Accordion, Avatar, Field/Input/Textarea/Label, Separator, Sheet, ShineBorder, plus an `Illustration.astro` helper). Use these instead of writing raw form/UI markup.
- `src/components/form.tsx` is the contact form (zod-validated, with success state and confetti hookup). Imported by `Contacto.astro` as `{ Contact }` and rendered as an island.
- `src/components/icons/matcon.astro` is the brand mark consumed by `Hero.astro`.
- `src/lib/utils.ts` exports the `cn()` helper (`clsx` + `tailwind-merge`) — use it on every UI component that conditionally composes class names.

### Styling
- Theme tokens live as CSS variables in `src/styles/global.css` (`--background`, `--foreground`, `--primary`, `--radius`, chart/sidebar tokens, etc.) with `:root` (light) and `.dark` overrides. Colors are OKLCH. `baseColor` in `components.json` is `zinc` but the CSS overrides this with custom OKLCH values.
- Tailwind utilities like `bg-background`, `text-muted-foreground`, `border-border`, `font-rajdhani` resolve to those CSS variables via `@theme inline`.
- `body` in `Layout.astro` already sets `bg-background font-rajdhani relative overflow-x-hidden antialiased` — most sections can rely on the body styles and only need to manage their own spacing.

### SEO
- All meta tags (Open Graph, Twitter card, canonical, theme color, robots, favicons) are emitted by `src/components/interfaces/SEO.astro`. It also includes `RichResults.astro` (JSON-LD) at the bottom. Pass `title`, `description`, optional `preload[]`, `canonical`, and `image` from `<Layout>` — currently `image` and `canonical` are placeholders that need real values.

### Hydration directive rules
- Pure markup / no browser APIs → `.astro` file, no directive.
- Needs `useState`/`useEffect`/motion/refs and lives below the fold → `.tsx` with `client:idle`.
- Needs to be interactive on first paint (Header with its time clock and mobile sheet) → `.tsx` with `client:load`.
- Don't add `client:*` to `.astro` files; don't over-hydrate — sections like `Services`/`WhyUs` stay static for a reason.

## Skill: frontend-design

`.agents/skills/frontend-design/SKILL.md` is installed (pinned via `skills-lock.json`). **Invoke it via the `Skill` tool for any UI/component/page work in this repo** — it enforces a bold aesthetic direction, distinctive typography (no Inter/Roboto/Space Grotesk), CSS-variable theming, and intentional motion. Read its design-thinking and aesthetics sections before generating new interfaces.

## Working notes
- No tests, no linter, no CI configuration exists — don't invent commands.
- The project uses **tabs for indent in `.prettierrc.json` config but actual files use 4 spaces** — match the surrounding file, not the (conflicting) Prettier config, until the configs are reconciled.
- The Header (`src/components/interfaces/Header.tsx`) and a few image URLs in `Testimonial.tsx`/`Contacto.astro` still reference `shadcnblocks.com` / `deifkwefumgah.cloudfront.net` placeholders that should be swapped for Matcom branding before launch.
- `SEO.astro` has commented-out Google Analytics and PWA wiring (`/registerSW.js`, `manifest.webmanifest`) — leave as-is unless the user asks to enable them.
