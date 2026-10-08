var e=`<script setup lang="ts">
import { ref } from 'vue'
import { Confetti, type ConfettiRef } from '@/components/ui/confetti'

const confettiRef = ref<ConfettiRef>()
<\/script>

<template>
  <div class="relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
    <span
      class="pointer-events-none z-10 bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10"
    >
      Confetti
    </span>
    <Confetti ref="confettiRef" class="absolute top-0 left-0 z-0 size-full" @mouseenter="confettiRef?.fire({})" />
  </div>
</template>
`;export{e as default};