<script setup lang="ts">
import { BorderBeam } from '@/components/ui/border-beam'
</script>

<template>
  <div class="relative w-[350px] overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
    <div class="flex items-center gap-4">
      <div class="size-16 rounded-lg bg-linear-to-br from-orange-400 to-fuchsia-600" />
      <div>
        <h3 class="font-semibold">Midnight Drive</h3>
        <p class="text-sm text-muted-foreground">Synthwave Collective</p>
      </div>
    </div>
    <div class="mt-6 h-1.5 w-full rounded-full bg-muted">
      <div class="h-full w-1/3 rounded-full bg-primary" />
    </div>
    <div class="mt-2 flex justify-between text-xs text-muted-foreground">
      <span>1:21</span>
      <span>3:45</span>
    </div>
    <BorderBeam :duration="6" :size="400" class="from-transparent via-red-500 to-transparent" />
    <BorderBeam :duration="6" :delay="3" :size="400" :border-width="2" class="from-transparent via-blue-500 to-transparent" />
  </div>
</template>
