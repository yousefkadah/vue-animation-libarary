<script setup lang="ts">
import { Particles } from '@/components/ui/particles'
</script>

<template>
  <div class="relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-lg border bg-neutral-950">
    <p class="z-10 text-center text-4xl font-semibold tracking-tight text-white">Let it snow</p>
    <Particles class="absolute inset-0" :quantity="250" :size="0.3" :vy="0.6" :vx="0.15" :staticity="80" color="#ffffff" />
  </div>
</template>
