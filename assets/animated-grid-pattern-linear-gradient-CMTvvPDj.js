var e=`<script setup lang="ts">
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
<\/script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
    <AnimatedGridPattern
      :width="30"
      :height="30"
      :num-squares="60"
      :max-opacity="0.15"
      :duration="2"
      :repeat-delay="0.5"
      class="text-sky-500 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] dark:text-sky-400"
    />
  </div>
</template>
`;export{e as default};