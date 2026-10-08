<script setup lang="ts">
import { Text3DFlip } from '@/components/ui/text-3d-flip'
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <Text3DFlip
      as="h2"
      text="Hover to flip"
      class="text-4xl font-bold tracking-tight sm:text-6xl"
      text-class="bg-background text-foreground"
      flip-text-class="bg-background text-violet-600 dark:text-violet-400"
      rotate-direction="right"
      stagger-from="last"
    />
    <p class="text-sm text-muted-foreground">Rotates right, staggered from the last letter.</p>
  </div>
</template>
