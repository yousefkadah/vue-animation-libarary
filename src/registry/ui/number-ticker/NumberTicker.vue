<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useInView, useMotionValue, useSpring } from 'motion-v'
import { cn } from '@/lib/utils'

export interface NumberTickerProps {
  /** The value to count to (or from, when counting down). */
  value: number
  /** The value to count from (or to, when counting down). */
  startValue?: number
  /** Count up from `startValue` to `value`, or down from `value` to `startValue`. */
  direction?: 'up' | 'down'
  /** Seconds to wait after the number scrolls into view. */
  delay?: number
  /** Number of decimal places to show. */
  decimalPlaces?: number
  /** BCP 47 locale passed to `Intl.NumberFormat` (grouping and decimal separators). */
  locale?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<NumberTickerProps>(), {
  startValue: 0,
  direction: 'up',
  delay: 0,
  decimalPlaces: 0,
  locale: 'en-US',
})

const el = ref<HTMLSpanElement>()
const motionValue = useMotionValue(props.direction === 'down' ? props.value : props.startValue)
const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
const isInView = useInView(el, { once: true, margin: '0px' })

const formatter = computed(
  () =>
    new Intl.NumberFormat(props.locale, {
      minimumFractionDigits: props.decimalPlaces,
      maximumFractionDigits: props.decimalPlaces,
    }),
)
const format = (latest: number) => formatter.value.format(Number(latest.toFixed(props.decimalPlaces)))

const display = ref(format(motionValue.get()))

watch(
  [isInView, () => props.value, () => props.direction, () => props.startValue, () => props.delay],
  (_value, _oldValue, onCleanup) => {
    if (!isInView.value) return
    const timer = setTimeout(() => {
      motionValue.set(props.direction === 'down' ? props.startValue : props.value)
    }, props.delay * 1000)
    onCleanup(() => clearTimeout(timer))
  },
  { immediate: true },
)

watch(formatter, () => {
  display.value = format(springValue.get())
})

const unsubscribe = springValue.on('change', (latest) => {
  display.value = format(latest)
})
onBeforeUnmount(unsubscribe)
</script>

<template>
  <span ref="el" :class="cn('inline-block tracking-wider text-foreground tabular-nums', props.class)">{{ display }}</span>
</template>
