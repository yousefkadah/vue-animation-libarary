<script setup lang="ts">
import { CoolMode } from '@/components/ui/cool-mode'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <CoolMode :options="{ particle: '🎉', size: 12 }">
      <button type="button" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">Party 🎉</button>
    </CoolMode>
    <CoolMode :options="{ particle: '❤️', size: 10, particleCount: 25, speedUp: 18 }">
      <button
        type="button"
        class="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Like ❤️
      </button>
    </CoolMode>
  </div>
</template>
