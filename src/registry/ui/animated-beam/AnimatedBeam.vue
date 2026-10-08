<script setup lang="ts">
import type { ComponentPublicInstance, HTMLAttributes, Ref } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, unref, useId, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

/**
 * An element to connect: a DOM element, a component instance (its root element is used) or a ref
 * holding either. A template ref passed in a template is unwrapped by Vue, which works too.
 */
export type AnimatedBeamTarget =
  | HTMLElement
  | ComponentPublicInstance
  | null
  | undefined
  | Ref<HTMLElement | ComponentPublicInstance | null | undefined>

export interface AnimatedBeamProps {
  class?: HTMLAttributes['class']
  /** The positioned element both ends live in. The beam is drawn in its coordinate space. */
  containerRef: AnimatedBeamTarget
  /** Where the beam starts. */
  fromRef: AnimatedBeamTarget
  /** Where the beam ends. */
  toRef: AnimatedBeamTarget
  /** Bend of the path in pixels. Negative curves up, positive curves down. */
  curvature?: number
  /** Run the beam from `toRef` back to `fromRef`. */
  reverse?: boolean
  /** Colour of the static path underneath the beam. */
  pathColor?: string
  /** Stroke width of the path in pixels. */
  pathWidth?: number
  /** Opacity of the static path. */
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  /** Seconds before the beam starts. */
  delay?: number
  /** Seconds for one pass. */
  duration?: number
  /** How many times the beam repeats. */
  repeat?: number
  /** Seconds to wait between passes. */
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

const props = withDefaults(defineProps<AnimatedBeamProps>(), {
  curvature: 0,
  reverse: false,
  duration: 5,
  delay: 0,
  pathColor: 'gray',
  pathWidth: 2,
  pathOpacity: 0.2,
  gradientStartColor: '#ffaa40',
  gradientStopColor: '#9c40ff',
  repeat: Infinity,
  repeatDelay: 0,
  startXOffset: 0,
  startYOffset: 0,
  endXOffset: 0,
  endYOffset: 0,
})

const id = useId()
const reducedMotion = useReducedMotion()
const pathD = ref('')
const svgDimensions = ref({ width: 0, height: 0 })

function resolveElement(target: AnimatedBeamTarget): HTMLElement | null {
  const value = unref(target)
  if (!value) return null
  if ('$el' in value) return (value.$el as HTMLElement | null) ?? null
  return value
}

const container = computed(() => resolveElement(props.containerRef))
const from = computed(() => resolveElement(props.fromRef))
const to = computed(() => resolveElement(props.toRef))

const gradientCoordinates = computed(() =>
  props.reverse
    ? { x1: ['90%', '-10%'], x2: ['100%', '0%'], y1: ['0%', '0%'], y2: ['0%', '0%'] }
    : { x1: ['10%', '110%'], x2: ['0%', '100%'], y1: ['0%', '0%'], y2: ['0%', '0%'] },
)

function updatePath() {
  const containerElement = container.value
  const fromElement = from.value
  const toElement = to.value
  if (!containerElement || !fromElement || !toElement) return

  const containerRect = containerElement.getBoundingClientRect()
  const rectA = fromElement.getBoundingClientRect()
  const rectB = toElement.getBoundingClientRect()

  svgDimensions.value = { width: containerRect.width, height: containerRect.height }

  const startX = rectA.left - containerRect.left + rectA.width / 2 + props.startXOffset
  const startY = rectA.top - containerRect.top + rectA.height / 2 + props.startYOffset
  const endX = rectB.left - containerRect.left + rectB.width / 2 + props.endXOffset
  const endY = rectB.top - containerRect.top + rectB.height / 2 + props.endYOffset

  const controlY = startY - props.curvature
  pathD.value = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
}

let resizeObserver: ResizeObserver | undefined

function observe() {
  resizeObserver?.disconnect()
  resizeObserver = new ResizeObserver(() => updatePath())
  for (const element of [container.value, from.value, to.value]) {
    if (element) resizeObserver.observe(element)
  }
  updatePath()
}

onMounted(observe)
watch([container, from, to], observe, { flush: 'post' })
watch(
  () => [props.curvature, props.startXOffset, props.startYOffset, props.endXOffset, props.endYOffset],
  updatePath,
)
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <svg
    fill="none"
    :width="svgDimensions.width"
    :height="svgDimensions.height"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    :class="cn('pointer-events-none absolute top-0 left-0 transform-gpu stroke-2', props.class)"
    :viewBox="`0 0 ${svgDimensions.width} ${svgDimensions.height}`"
  >
    <path
      :d="pathD"
      :stroke="props.pathColor"
      :stroke-width="props.pathWidth"
      :stroke-opacity="props.pathOpacity"
      stroke-linecap="round"
    />
    <path :d="pathD" :stroke-width="props.pathWidth" :stroke="`url(#${id})`" stroke-opacity="1" stroke-linecap="round" />
    <defs>
      <motion.linearGradient
        :id="id"
        class="transform-gpu"
        gradientUnits="userSpaceOnUse"
        :initial="{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }"
        :animate="reducedMotion ? undefined : gradientCoordinates"
        :transition="{
          delay: props.delay,
          duration: props.duration,
          ease: [0.16, 1, 0.3, 1],
          repeat: props.repeat,
          repeatDelay: props.repeatDelay,
        }"
      >
        <stop :stop-color="props.gradientStartColor" stop-opacity="0" />
        <stop :stop-color="props.gradientStartColor" />
        <stop offset="32.5%" :stop-color="props.gradientStopColor" />
        <stop offset="100%" :stop-color="props.gradientStopColor" stop-opacity="0" />
      </motion.linearGradient>
    </defs>
  </svg>
</template>
