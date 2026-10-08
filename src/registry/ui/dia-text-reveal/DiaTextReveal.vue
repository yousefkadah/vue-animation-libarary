<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion-v'
import { cn } from '@/lib/utils'

export interface DiaTextRevealProps {
  class?: HTMLAttributes['class']
  /** Text to reveal. Pass several strings to rotate through them when `repeat` is on. */
  text: string | string[]
  /** Colours sampled across the moving gradient band. */
  colors?: string[]
  /** Colour of the revealed text, and of the regions outside the band while it sweeps. */
  textColor?: string
  /** Seconds one sweep takes. */
  duration?: number
  /** Seconds to wait before the sweep starts. */
  delay?: number
  /** With several strings, replay the sweep and advance to the next string after each pass. */
  repeat?: boolean
  /** Seconds to pause between cycles when `repeat` is on. */
  repeatDelay?: number
  /** Start the sweep when the element scrolls into view. */
  startOnView?: boolean
  /** Only play the first time the element comes into view. */
  once?: boolean
  /** With several strings, reserve the widest string's width instead of animating the width per string. */
  fixedWidth?: boolean
}

const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const props = withDefaults(defineProps<DiaTextRevealProps>(), {
  colors: () => ['#c679c4', '#fa3d1d', '#ffb005', '#e1e1fe', '#0358f7'],
  textColor: 'var(--foreground)',
  duration: 1.5,
  delay: 0,
  repeat: false,
  repeatDelay: 0.5,
  startOnView: true,
  once: true,
  fixedWidth: false,
})

const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

function buildGradient(position: number, colors: string[], textColor: string) {
  const bandStart = position - BAND_HALF
  const bandEnd = position + BAND_HALF
  if (bandStart >= 100) return `linear-gradient(90deg, ${textColor}, ${textColor})`

  const parts: string[] = []
  if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)
  colors.forEach((color, index) => {
    const percent = colors.length === 1 ? position : bandStart + (index / (colors.length - 1)) * BAND_HALF * 2
    parts.push(`${color} ${percent.toFixed(2)}%`)
  })
  if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, 'transparent 100%')
  return `linear-gradient(90deg, ${parts.join(', ')})`
}

/** Measures each string's rendered width with an invisible clone of the element. */
function measureWidths(element: HTMLElement, texts: string[]) {
  const ghost = element.cloneNode() as HTMLElement
  Object.assign(ghost.style, {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: 'auto',
    whiteSpace: 'nowrap',
  })
  element.parentElement?.appendChild(ghost)
  const widths = texts.map((text) => {
    ghost.textContent = text
    return ghost.getBoundingClientRect().width
  })
  ghost.remove()
  return widths
}

const texts = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))
const isMulti = computed(() => texts.value.length > 1)
const prefersReducedMotion = useReducedMotion()

const root = ref<{ $el: HTMLElement } | null>(null)
const activeIndex = ref(0)
const measuredWidths = ref<number[]>([])

const sweepPos = useMotionValue(SWEEP_START)
const backgroundImage = useTransform(sweepPos, (position: number) =>
  buildGradient(position, props.colors, props.textColor),
)
const isInView = useInView(() => root.value?.$el, computed(() => ({ once: props.once, amount: 0.1 })))

const fixedWidthPx = computed(() =>
  isMulti.value && props.fixedWidth && measuredWidths.value.length ? Math.max(...measuredWidths.value) : undefined,
)
const currentIndex = computed(() => activeIndex.value % texts.value.length)
const animatedWidthPx = computed(() =>
  isMulti.value && !props.fixedWidth ? measuredWidths.value[currentIndex.value] : undefined,
)

const style = computed(() => ({
  color: 'transparent',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  backgroundSize: '100% 100%',
  backgroundImage,
  width: fixedWidthPx.value != null ? `${fixedWidthPx.value}px` : undefined,
}))

let hasPlayed = false
let timer: ReturnType<typeof setTimeout> | undefined
let stopSweep: (() => void) | null = null

function play() {
  sweepPos.set(SWEEP_START)
  const controls = animate(sweepPos, SWEEP_END, {
    duration: props.duration,
    delay: props.delay,
    ease: sweepEase,
    onComplete() {
      if (!props.repeat) return
      timer = setTimeout(() => {
        activeIndex.value = (activeIndex.value + 1) % texts.value.length
        play()
      }, props.repeatDelay * 1000)
    },
  })
  stopSweep = () => controls.stop()
}

function stop() {
  stopSweep?.()
  stopSweep = null
  clearTimeout(timer)
}

function measure() {
  const element = root.value?.$el
  if (element && isMulti.value) measuredWidths.value = measureWidths(element, texts.value)
}

onMounted(() => {
  watch(() => texts.value.join('\0'), measure, { immediate: true })
  // Re-measure once web fonts have loaded and when the viewport (and so the font size) changes.
  document.fonts?.ready.then(measure)
  window.addEventListener('resize', measure, { passive: true })

  watch(
    () => [isInView.value, props.startOnView, props.once, prefersReducedMotion.value],
    (_value, _oldValue, onCleanup) => {
      if (prefersReducedMotion.value) {
        sweepPos.set(SWEEP_END)
        return
      }
      if (props.startOnView && !isInView.value) return
      if (props.once && hasPlayed) return
      hasPlayed = true
      play()
      onCleanup(stop)
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <motion.span
    ref="root"
    :class="
      cn(
        'align-bottom leading-[100%] -translate-y-0.5',
        isMulti && 'inline-block overflow-hidden whitespace-nowrap',
        props.class,
      )
    "
    :style="style"
    :animate="animatedWidthPx != null ? { width: animatedWidthPx } : undefined"
    :transition="{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }"
  >{{ texts[currentIndex] }}</motion.span>
</template>
