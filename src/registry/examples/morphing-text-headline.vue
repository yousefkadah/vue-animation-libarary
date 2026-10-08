<script setup lang="ts">
import { MorphingText } from '@/components/ui/morphing-text'
</script>

<template>
  <div class="flex w-full flex-col items-center gap-2 text-center">
    <p class="text-lg text-muted-foreground">Components that feel</p>
    <MorphingText
      :texts="['alive', 'fluid', 'playful', 'polished']"
      class="h-14 text-5xl text-violet-600 md:h-20 lg:text-7xl dark:text-violet-400"
    />
  </div>
</template>
