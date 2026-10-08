# Contributing

Every component lives in the **registry** (`src/registry`). The docs site, the shadcn-vue
registry JSON, the npm entry and the animation theme are all generated from it.

```
src/registry/
  ui/<slug>/
    <PascalName>.vue      # the component (more than one file is fine, e.g. Dock.vue + DockIcon.vue)
    index.ts              # barrel: exports the components and their Props types
    meta.json             # docs + registry metadata (see below)
  examples/
    <slug>-demo.vue       # first example = the hero preview on the docs page
    <slug>-<variant>.vue  # further examples
```

Run `npm run dev` for the docs site. `scripts/build-registry.mjs` runs first and validates every
`meta.json`; it regenerates `registry.json`, `src/index.ts`, `src/styles/theme.generated.css`
and `public/llms.txt` — never edit those by hand.

## Component rules

- `<script setup lang="ts">`, an exported `XProps` interface, `withDefaults` for defaults.
- Accept `class?: HTMLAttributes['class']` and merge it on the root (or the element the user
  will most want to style) with `cn()` from `@/lib/utils`.
- **Tailwind v4 utilities only** — no `<style>` blocks. Keyframes go in `meta.json`
  (`cssVars.theme` for the `animate-*` utility, `css` for the `@keyframes`); use names that won't
  collide (`marquee`, `shimmer-slide`, …). Tailwind v4 syntax: `bg-linear-to-r`, `from-(--my-var)`,
  `border-(length:--w)`, `[mask-image:…]`.
- Colours: use the shadcn tokens (`bg-background`, `text-foreground`, `text-muted-foreground`,
  `border-border`, `bg-primary`, …) so components theme automatically; hard-code a colour only when it
  *is* the effect (and expose it as a prop). Check light **and** dark (`dark:` variant).
- Motion: `import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'motion-v'`
  and render `<motion.div :initial :animate :transition :while-hover :while-in-view>`. CSS keyframes are
  preferred for simple infinite loops (cheaper, no JS).
- Allowed dependencies: `motion-v`, `@vueuse/core`, `@lucide/vue`, `cobe`, `canvas-confetti`,
  `rough-notation`. Ask before adding anything else.
- SSR-safe: never touch `window`/`document` during setup — use `onMounted`. Clean up listeners,
  `requestAnimationFrame`s, observers and timers in `onBeforeUnmount`.
- Respect reduced motion for anything that loops forever (`motion-reduce:` variants or
  `useReducedMotion()`).
- Accessibility: decorative layers get `aria-hidden="true"` and `pointer-events-none`; text that is
  split into animated spans keeps the full string available to assistive tech (`sr-only` copy or
  `aria-label`).
- API parity with [Magic UI](https://magicui.design/docs/components): same component names, prop names
  and defaults, translated to Vue idioms — `children` → default slot, `className` → `class`,
  `onX` callbacks → emits, render props → scoped slots.

## `meta.json`

```json
{
  "name": "border-beam",
  "title": "Border Beam",
  "description": "One sentence, shown under the title and in search.",
  "category": "special-effects",
  "exports": ["BorderBeam"],
  "dependencies": ["motion-v"],
  "registryDependencies": [],
  "cssVars": { "theme": { "animate-x": "x 3s linear infinite" } },
  "css": { "@keyframes x": { "to": { "transform": "rotate(360deg)" } } },
  "usage": "<script setup lang=\"ts\">…</script>\n\n<template>…</template>",
  "examples": [{ "name": "border-beam-demo", "title": "Login card" }],
  "api": [
    {
      "name": "BorderBeam",
      "props": [{ "name": "size", "type": "number", "default": "50", "description": "…" }],
      "slots": [{ "name": "default", "description": "…" }],
      "emits": [{ "name": "complete", "payload": "void", "description": "…" }]
    }
  ]
}
```

Categories: `components`, `special-effects`, `animations`, `text-animations`, `buttons`,
`backgrounds`, `device-mocks`. `registryDependencies` lists other slugs from this registry.

## Examples

- Import components the way a user would: `import { Marquee } from '@/components/ui/marquee'`.
- They render centred in a ~350px-tall preview box — make them look good there, in light and dark.
- Self-contained: no network calls besides images (`picsum.photos`, `avatar.vercel.sh`,
  `images.unsplash.com`).

## Checks

```bash
node scripts/build-registry.mjs   # validates meta.json + regenerates artifacts
npx vue-tsc --noEmit              # types
npx vitest run -t "<slug>"        # every example mounts with no errors or Vue warnings
```
