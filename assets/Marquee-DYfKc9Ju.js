var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export interface MarqueeProps {
  class?: HTMLAttributes['class']
  /** Scroll right-to-left (or bottom-to-top when vertical) instead. */
  reverse?: boolean
  /** Pause the animation while the pointer is over the marquee. */
  pauseOnHover?: boolean
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean
  /** How many copies of the content to render so the loop never shows a gap. */
  repeat?: number
  /** Duration of one loop, e.g. \`20s\`. Defaults to \`40s\`. */
  duration?: string
  /** Gap between items, e.g. \`2rem\`. Defaults to \`1rem\`. */
  gap?: string
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  reverse: false,
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
})
<\/script>

<template>
  <div
    :class="
      cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        props.vertical ? 'flex-col' : 'flex-row',
        props.class,
      )
    "
    :style="{ '--duration': props.duration, '--gap': props.gap }"
  >
    <div
      v-for="index in props.repeat"
      :key="index"
      :aria-hidden="index > 1 ? 'true' : undefined"
      :class="
        cn(
          'flex shrink-0 justify-around [gap:var(--gap)] motion-reduce:[animation-play-state:paused]',
          props.vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
          props.pauseOnHover && 'group-hover:[animation-play-state:paused]',
          props.reverse && '[animation-direction:reverse]',
        )
      "
    >
      <slot />
    </div>
  </div>
</template>
`;export{e as default};