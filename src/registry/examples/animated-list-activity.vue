<script setup lang="ts">
import { AnimatedList } from '@/components/ui/animated-list'

const events = [
  { user: 'sarah', action: 'merged', target: 'feat: dark mode toggle', time: 'just now' },
  { user: 'evan', action: 'opened', target: 'fix: hydration warning in Dock', time: '1m ago' },
  { user: 'anthony', action: 'reviewed', target: 'refactor: motion presets', time: '3m ago' },
  { user: 'daniel', action: 'released', target: 'v2.1.0', time: '8m ago' },
  { user: 'maya', action: 'commented on', target: 'docs: install guide', time: '12m ago' },
  { user: 'leo', action: 'merged', target: 'perf: lazy examples', time: '20m ago' },
]
</script>

<template>
  <div class="relative h-[320px] w-full max-w-sm overflow-hidden">
    <AnimatedList :delay="1500" class="gap-2">
      <div
        v-for="event in events"
        :key="event.target"
        class="flex w-full items-center gap-3 rounded-xl border bg-card px-3 py-2.5 text-card-foreground shadow-xs"
      >
        <img :src="`https://avatar.vercel.sh/${event.user}`" alt="" class="size-8 shrink-0 rounded-full" />
        <p class="min-w-0 flex-1 truncate text-sm">
          <span class="font-medium">@{{ event.user }}</span>
          <span class="text-muted-foreground"> {{ event.action }} </span>
          <span class="font-medium">{{ event.target }}</span>
        </p>
        <span class="shrink-0 text-xs text-muted-foreground">{{ event.time }}</span>
      </div>
    </AnimatedList>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background" />
  </div>
</template>
