<script setup lang="ts">
import { NoiseTexture } from '@/components/ui/noise-texture'
</script>

<template>
  <button
    type="button"
    class="group/button relative h-10 cursor-pointer overflow-hidden rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground transition-transform active:scale-[0.98]"
  >
    <span class="relative z-10">Subscribe</span>
    <NoiseTexture :noise-opacity="0.45" class="transition-opacity group-hover/button:opacity-100" />
  </button>
</template>
