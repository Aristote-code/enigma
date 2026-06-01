# Design System

pnpm 10 + Turborepo monorepo. Requires Node >= 22.

## Structure

| Directory                   | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `packages/ui`               | Core component library (shadcn/ui + Radix UI)    |
| `packages/ui-patterns`      | Composite patterns (FilterBar, CommandMenu, etc.) |
| `packages/config`           | Tailwind v4 CSS config, theme tokens, colors      |
| `packages/icons`            | SVG icon library as React components              |
| `packages/build-icons`      | CLI tool to generate icon components from SVGs    |
| `packages/tsconfig`         | Shared TypeScript configs                         |
| `packages/eslint-config-supabase` | Shared ESLint rules                         |
| `apps/design-system`        | Documentation site (Next.js + Contentlayer)       |

## Common Commands

```bash
pnpm install                          # install dependencies
pnpm dev:design-system                # run design system docs dev server
pnpm build:design-system              # build the docs site
pnpm test:ui                          # run ui package tests (vitest)
pnpm test:ui-patterns                 # run ui-patterns tests (vitest)
pnpm typecheck                        # typecheck all packages
pnpm lint                             # lint all packages
```

## Conventions

**UI** — import from `'ui'`, use `_Shadcn_` suffixed variants for form primitives. Check `packages/ui/index.tsx` before creating new primitives.

**Styling** — Tailwind only, semantic tokens (`bg-muted`, `text-foreground-light`), no hardcoded colors. Theme config lives in `packages/config/`.

**Language** — Use U.S. English everywhere.
