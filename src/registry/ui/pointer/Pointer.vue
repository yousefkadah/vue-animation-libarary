<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { AnimatePresence, motion, useMotionValue } from 'motion-v'
import { cn } from '@/lib/utils'

/**
 * Replaces the cursor with a custom, animated pointer while it is over this component's parent
 * element. Drop it inside any `relative` container; pass your own pointer in the default slot.
 * Extra attributes (`:animate`, `:transition`, …) are forwarded to the motion element.
 */
export interface PointerProps {
  /** Classes for the default arrow (e.g. `fill-blue-500`). */
  class?: HTMLAttributes['class']
  /** Extra styles for the floating pointer element. */
  style?: CSSProperties
}

defineOptions({ inheritAttrs: false })

const props = defineProps<PointerProps>()

const anchorRef = ref<HTMLElement>()
const isActive = ref(false)
const x = useMotionValue(0)
const y = useMotionValue(0)

let parent: HTMLElement | null = null
let previousCursor = ''

function onMove(event: MouseEvent) {
  x.set(event.clientX)
  y.set(event.clientY)
  isActive.value = true
}

function onLeave() {
  isActive.value = false
}

onMounted(() => {
  parent = anchorRef.value?.parentElement ?? null
  if (!parent) return
  previousCursor = parent.style.cursor
  parent.style.cursor = 'none'
  parent.addEventListener('mousemove', onMove)
  parent.addEventListener('mouseenter', onMove)
  parent.addEventListener('mouseleave', onLeave)
})

onBeforeUnmount(() => {
  if (!parent) return
  parent.style.cursor = previousCursor
  parent.removeEventListener('mousemove', onMove)
  parent.removeEventListener('mouseenter', onMove)
  parent.removeEventListener('mouseleave', onLeave)
  parent = null
})
</script>

<template>
  <div ref="anchorRef" class="contents">
    <AnimatePresence>
      <motion.div
        v-if="isActive"
        aria-hidden="true"
        class="pointer-events-none fixed z-50"
        :style="{ ...props.style, top: y, left: x }"
        :initial="{ scale: 0, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :exit="{ scale: 0, opacity: 0 }"
        v-bind="$attrs"
      >
        <slot>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="1"
            viewBox="0 0 16 16"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            :class="cn('rotate-[-70deg] stroke-white text-black', props.class)"
          >
            <path
              d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
            />
          </svg>
        </slot>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
