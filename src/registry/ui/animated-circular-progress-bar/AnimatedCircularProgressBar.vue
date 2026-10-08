<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface AnimatedCircularProgressBarProps {
  class?: HTMLAttributes['class']
  /** Value at which the gauge is full. */
  max?: number
  /** Value at which the gauge is empty. */
  min?: number
  /** Current value. */
  value?: number
  /** Colour of the filled arc. */
  gaugePrimaryColor: string
  /** Colour of the remaining track. */
  gaugeSecondaryColor: string
}

const props = withDefaults(defineProps<AnimatedCircularProgressBarProps>(), {
  max: 100,
  min: 0,
  value: 0,
})

const circumference = 2 * Math.PI * 45
const percentPx = circumference / 100
const currentPercent = computed(() => Math.round(((props.value - props.min) / (props.max - props.min)) * 100))
</script>

<template>
  <div
    role="progressbar"
    :aria-valuemin="props.min"
    :aria-valuemax="props.max"
    :aria-valuenow="props.value"
    :class="cn('relative size-40 text-2xl font-semibold', props.class)"
    :style="{
      '--circle-size': '100px',
      '--circumference': circumference,
      '--percent-to-px': `${percentPx}px`,
      '--gap-percent': '5',
      '--offset-factor': '0',
      '--transition-length': '1s',
      '--transition-step': '200ms',
      '--delay': '0s',
      '--percent-to-deg': '3.6deg',
      transform: 'translateZ(0)',
    }"
  >
    <svg fill="none" class="size-full" stroke-width="2" viewBox="0 0 100 100" aria-hidden="true">
      <circle
        v-if="currentPercent <= 90 && currentPercent >= 0"
        cx="50"
        cy="50"
        r="45"
        stroke-width="10"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-100"
        :style="{
          stroke: props.gaugeSecondaryColor,
          '--stroke-percent': 90 - currentPercent,
          '--offset-factor-secondary': 'calc(1 - var(--offset-factor))',
          strokeDasharray: 'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
          transform:
            'rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)',
          transition: 'all var(--transition-length) ease var(--delay)',
          transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
        }"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke-width="10"
        stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-100"
        :style="{
          stroke: props.gaugePrimaryColor,
          '--stroke-percent': currentPercent,
          strokeDasharray: 'calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)',
          transition: 'var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)',
          transitionProperty: 'stroke-dasharray,transform',
          transform: 'rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))',
          transformOrigin: 'calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)',
        }"
      />
    </svg>
    <span
      :data-current-value="currentPercent"
      class="absolute inset-0 m-auto size-fit delay-(--delay) duration-(--transition-length) ease-linear"
    >
      {{ currentPercent }}
    </span>
  </div>
</template>
