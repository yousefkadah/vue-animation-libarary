<script setup lang="ts">
import { FlickeringGrid } from '@/components/ui/flickering-grid'
</script>

<template>
  <div class="relative flex h-[400px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border bg-background px-6 text-center">
    <FlickeringGrid
      class="absolute inset-0 z-0 size-full [mask-image:linear-gradient(to_bottom,white,transparent_85%)]"
      :square-size="6"
      :grid-gap="4"
      color="rgb(139, 92, 246)"
      :max-opacity="0.35"
      :flicker-chance="0.2"
    />
    <h2 class="relative z-10 text-4xl font-bold tracking-tighter sm:text-5xl">Always on.</h2>
    <p class="relative z-10 max-w-sm text-sm text-muted-foreground sm:text-base">
      A canvas grid that only animates while it's on screen, so it never costs a frame it doesn't show.
    </p>
  </div>
</template>
