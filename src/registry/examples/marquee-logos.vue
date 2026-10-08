<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'

const logos = ['Vue', 'Nuxt', 'Vite', 'Pinia', 'Vitest', 'VueUse', 'Tailwind', 'Motion']
</script>

<template>
  <div class="relative w-full overflow-hidden py-6">
    <p class="mb-6 text-center text-sm font-medium text-muted-foreground">Trusted by teams building with</p>
    <Marquee pause-on-hover gap="3rem" duration="25s" class="[--gap:3rem]">
      <span
        v-for="logo in logos"
        :key="logo"
        class="text-2xl font-semibold tracking-tight text-foreground/60 transition-colors hover:text-foreground"
      >
        {{ logo }}
      </span>
    </Marquee>
    <div class="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-background" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-background" />
  </div>
</template>
