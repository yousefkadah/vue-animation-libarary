var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useId } from 'vue'
import { cn } from '@/lib/utils'

export interface NoiseTextureProps {
  class?: HTMLAttributes['class']
  /** \`baseFrequency\` of the turbulence; higher values give finer grain. */
  frequency?: number
  /** \`numOctaves\` of the turbulence; more octaves add detail at smaller scales. */
  octaves?: number
  /** Linear slope applied to each channel after desaturating; controls the contrast of the grain. */
  slope?: number
  /** Opacity of the noise layer. */
  noiseOpacity?: number
}

const props = withDefaults(defineProps<NoiseTextureProps>(), {
  frequency: 0.4,
  octaves: 6,
  slope: 0.15,
  noiseOpacity: 0.6,
})

const filterId = useId()
<\/script>

<template>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn('pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none dark:opacity-[0.75]', props.class)"
  >
    <filter :id="filterId">
      <feTurbulence type="fractalNoise" :baseFrequency="props.frequency" :numOctaves="props.octaves" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="linear" :slope="props.slope" />
        <feFuncG type="linear" :slope="props.slope" />
        <feFuncB type="linear" :slope="props.slope" />
      </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" :filter="\`url(#\${filterId})\`" :opacity="props.noiseOpacity" />
  </svg>
</template>
`;export{e as default};