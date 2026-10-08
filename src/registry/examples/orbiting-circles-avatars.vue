<script setup lang="ts">
import { OrbitingCircles } from '@/components/ui/orbiting-circles'

const outer = ['jack', 'jill', 'john', 'jane', 'jenny', 'james']
const inner = ['jade', 'jules', 'joe']
</script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
    <div class="z-10 flex size-16 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg">
      Team
    </div>
    <OrbitingCircles :icon-size="44" :radius="150" :duration="30">
      <img
        v-for="name in outer"
        :key="name"
        :src="`https://avatar.vercel.sh/${name}`"
        :alt="name"
        class="size-full rounded-full border-2 border-background shadow-md"
      />
    </OrbitingCircles>
    <OrbitingCircles :icon-size="36" :radius="85" :duration="20" reverse>
      <img
        v-for="name in inner"
        :key="name"
        :src="`https://avatar.vercel.sh/${name}`"
        :alt="name"
        class="size-full rounded-full border-2 border-background shadow-md"
      />
    </OrbitingCircles>
  </div>
</template>
