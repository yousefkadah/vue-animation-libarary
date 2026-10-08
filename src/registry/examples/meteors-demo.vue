<script setup lang="ts">
import { Meteors } from '@/components/ui/meteors'
</script>

<template>
  <div class="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
    <Meteors :number="30" />
    <span
      class="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl leading-none font-semibold whitespace-pre-wrap text-transparent sm:text-8xl dark:from-white dark:to-slate-900/10"
    >
      Meteors
    </span>
  </div>
</template>
