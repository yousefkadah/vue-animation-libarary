# Vue Magic UI 🎨✨

[![npm version](https://badge.fury.io/js/@yousefkadah%2Fvue-magic-ui.svg)](https://badge.fury.io/js/@yousefkadah%2Fvue-magic-ui)
[![npm downloads](https://img.shields.io/npm/dt/@yousefkadah/vue-magic-ui.svg)](https://www.npmjs.com/package/@yousefkadah/vue-magic-ui)
[![npm downloads per month](https://img.shields.io/npm/dm/@yousefkadah/vue-magic-ui.svg)](https://www.npmjs.com/package/@yousefkadah/vue-magic-ui)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://yousefkadah.github.io/vue-animation-libarary/)
[![GitHub license](https://img.shields.io/github/license/yousefkadah/vue-animation-libarary.svg)](https://github.com/yousefkadah/vue-animation-libarary/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yousefkadah/vue-animation-libarary.svg?style=social&label=Star)](https://github.com/yousefkadah/vue-animation-libarary)

A professional Vue 3 animated component library inspired by MagicUI and modern design systems. Create stunning, production-ready user interfaces with beautiful animated components.

## 🌟 Live Demo

**[✨ View Live Demo ✨](https://yousefkadah.github.io/vue-animation-libarary/)**

See all components in action with interactive examples and code snippets!

## ✨ Features

- **25+ Professional Components** - Complete collection of modern UI animations
- **TypeScript Support** - Full type safety and IntelliSense  
- **Vue 3 Composition API** - Modern Vue.js patterns
- **Highly Customizable** - Easy theming and configuration
- **Performance Optimized** - Smooth 60fps animations
- **Production Ready** - Battle-tested components
- **Zero Dependencies** - Lightweight and self-contained

## 🚀 Quick Start

> **🌟 [Try the Live Demo](https://yousefkadah.github.io/vue-animation-libarary/) - See all components in action!**

[![NPM](https://nodei.co/npm/@yousefkadah/vue-magic-ui.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@yousefkadah/vue-magic-ui/)

```bash
# Install the library
npm install @yousefkadah/vue-magic-ui

# OR explore the live demo first: https://yousefkadah.github.io/vue-animation-libarary/

# Clone and run locally (optional)
git clone https://github.com/yousefkadah/vue-animation-libarary.git
cd vue-animation-libarary
npm install
npm run dev
```

## 🎯 Demo & Documentation

**🌐 Live Demo**: [https://yousefkadah.github.io/vue-animation-libarary/](https://yousefkadah.github.io/vue-animation-libarary/)

The live demo includes a comprehensive showcase with two main pages:

### 🏠 Home Page ([Demo Home](https://yousefkadah.github.io/vue-animation-libarary/#/))
- Beautiful landing page showcasing the library
- Hero section with interactive animations
- Feature highlights and statistics
- Call-to-action sections

### 📚 Components Page ([Demo Components](https://yousefkadah.github.io/vue-animation-libarary/#/components))
- Complete component documentation
- Live demos for each component
- Code examples and usage instructions
- Props documentation and customization options
- Component categories: Animations, Effects, UI Elements, Backgrounds

## 📦 Component Categories

### 🎭 Professional Effects
- **Meteors** - Animated meteor shower effect
- **Aurora** - Northern lights background animation  
- **RetroGrid** - 80s-style animated grid background
- **GridPattern** - Subtle grid overlay pattern
- **RippleEffect** - Expanding ripple animations
- **BorderBeam** - Animated border beam effect

### 🔄 Interactive Components  
- **OrbitingCircles** - Elements orbiting around a center
- **AnimatedBeam** - Animated connection lines
- **FloatingCard** - 3D floating cards with mouse tracking
- **MagicButton** - Professional button with multiple variants
- **ShimmerButton** - Shimmer effect on hover

### 📝 Text Animations
- **SparkleText** - Text with sparkle effects
- **TypewriterText** - Typewriter effect with multiple texts
- **GradientText** - Animated gradient text effects
- **TextReveal** - Character-by-character reveal animation
- **NumberTicker** - Smooth number counting animation
- **Marquee** - Scrolling text marquee

### 🎯 Entrance Animations
- **FadeIn** - Smooth fade-in with intersection observer
- **SlideIn** - Slide from any direction

### ⚡ Loaders & Effects
- **PulseLoader** - Pulsing dots animation
- **WaveLoader** - Wave bars animation  
- **ParticleEffect** - Interactive particle system
- **MorphingShape** - SVG shape morphing
- **GlowCard** - Cards with glow effects

## 🎯 Usage Examples

### Professional Landing Page Hero

```vue
<template>
  <div class="hero">
    <Aurora :size="1200" :colors="['#42b883', '#369870', '#2a9d8f']">
      <div class="hero-content">
        <h1>
          <SparkleText :auto-sparkle="true">
            Welcome to the Future
          </SparkleText>
        </h1>
        
        <TypewriterText 
          :text="['Innovation starts here', 'Build amazing experiences']"
          :loop="true"
          :speed="60"
        />
        
        <BorderBeam :size="300" :duration="8">
          <MagicButton variant="gradient">
            Get Started
          </MagicButton>
        </BorderBeam>
      </div>
    </Aurora>
  </div>
</template>
```

### Interactive Dashboard

```vue
<template>
  <div class="dashboard">
    <!-- Animated metrics -->
    <div class="metrics">
      <div class="metric-card">
        <NumberTicker :value="1234567" :duration="2000" />
        <p>Total Users</p>
      </div>
      
      <div class="metric-card">
        <NumberTicker :value="99.9" :decimal-places="1" suffix="%" />
        <p>Uptime</p>
      </div>
    </div>
    
    <!-- Orbiting indicators -->
    <OrbitingCircles 
      :items="['Vue', 'React', 'Angular', 'Svelte']"
      :radius="100"
      :duration="20"
    >
      <template #center>
        <div class="orbit-center">Frameworks</div>
      </template>
    </OrbitingCircles>
    
    <!-- Animated connections -->
    <AnimatedBeam 
      :width="300"
      :height="100"
      path-color="#00D4FF"
      :curvature="0.5"
    />
  </div>
</template>
```

### Modern Background Effects

```vue
<template>
  <div class="page">
    <!-- Retro grid background -->
    <RetroGrid 
      :size="60"
      color="#00D4FF"
      :opacity="0.3"
      :rotate-x="45"
    >
      <div class="content">
        <h1>Retro Style Content</h1>
      </div>
    </RetroGrid>
    
    <!-- Meteor shower effect -->
    <Meteors 
      :number="30"
      :colors="['#42b883', '#369870', '#2a9d8f']"
    >
      <div class="meteor-content">
        <h2>Amazing Content</h2>
      </div>
    </Meteors>
    
    <!-- Ripple interaction -->
    <RippleEffect 
      :num-ripples="3"
      :duration="2"
      ripple-color="rgba(102, 126, 234, 0.4)"
    >
      <button>Click for Ripples</button>
    </RippleEffect>
  </div>
</template>
```

### Scrolling Marquee

```vue
<template>
  <Marquee :speed="20" :pause-on-hover="true">
    <div class="marquee-item">🎉 Breaking News</div>
    <div class="marquee-item">✨ New Features</div>
    <div class="marquee-item">🚀 Performance Updates</div>
  </Marquee>
</template>
```

## 🎨 Advanced Customization

### Theme Integration

```vue
<template>
  <div class="themed-app">
    <!-- Custom color schemes -->
    <Aurora 
      :colors="themeColors.aurora"
      :duration="8"
    />
    
    <BorderBeam 
      :color-from="themeColors.primary"
      :color-to="themeColors.secondary"
    />
    
    <GradientText 
      :colors="themeColors.gradient"
      :animated="true"
    >
      Themed Text
    </GradientText>
  </div>
</template>

<script setup>
const themeColors = {
  primary: '#42b883',
  secondary: '#369870', 
  aurora: ['#42b883', '#369870', '#2a9d8f'],
  gradient: ['#42b883', '#369870', '#2a9d8f']
}
</script>
```

### Performance Optimization

```vue
<template>
  <div>
    <!-- Reduce particles for mobile -->
    <ParticleEffect 
      :particle-count="isMobile ? 20 : 50"
      :interactive="!isMobile"
    />
    
    <!-- Conditional animations -->
    <Meteors 
      v-if="!prefersReducedMotion"
      :number="30"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMobile = ref(false)
const prefersReducedMotion = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 768
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>
```

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/yousefkadah/vue-animation-libarary.git

# Install dependencies  
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Build documentation
npm run docs:build
```

## 📋 Component API Reference

### Aurora
```typescript
interface AuroraProps {
  size?: number        // Size of aurora effect (default: 800)
  colors?: string[]    // Array of colors (default: ['#42b883', '#369870', '#2a9d8f'])
  duration?: number    // Animation duration in seconds (default: 8)
  opacity?: number     // Opacity of effect (default: 0.3)
  invert?: boolean     // Invert colors (default: false)
}
```

### Meteors  
```typescript
interface MeteorsProps {
  number?: number      // Number of meteors (default: 30)
  width?: number       // Container width (default: 800)
  height?: number      // Container height (default: 400)
  colors?: string[]    // Meteor colors (default: ['#42b883', '#369870', '#2a9d8f'])
  speed?: number       // Animation speed multiplier (default: 1)
}
```

### BorderBeam
```typescript
interface BorderBeamProps {
  size?: number        // Beam size (default: 200)
  duration?: number    // Animation duration (default: 15)
  borderWidth?: number // Border width (default: 1.5)
  colorFrom?: string   // Start color (default: '#ffaa40')
  colorTo?: string     // End color (default: '#9c40ff')
  delay?: number       // Animation delay (default: 0)
}
```

### NumberTicker
```typescript
interface NumberTickerProps {
  value: number           // Target number to animate to
  duration?: number       // Animation duration in ms (default: 2000)
  decimalPlaces?: number  // Number of decimal places (default: 0)
}
```

### OrbitingCircles
```typescript
interface OrbitingCirclesProps {
  items: any[]         // Array of items to orbit
  radius?: number      // Orbit radius (default: 100)
  duration?: number    // Orbit duration in seconds (default: 20)
  reverse?: boolean    // Reverse direction (default: false)
}
```

## 🌟 Inspiration

This library draws inspiration from:
- [Magic UI](https://magicui.design/) - React component designs
- [Aceternity UI](https://ui.aceternity.com/) - Modern animations  
- [Framer Motion](https://www.framer.com/motion/) - Animation patterns

## 🎯 Roadmap

- [ ] 3D transform components
- [ ] Scroll-triggered animations  
- [ ] Chart animation components
- [ ] Mobile gesture interactions
- [ ] WebGL-powered effects
- [ ] Accessibility improvements
- [ ] React/Svelte ports

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ for the Vue.js community
