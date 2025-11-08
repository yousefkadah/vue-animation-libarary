<template>
  <Motion
    ref="motionRef"
    :as="as"
    :initial="initialState"
    :animate="animateState"
    :transition="transitionConfig"
    :class="className"
  >
    <slot />
  </Motion>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Motion from './Motion.vue'
import { useScroll } from '../composables/useScroll'
import type { EasingName } from '../utils/easing'

interface Props {
  as?: string
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  triggerOnce?: boolean
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  ease?: EasingName
  stagger?: number
  cascade?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  className: '',
  delay: 0,
  duration: 600,
  threshold: 0.1,
  triggerOnce: true,
  direction: 'up',
  distance: 20,
  ease: 'easeOut',
  stagger: 0,
  cascade: false
})

const motionRef = ref()

// Use scroll detection to trigger animation
const { isInView } = useScroll(motionRef, {
  threshold: props.threshold,
  triggerOnce: props.triggerOnce
})

// Calculate initial transform based on direction
const getInitialTransform = () => {
  switch (props.direction) {
    case 'up':
      return { y: props.distance, opacity: 0 }
    case 'down':
      return { y: -props.distance, opacity: 0 }
    case 'left':
      return { x: props.distance, opacity: 0 }
    case 'right':
      return { x: -props.distance, opacity: 0 }
    case 'none':
      return { opacity: 0 }
    default:
      return { y: props.distance, opacity: 0 }
  }
}

const initialState = computed(() => getInitialTransform())

const animateState = computed(() => {
  if (!isInView.value) {
    return props.triggerOnce ? initialState.value : getInitialTransform()
  }
  
  return {
    x: 0,
    y: 0,
    opacity: 1
  }
})

const transitionConfig = computed(() => ({
  duration: props.duration / 1000, // Convert to seconds
  delay: props.delay / 1000,
  ease: props.ease
}))
</script>