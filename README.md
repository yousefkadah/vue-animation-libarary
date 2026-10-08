# Vue Magic UI

[![npm version](https://img.shields.io/npm/v/@yousefkadah/vue-magic-ui.svg)](https://www.npmjs.com/package/@yousefkadah/vue-magic-ui)
[![npm downloads](https://img.shields.io/npm/dm/@yousefkadah/vue-magic-ui.svg)](https://www.npmjs.com/package/@yousefkadah/vue-magic-ui)
[![license](https://img.shields.io/github/license/yousefkadah/vue-animation-libarary.svg)](LICENSE)

**74 free and open-source animated components for Vue 3** — built with TypeScript, Tailwind CSS v4 and [motion-v](https://motion.dev/docs/vue).
Copy them into your app with one command, or install the package from npm.

**[Documentation & live demos →](https://yousefkadah.github.io/vue-animation-libarary/)**

Using React? The same catalogue — same names, same props — is available as
**[React Magic UI](https://github.com/yousefkadah/react-animation-library)**.

## Why

- **Own the code.** Like shadcn-vue, components are copied into your project, so you can change anything.
- **One command.** `shadcn-vue add` drops in the source, installs npm dependencies and adds the keyframes to your CSS.
- **Themed by default.** Components use the shadcn colour tokens and work in light and dark mode.
- **Accessible motion.** Looping animations respect `prefers-reduced-motion`; split text stays readable by screen readers.
- **Typed and documented.** Every prop is typed and listed with its default on the docs site.

## Install a component (recommended)

You need a Vue 3.5+ project with Tailwind CSS v4 and [shadcn-vue](https://www.shadcn-vue.com/docs/installation) initialised. Then:

```bash
npx shadcn-vue@latest add https://yousefkadah.github.io/vue-animation-libarary/r/marquee.json
```

```vue
<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'
</script>

<template>
  <Marquee pause-on-hover>
    <span>Vue</span>
    <span>Nuxt</span>
    <span>Vite</span>
  </Marquee>
</template>
```

Add the registry once to `components.json` and use short names:

```json
{
  "registries": {
    "@magic": "https://yousefkadah.github.io/vue-animation-libarary/r/{name}.json"
  }
}
```

```bash
npx shadcn-vue@latest add @magic/border-beam @magic/number-ticker
```

## Or install from npm

```bash
npm install @yousefkadah/vue-magic-ui
```

```css
/* your Tailwind entry CSS */
@import "tailwindcss";
@import "@yousefkadah/vue-magic-ui/theme.css";
@source "../node_modules/@yousefkadah/vue-magic-ui/dist";
```

```ts
import { BorderBeam, Marquee, NumberTicker } from '@yousefkadah/vue-magic-ui'
```

## Components

**Components** — [Animated Circular Progress Bar](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-circular-progress-bar) · [Animated List](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-list) · [Avatar Circles](https://yousefkadah.github.io/vue-animation-libarary/docs/components/avatar-circles) · [Bento Grid](https://yousefkadah.github.io/vue-animation-libarary/docs/components/bento-grid) · [Code Comparison](https://yousefkadah.github.io/vue-animation-libarary/docs/components/code-comparison) · [Dock](https://yousefkadah.github.io/vue-animation-libarary/docs/components/dock) · [Dotted Map](https://yousefkadah.github.io/vue-animation-libarary/docs/components/dotted-map) · [File Tree](https://yousefkadah.github.io/vue-animation-libarary/docs/components/file-tree) · [Globe](https://yousefkadah.github.io/vue-animation-libarary/docs/components/globe) · [Hero Video Dialog](https://yousefkadah.github.io/vue-animation-libarary/docs/components/hero-video-dialog) · [Icon Cloud](https://yousefkadah.github.io/vue-animation-libarary/docs/components/icon-cloud) · [Lens](https://yousefkadah.github.io/vue-animation-libarary/docs/components/lens) · [Marquee](https://yousefkadah.github.io/vue-animation-libarary/docs/components/marquee) · [Orbiting Circles](https://yousefkadah.github.io/vue-animation-libarary/docs/components/orbiting-circles) · [Pointer](https://yousefkadah.github.io/vue-animation-libarary/docs/components/pointer) · [Progressive Blur](https://yousefkadah.github.io/vue-animation-libarary/docs/components/progressive-blur) · [Scroll Progress](https://yousefkadah.github.io/vue-animation-libarary/docs/components/scroll-progress) · [Smooth Cursor](https://yousefkadah.github.io/vue-animation-libarary/docs/components/smooth-cursor) · [Terminal](https://yousefkadah.github.io/vue-animation-libarary/docs/components/terminal)

**Special Effects** — [Animated Beam](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-beam) · [Backlight](https://yousefkadah.github.io/vue-animation-libarary/docs/components/backlight) · [Border Beam](https://yousefkadah.github.io/vue-animation-libarary/docs/components/border-beam) · [Confetti](https://yousefkadah.github.io/vue-animation-libarary/docs/components/confetti) · [Cool Mode](https://yousefkadah.github.io/vue-animation-libarary/docs/components/cool-mode) · [Glare Hover](https://yousefkadah.github.io/vue-animation-libarary/docs/components/glare-hover) · [Magic Card](https://yousefkadah.github.io/vue-animation-libarary/docs/components/magic-card) · [Meteors](https://yousefkadah.github.io/vue-animation-libarary/docs/components/meteors) · [Neon Gradient Card](https://yousefkadah.github.io/vue-animation-libarary/docs/components/neon-gradient-card) · [Particles](https://yousefkadah.github.io/vue-animation-libarary/docs/components/particles) · [Pixel Image](https://yousefkadah.github.io/vue-animation-libarary/docs/components/pixel-image) · [Shine Border](https://yousefkadah.github.io/vue-animation-libarary/docs/components/shine-border) · [Theme Toggler](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-theme-toggler) · [Warp Background](https://yousefkadah.github.io/vue-animation-libarary/docs/components/warp-background)

**Animations** — [Blur Fade](https://yousefkadah.github.io/vue-animation-libarary/docs/components/blur-fade)

**Text Animations** — [Animated Gradient Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-gradient-text) · [Animated Shiny Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-shiny-text) · [Aurora Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/aurora-text) · [Comic Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/comic-text) · [Dia Text Reveal](https://yousefkadah.github.io/vue-animation-libarary/docs/components/dia-text-reveal) · [Highlighter](https://yousefkadah.github.io/vue-animation-libarary/docs/components/highlighter) · [Hyper Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/hyper-text) · [Kinetic Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/kinetic-text) · [Line Shadow Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/line-shadow-text) · [Morphing Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/morphing-text) · [Number Ticker](https://yousefkadah.github.io/vue-animation-libarary/docs/components/number-ticker) · [Scroll Based Velocity](https://yousefkadah.github.io/vue-animation-libarary/docs/components/scroll-based-velocity) · [Sparkles Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/sparkles-text) · [Spinning Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/spinning-text) · [Text 3D Flip](https://yousefkadah.github.io/vue-animation-libarary/docs/components/text-3d-flip) · [Text Animate](https://yousefkadah.github.io/vue-animation-libarary/docs/components/text-animate) · [Text Reveal](https://yousefkadah.github.io/vue-animation-libarary/docs/components/text-reveal) · [Typing Animation](https://yousefkadah.github.io/vue-animation-libarary/docs/components/typing-animation) · [Video Text](https://yousefkadah.github.io/vue-animation-libarary/docs/components/video-text) · [Word Rotate](https://yousefkadah.github.io/vue-animation-libarary/docs/components/word-rotate)

**Buttons** — [Interactive Hover Button](https://yousefkadah.github.io/vue-animation-libarary/docs/components/interactive-hover-button) · [Pulsating Button](https://yousefkadah.github.io/vue-animation-libarary/docs/components/pulsating-button) · [Rainbow Button](https://yousefkadah.github.io/vue-animation-libarary/docs/components/rainbow-button) · [Ripple Button](https://yousefkadah.github.io/vue-animation-libarary/docs/components/ripple-button) · [Shimmer Button](https://yousefkadah.github.io/vue-animation-libarary/docs/components/shimmer-button) · [Shiny Button](https://yousefkadah.github.io/vue-animation-libarary/docs/components/shiny-button)

**Backgrounds** — [Animated Grid Pattern](https://yousefkadah.github.io/vue-animation-libarary/docs/components/animated-grid-pattern) · [Dot Pattern](https://yousefkadah.github.io/vue-animation-libarary/docs/components/dot-pattern) · [Flickering Grid](https://yousefkadah.github.io/vue-animation-libarary/docs/components/flickering-grid) · [Grid Pattern](https://yousefkadah.github.io/vue-animation-libarary/docs/components/grid-pattern) · [Hexagon Pattern](https://yousefkadah.github.io/vue-animation-libarary/docs/components/hexagon-pattern) · [Interactive Grid Pattern](https://yousefkadah.github.io/vue-animation-libarary/docs/components/interactive-grid-pattern) · [Light Rays](https://yousefkadah.github.io/vue-animation-libarary/docs/components/light-rays) · [Noise Texture](https://yousefkadah.github.io/vue-animation-libarary/docs/components/noise-texture) · [Retro Grid](https://yousefkadah.github.io/vue-animation-libarary/docs/components/retro-grid) · [Ripple](https://yousefkadah.github.io/vue-animation-libarary/docs/components/ripple) · [Striped Pattern](https://yousefkadah.github.io/vue-animation-libarary/docs/components/striped-pattern)

**Device Mocks** — [Android](https://yousefkadah.github.io/vue-animation-libarary/docs/components/android) · [Safari](https://yousefkadah.github.io/vue-animation-libarary/docs/components/safari) · [iPhone](https://yousefkadah.github.io/vue-animation-libarary/docs/components/iphone)
## Development

```bash
npm install
npm run dev        # docs site at http://localhost:5173
npm test           # mounts every example and fails on any error or Vue warning
npm run build      # registry JSON + docs site + npm package
```

Adding a component? Read [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

Component designs and APIs follow [Magic UI](https://magicui.design) by the Magic UI team (MIT),
re-implemented for Vue. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

[MIT](LICENSE) © Yousef Kadah
