<script setup lang="ts">
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
</script>

<template>
  <div class="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
    <InteractiveGridPattern
      :width="20"
      :height="20"
      :squares="[80, 80]"
      squares-class-name="hover:fill-blue-500"
      class="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
    />
  </div>
</template>
