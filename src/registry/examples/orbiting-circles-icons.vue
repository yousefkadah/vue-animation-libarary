<script setup lang="ts">
import { Cloud, Database, FileText, Search, Settings, Sparkles, Terminal } from '@lucide/vue'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'
</script>

<template>
  <div class="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
    <span
      class="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10"
    >
      Circles
    </span>
    <OrbitingCircles :icon-size="36" :radius="150" class="border bg-background text-foreground shadow-sm">
      <FileText class="size-4" />
      <Settings class="size-4" />
      <Cloud class="size-4" />
      <Database class="size-4" />
    </OrbitingCircles>
    <OrbitingCircles :icon-size="32" :radius="90" reverse :duration="15" class="border bg-background text-muted-foreground">
      <Search class="size-4" />
      <Terminal class="size-4" />
      <Sparkles class="size-4" />
    </OrbitingCircles>
  </div>
</template>
