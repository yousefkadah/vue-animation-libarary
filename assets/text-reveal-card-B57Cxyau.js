var e=`<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { TextReveal } from '@/components/ui/text-reveal'

const scroller = useTemplateRef<HTMLElement>('scroller')
<\/script>

<template>
  <div class="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-card shadow-sm">
    <div ref="scroller" class="h-[320px] overflow-y-auto">
      <TextReveal :container="scroller" class="h-[640px]">
        Every word fades in as you scroll, so the story unfolds at the reader's pace.
      </TextReveal>
    </div>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-card" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-card" />
  </div>
</template>
`;export{e as default};