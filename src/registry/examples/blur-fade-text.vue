<script setup lang="ts">
import { BlurFade } from '@/components/ui/blur-fade'
</script>

<template>
  <section>
    <BlurFade :delay="0.25" in-view>
      <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Hello World 👋</h2>
    </BlurFade>
    <BlurFade :delay="0.5" in-view>
      <span class="text-xl tracking-tighter text-pretty sm:text-3xl xl:text-4xl/none">Nice to meet you</span>
    </BlurFade>
  </section>
</template>
