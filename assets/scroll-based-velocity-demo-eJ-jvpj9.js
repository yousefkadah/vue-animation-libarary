var e=`<script setup lang="ts">
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity'
<\/script>

<template>
  <div class="relative flex w-full flex-col items-center justify-center overflow-hidden">
    <ScrollVelocityContainer class="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-20">
      <ScrollVelocityRow :base-velocity="20" :direction="1">Velocity Scroll&nbsp;</ScrollVelocityRow>
      <ScrollVelocityRow :base-velocity="20" :direction="-1">Velocity Scroll&nbsp;</ScrollVelocityRow>
    </ScrollVelocityContainer>
    <div class="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background" />
  </div>
</template>
`;export{e as default};