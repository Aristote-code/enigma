# Enigma Design System

A React component library and documentation site, built on **shadcn/ui + Radix UI** and **Tailwind CSS v4**, themed with [AlignUI](https://alignui.com) design tokens (Slate neutrals, electric-blue primary, Inter).

pnpm 10 + Turborepo monorepo. Requires Node >= 22.

## Structure

| Directory                         | Purpose                                           |
| --------------------------------- | ------------------------------------------------- |
| `packages/ui`                     | Core component library (shadcn/ui + Radix UI)     |
| `packages/ui-patterns`            | Composite patterns (FilterBar, CommandMenu, etc.) |
| `packages/config`                 | Tailwind v4 CSS config, theme tokens, colors      |
| `packages/icons`                  | SVG icon library as React components              |
| `packages/build-icons`            | CLI tool to generate icon components from SVGs    |
| `packages/tsconfig`               | Shared TypeScript configs                         |
| `packages/eslint-config-supabase` | Shared ESLint rules                               |
| `apps/enigma`                     | Documentation site (Next.js + Contentlayer)       |

## Commands

```bash
pnpm install               # install dependencies
pnpm dev:enigma            # run the docs dev server (http://localhost:3003)
pnpm build:enigma          # build the docs site
pnpm test:ui               # run ui package tests
pnpm test:ui-patterns      # run ui-patterns tests
pnpm typecheck             # typecheck all packages
```

## Theming

All visual design tokens live in `packages/config` and `packages/ui/build/css`. Components reference semantic Tailwind tokens (`bg-surface-200`, `text-foreground-light`, `border-default`, `text-brand`) — never hardcoded colors. Light and dark themes are defined as CSS custom properties and switched via the `data-theme` attribute.

## Deployment

The docs site deploys to Netlify via `netlify.toml` using `@netlify/plugin-nextjs`.
