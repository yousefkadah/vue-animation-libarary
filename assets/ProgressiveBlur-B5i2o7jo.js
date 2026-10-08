var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface ProgressiveBlurProps {
  class?: HTMLAttributes['class']
  /** Height of the blurred band, e.g. \`30%\` or \`120px\`. Ignored when \`position\` is \`both\`. */
  height?: string
  /** Edge the blur sits on. \`both\` covers the whole container. */
  position?: 'top' | 'bottom' | 'both'
  /** Blur radius of each stacked layer, in pixels, from the faintest to the strongest. */
  blurLevels?: number[]
}

const props = withDefaults(defineProps<ProgressiveBlurProps>(), {
  height: '30%',
  position: 'bottom',
  blurLevels: () => [0.5, 1, 2, 4, 8, 16, 32, 64],
})

const FULL_MASK = 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)'

/**
 * Each layer blurs more than the last and is masked to a band 12.5% further along, so the blur
 * ramps up smoothly toward the edge instead of starting with a hard line.
 */
const layers = computed(() => {
  const levels = props.blurLevels
  const direction = props.position === 'top' ? 'to top' : 'to bottom'
  const band = (from: number, to: number, end: number) =>
    props.position === 'both'
      ? FULL_MASK
      : \`linear-gradient(\${direction}, rgba(0,0,0,0) \${from}%, rgba(0,0,0,1) \${to}%, rgba(0,0,0,1) \${end}%, rgba(0,0,0,0) \${end + 12.5}%)\`

  return levels.map((blur, index) => {
    let mask: string
    if (index === 0) mask = band(0, 12.5, 25)
    else if (index === levels.length - 1)
      mask = props.position === 'both' ? FULL_MASK : \`linear-gradient(\${direction}, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)\`
    else mask = band(index * 12.5, (index + 1) * 12.5, (index + 2) * 12.5)

    return {
      zIndex: index + 1,
      backdropFilter: \`blur(\${blur}px)\`,
      WebkitBackdropFilter: \`blur(\${blur}px)\`,
      maskImage: mask,
      WebkitMaskImage: mask,
    }
  })
})
<\/script>

<template>
  <div
    :class="
      cn(
        'pointer-events-none absolute inset-x-0 z-10',
        props.class,
        props.position === 'top' ? 'top-0' : props.position === 'bottom' ? 'bottom-0' : 'inset-y-0',
      )
    "
    :style="{ height: props.position === 'both' ? '100%' : props.height }"
  >
    <div v-for="(layer, index) in layers" :key="index" aria-hidden="true" class="absolute inset-0" :style="layer" />
    <slot />
  </div>
</template>
`;export{e as default};