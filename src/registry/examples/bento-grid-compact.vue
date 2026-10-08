<script setup lang="ts">
import { Gauge, Lock, Palette, Zap } from '@lucide/vue'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
</script>

<template>
  <BentoGrid class="max-w-2xl auto-rows-[14rem] grid-cols-2">
    <BentoCard
      :icon="Zap"
      name="Fast by default"
      description="Pure CSS where it can be, Motion where it must."
      href="#"
      cta="Benchmarks"
      class="col-span-2 sm:col-span-1"
    >
      <template #background>
        <div class="absolute inset-0 bg-linear-to-br from-yellow-300/30 via-transparent to-transparent" aria-hidden="true" />
      </template>
    </BentoCard>
    <BentoCard
      :icon="Palette"
      name="Themeable"
      description="Every colour comes from your shadcn tokens."
      href="#"
      cta="Theming"
      class="col-span-2 sm:col-span-1"
    >
      <template #background>
        <div class="absolute inset-0 bg-linear-to-bl from-pink-300/30 via-transparent to-transparent" aria-hidden="true" />
      </template>
    </BentoCard>
    <BentoCard
      :icon="Lock"
      name="Accessible"
      description="Reduced motion and screen readers are first-class."
      href="#"
      cta="Accessibility"
      class="col-span-2 sm:col-span-1"
    >
      <template #background>
        <div class="absolute inset-0 bg-linear-to-tr from-emerald-300/30 via-transparent to-transparent" aria-hidden="true" />
      </template>
    </BentoCard>
    <BentoCard
      :icon="Gauge"
      name="Tiny"
      description="Copy only what you use — no runtime to install."
      href="#"
      cta="Install"
      class="col-span-2 sm:col-span-1"
    >
      <template #background>
        <div class="absolute inset-0 bg-linear-to-tl from-sky-300/30 via-transparent to-transparent" aria-hidden="true" />
      </template>
    </BentoCard>
  </BentoGrid>
</template>
