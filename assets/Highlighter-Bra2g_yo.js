var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useInView } from 'motion-v'
import { annotate } from 'rough-notation'
import type { RoughAnnotation } from 'rough-notation/lib/model'
import { cn } from '@/lib/utils'

export interface HighlighterProps {
  class?: HTMLAttributes['class']
  /** The kind of annotation to draw. */
  action?: 'highlight' | 'underline' | 'box' | 'circle' | 'strike-through' | 'crossed-off' | 'bracket'
  /** Colour of the annotation. */
  color?: string
  /** Stroke width in pixels. */
  strokeWidth?: number
  /** Milliseconds the drawing animation takes. */
  animationDuration?: number
  /** How many times the annotation is drawn; more than 1 gives a sketchier look. */
  iterations?: number
  /** Padding between the text and the annotation, in pixels. */
  padding?: number
  /** Annotate each line of wrapped text separately. */
  multiline?: boolean
  /** Wait until the text scrolls into view before drawing. */
  isView?: boolean
}

const props = withDefaults(defineProps<HighlighterProps>(), {
  action: 'highlight',
  color: '#ffd1dc',
  strokeWidth: 1.5,
  animationDuration: 600,
  iterations: 2,
  padding: 2,
  multiline: true,
  isView: false,
})

const element = ref<HTMLSpanElement | null>(null)
const isInView = useInView(element, { once: true, margin: '-10%' })
/** Draw straight away, or once in view when \`isView\` is set. */
const shouldShow = computed(() => !props.isView || isInView.value)

let annotation: RoughAnnotation | null = null
let resizeObserver: ResizeObserver | null = null

function teardown() {
  annotation?.remove()
  annotation = null
  resizeObserver?.disconnect()
  resizeObserver = null
}

function draw() {
  teardown()
  const target = element.value
  if (!shouldShow.value || !target) return

  const current = annotate(target, {
    type: props.action,
    color: props.color,
    strokeWidth: props.strokeWidth,
    animationDuration: props.animationDuration,
    iterations: props.iterations,
    padding: props.padding,
    multiline: props.multiline,
  })
  annotation = current
  current.show()

  // Re-draw when the text reflows so the annotation keeps hugging it.
  resizeObserver = new ResizeObserver(() => {
    current.hide()
    current.show()
  })
  resizeObserver.observe(target)
  resizeObserver.observe(document.body)
}

onMounted(() => {
  watch(
    () => [
      shouldShow.value,
      props.action,
      props.color,
      props.strokeWidth,
      props.animationDuration,
      props.iterations,
      props.padding,
      props.multiline,
    ],
    draw,
    { immediate: true, flush: 'post' },
  )
})

onBeforeUnmount(teardown)
<\/script>

<template>
  <span ref="element" :class="cn('relative inline-block bg-transparent', props.class)">
    <slot />
  </span>
</template>
`;export{e as default};