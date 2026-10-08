var e=`<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { ScrollProgress } from '@/components/ui/scroll-progress'

const scroller = useTemplateRef<HTMLElement>('scroller')

const sections = [
  {
    title: 'Why motion matters',
    body: 'Animation guides attention. A well-timed transition tells people where something came from and where it went, so the interface feels continuous instead of jumping between states.',
  },
  {
    title: 'Keep it short',
    body: 'Most interface transitions should land between 150 and 400 milliseconds. Longer than that and people start waiting for the UI instead of using it.',
  },
  {
    title: 'Respect preferences',
    body: 'Some people get dizzy from large movements. Honour prefers-reduced-motion by swapping slides and zooms for simple fades, or turning looping effects off.',
  },
  {
    title: 'Animate the cheap properties',
    body: 'Transforms and opacity can be composited on the GPU. Animating width, height or top forces layout on every frame and quickly drops below 60fps.',
  },
  {
    title: 'Ship it',
    body: 'Copy the component, tweak the classes, and you are done. The progress bar above tracks how far you have read through this card.',
  },
]
<\/script>

<template>
  <div ref="scroller" class="relative h-[300px] w-full max-w-md overflow-y-auto rounded-xl border bg-card text-card-foreground">
    <ScrollProgress :container="scroller" class="sticky h-1" />
    <article class="space-y-6 p-6">
      <h3 class="text-lg font-semibold">Motion design, in five minutes</h3>
      <section v-for="section in sections" :key="section.title" class="space-y-2">
        <h4 class="font-medium">{{ section.title }}</h4>
        <p class="text-sm leading-relaxed text-muted-foreground">{{ section.body }}</p>
      </section>
    </article>
  </div>
</template>
`;export{e as default};