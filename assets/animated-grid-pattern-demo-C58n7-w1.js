var e=`<script setup lang="ts">
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
<\/script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
    <p class="z-10 text-center text-4xl font-medium tracking-tighter whitespace-pre-wrap sm:text-5xl">Animated Grid Pattern</p>
    <AnimatedGridPattern
      :num-squares="30"
      :max-opacity="0.1"
      :duration="3"
      :repeat-delay="1"
      class="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
    />
  </div>
</template>
`;export{e as default};