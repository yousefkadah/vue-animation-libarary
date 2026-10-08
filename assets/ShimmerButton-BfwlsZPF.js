var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export interface ShimmerButtonProps {
  class?: HTMLAttributes['class']
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
}

const props = withDefaults(defineProps<ShimmerButtonProps>(), {
  shimmerColor: '#ffffff',
  shimmerSize: '0.05em',
  borderRadius: '100px',
  shimmerDuration: '3s',
  background: 'rgba(0, 0, 0, 1)',
})
<\/script>

<template>
  <button
    :style="{
      '--spread': '90deg',
      '--shimmer-color': props.shimmerColor,
      '--radius': props.borderRadius,
      '--speed': props.shimmerDuration,
      '--cut': props.shimmerSize,
      '--bg': props.background,
    }"
    :class="
      cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
        props.class,
      )
    "
  >
    <!-- spark container -->
    <div class="-z-30 blur-[2px] [container-type:size] absolute inset-0 overflow-visible">
      <!-- spark -->
      <div class="animate-shimmer-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
        <!-- spark before -->
        <div
          class="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
        />
      </div>
    </div>

    <slot />

    <!-- highlight -->
    <div
      class="absolute inset-0 size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
    />

    <!-- backdrop -->
    <div class="absolute -z-20 [inset:var(--cut)] [border-radius:var(--radius)] [background:var(--bg)]" />
  </button>
</template>
`;export{e as default};