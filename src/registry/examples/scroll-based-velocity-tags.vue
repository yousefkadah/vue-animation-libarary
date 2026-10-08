<script setup lang="ts">
import { ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'

const tags = ['Vue 3', 'Nuxt', 'Tailwind CSS', 'Motion', 'TypeScript', 'Vite', 'shadcn-vue']
</script>

<template>
  <div class="relative flex w-full flex-col gap-3 overflow-hidden py-4">
    <!-- A standalone row tracks the page's scroll velocity on its own. -->
    <ScrollVelocityRow :base-velocity="4">
      <span
        v-for="tag in tags"
        :key="tag"
        class="mx-1.5 rounded-full border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
      >
        {{ tag }}
      </span>
    </ScrollVelocityRow>
    <!-- Constant speed: ignores scrolling entirely. -->
    <ScrollVelocityRow :base-velocity="4" :direction="-1" :scroll-reactivity="false">
      <span
        v-for="tag in [...tags].reverse()"
        :key="tag"
        class="mx-1.5 rounded-full border border-dashed px-4 py-1.5 text-sm font-medium text-muted-foreground"
      >
        {{ tag }}
      </span>
    </ScrollVelocityRow>
    <div class="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-background" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-background" />
  </div>
</template>
