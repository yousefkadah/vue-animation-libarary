<script setup lang="ts">
import { AnimatedThemeToggler, type ThemeTransitionVariant } from '@/components/ui/animated-theme-toggler'

const variants: ThemeTransitionVariant[] = ['circle', 'square', 'diamond', 'rectangle', 'hexagon', 'triangle', 'star']
</script>

<template>
  <div class="grid grid-cols-4 gap-3 sm:grid-cols-7">
    <div v-for="variant in variants" :key="variant" class="flex flex-col items-center gap-2">
      <AnimatedThemeToggler
        :variant="variant"
        class="inline-flex size-12 items-center justify-center rounded-full border bg-background shadow-xs transition-colors hover:bg-accent [&_svg]:size-5"
      />
      <span class="text-xs text-muted-foreground capitalize">{{ variant }}</span>
    </div>
  </div>
</template>
