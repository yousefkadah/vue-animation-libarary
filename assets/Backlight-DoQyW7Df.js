var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useId } from 'vue'
import { cn } from '@/lib/utils'

export interface BacklightProps {
  class?: HTMLAttributes['class']
  /** Blur radius (SVG \`stdDeviation\`) of the glow. */
  blur?: number
}

const props = withDefaults(defineProps<BacklightProps>(), {
  blur: 20,
})

const id = \`backlight-\${useId()}\`
<\/script>

<template>
  <div :class="cn(props.class)">
    <svg width="0" height="0" aria-hidden="true" class="pointer-events-none absolute">
      <filter :id="id" y="-50%" x="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="props.blur" result="blurred" />
        <feColorMatrix type="saturate" in="blurred" values="4" />
        <feComposite in="SourceGraphic" operator="over" />
      </filter>
    </svg>

    <div :style="{ filter: \`url(#\${id})\` }">
      <slot />
    </div>
  </div>
</template>
`;export{e as default};