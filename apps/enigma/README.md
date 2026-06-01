# Enigma Design System

Design resources for building consistent user experiences.

## Getting started

Install dependencies and start the development server:

```bash
cd apps/enigma
pnpm i
pnpm dev:full
```

The `dev:full` command runs both the Next.js development server and Contentlayer concurrently, which is recommended for most development workflows.

### Alternative commands

You can also run the development server and content watcher separately:

```bash
# Run only the Next.js development server
pnpm dev

# Run only the content watcher (in a separate terminal shell)
pnpm content:dev
```

Or run the development server from the root directory:

```bash
pnpm dev:enigma
```

To run both the development server and content watcher from the root directory, you can use:

```bash
# Run the development server
pnpm dev:enigma

# Run the content watcher (in a separate terminal shell)
pnpm --filter=enigma content:dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser to see the result.

### Watching for MDX changes

The `dev:full` command automatically watches for changes to MDX files with hot reload. If you're running `pnpm dev` separately, you'll need to run `pnpm content:dev` in a separate terminal shell to watch for content changes.

### Adding components

The design system _references_ components rather than housing them. That's an important distinction to make, as everything that follows here is about the documentation of components. You can add or edit components in one of these two places:

- [`packages/ui`](https://github.com/Aristote-code/enigma/tree/main/packages/ui): basic UI components
- [`packages/ui-patterns`](https://github.com/Aristote-code/enigma/tree/main/packages/ui-patterns): components which are built using NPM libraries or amalgamations of components from `packages/ui`

There are several parts of this design system that need to be manually updated after components have been added or removed (from documentation). These include:

- `config/docs.ts`: list of components in the sidebar
- `content/docs`: the actual component documentation
- `registry/examples.ts`: list of example components
- `registry/fragments.ts`: list of fragment components
- `registry/charts.ts`: list of chart components
- `registry/default/example/*`: the actual example components

You will need to rebuild the design system's registry after making new additions:

```bash
cd apps/enigma
pnpm build:registry
```
