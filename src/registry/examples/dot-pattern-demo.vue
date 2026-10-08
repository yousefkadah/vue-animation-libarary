<script setup lang="ts">
import { DotPattern } from '@/components/ui/dot-pattern'
</script>

<template>
  <div class="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
    <DotPattern class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
  </div>
</template>
