<script setup lang="ts">
import { ref } from 'vue'
import { SmoothCursor } from '@/components/ui/smooth-cursor'

const enabled = ref(false)
</script>

<template>
  <div class="flex flex-col items-center gap-4 text-center">
    <p class="max-w-xs text-sm text-muted-foreground">
      Pass any markup in the <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">#cursor</code> slot. The most
      recently mounted SmoothCursor wins, so this one takes over while it's on.
    </p>
    <button
      type="button"
      class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      :aria-pressed="enabled"
      @click="enabled = !enabled"
    >
      {{ enabled ? 'Use the default cursor' : 'Try a custom cursor' }}
    </button>
    <SmoothCursor v-if="enabled" :spring-config="{ damping: 30, stiffness: 300, mass: 0.6, restDelta: 0.001 }">
      <template #cursor>
        <div class="flex size-8 items-center justify-center rounded-full border-2 border-violet-500 bg-violet-500/15 backdrop-blur-sm">
          <div class="size-2 -translate-y-1 rounded-full bg-violet-500" />
        </div>
      </template>
    </SmoothCursor>
  </div>
</template>
