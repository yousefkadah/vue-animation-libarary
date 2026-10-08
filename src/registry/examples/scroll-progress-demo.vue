<script setup lang="ts">
import { ScrollProgress } from '@/components/ui/scroll-progress'
</script>

<template>
  <div class="z-10 rounded-lg p-4">
    <ScrollProgress class="top-14" />
    <h2 class="pb-4 text-center font-bold">Note: The scroll progress is shown below the navbar of the page.</h2>
    <p class="text-center text-sm text-muted-foreground">Scroll this page to see it fill up.</p>
  </div>
</template>
