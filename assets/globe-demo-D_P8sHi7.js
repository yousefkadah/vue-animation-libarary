var e=`<script setup lang="ts">
import { Globe } from '@/components/ui/globe'
<\/script>

<template>
  <div class="relative flex h-[380px] w-full max-w-lg items-start justify-center overflow-hidden rounded-lg border bg-background pt-8">
    <span
      class="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10"
    >
      Globe
    </span>
    <Globe class="top-28" />
    <div class="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
  </div>
</template>
`;export{e as default};