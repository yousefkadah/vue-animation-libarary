var e=`<script setup lang="ts">
import { TextAnimate, type TextAnimateProps } from '@/components/ui/text-animate'

const variants: TextAnimateProps['variants'] = {
  hidden: { opacity: 0, y: 30, rotate: 45, scale: 0.5 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      y: { type: 'spring', damping: 12, stiffness: 200, mass: 0.8 },
      rotate: { type: 'spring', damping: 8, stiffness: 150 },
      scale: { type: 'spring', damping: 10, stiffness: 300 },
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 30,
    rotate: 45,
    scale: 0.5,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
}
<\/script>

<template>
  <TextAnimate text="Wavy Motion!" :variants="variants" by="character" class="text-5xl font-bold tracking-tight" />
</template>
`;export{e as default};