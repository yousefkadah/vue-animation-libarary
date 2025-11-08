<template>
  <component
    :is="as"
    ref="elementRef"
    :style="animatedStyles"
    :class="['motion-element', className]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @focus="handleFocus"
    @blur="handleBlur"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type StyleValue } from 'vue'
import { useSpring } from '../composables/useSpring'
import { useGesture } from '../composables/useGesture'
import { type EasingName, type EasingFunction } from '../utils/easing'

export interface MotionState {
  x?: number
  y?: number
  z?: number
  scale?: number
  scaleX?: number
  scaleY?: number
  rotate?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  opacity?: number
  skew?: number
  skewX?: number
  skewY?: number
}

export interface Transition {
  duration?: number
  delay?: number
  ease?: EasingName | EasingFunction
  repeat?: number
  repeatType?: 'loop' | 'reverse' | 'mirror'
  repeatDelay?: number
}

export interface MotionProps {
  as?: string | object
  className?: string
  initial?: MotionState | false
  animate?: MotionState
  whileHover?: MotionState
  whileTap?: MotionState
  whileFocus?: MotionState
  whileDrag?: MotionState
  exit?: MotionState
  transition?: Transition
  dragConstraints?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }
  dragElastic?: boolean | number
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onTapStart?: () => void
  onTapEnd?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

const props = withDefaults(defineProps<MotionProps>(), {
  as: 'div',
  className: '',
  initial: () => ({}),
  animate: () => ({}),
  transition: () => ({
    duration: 0.5,
    ease: 'easeOut'
  })
})

const emit = defineEmits<{
  animationStart: []
  animationComplete: []
  hoverStart: []
  hoverEnd: []
  tapStart: []
  tapEnd: []
  dragStart: []
  dragEnd: []
}>()

const elementRef = ref<HTMLElement | null>(null)
const currentState = ref<MotionState>({})
const isHovering = ref(false)
const isTapping = ref(false)
const isFocused = ref(false)
const isDragging = ref(false)

// Initialize with initial state
onMounted(() => {
  if (props.initial !== false) {
    Object.assign(currentState.value, props.initial)
  }
})

// Create spring animations for each property
const springs = computed(() => {
  const result: Record<string, any> = {}
  const targetState = {
    ...props.animate,
    ...(isHovering.value ? props.whileHover : {}),
    ...(isTapping.value ? props.whileTap : {}),
    ...(isFocused.value ? props.whileFocus : {}),
    ...(isDragging.value ? props.whileDrag : {})
  }

  Object.keys(targetState).forEach(key => {
    result[key] = useSpring(
      targetState[key as keyof MotionState] ?? 0,
      {
        config: {
          tension: 280,
          friction: 60
        },
        onStart: () => {
          emit('animationStart')
          props.onAnimationStart?.()
        },
        onRest: () => {
          emit('animationComplete')
          props.onAnimationComplete?.()
        }
      }
    )
  })

  return result
})

// Gesture handling
useGesture(elementRef, {
  onDragStart: () => {
    isDragging.value = true
    emit('dragStart')
    props.onDragStart?.()
  },
  onDragEnd: () => {
    isDragging.value = false
    emit('dragEnd')
    props.onDragEnd?.()
  },
  bounds: props.dragConstraints
})

// Convert spring values to CSS transforms
const animatedStyles = computed((): StyleValue => {
  const transforms: string[] = []
  const styles: Record<string, string | number> = {}

  // Transform properties
  if (springs.value.x?.value.value !== undefined) {
    transforms.push(`translateX(${springs.value.x.value.value}px)`)
  }
  if (springs.value.y?.value.value !== undefined) {
    transforms.push(`translateY(${springs.value.y.value.value}px)`)
  }
  if (springs.value.z?.value.value !== undefined) {
    transforms.push(`translateZ(${springs.value.z.value.value}px)`)
  }
  if (springs.value.scale?.value.value !== undefined) {
    transforms.push(`scale(${springs.value.scale.value.value})`)
  }
  if (springs.value.scaleX?.value.value !== undefined) {
    transforms.push(`scaleX(${springs.value.scaleX.value.value})`)
  }
  if (springs.value.scaleY?.value.value !== undefined) {
    transforms.push(`scaleY(${springs.value.scaleY.value.value})`)
  }
  if (springs.value.rotate?.value.value !== undefined) {
    transforms.push(`rotate(${springs.value.rotate.value.value}deg)`)
  }
  if (springs.value.rotateX?.value.value !== undefined) {
    transforms.push(`rotateX(${springs.value.rotateX.value.value}deg)`)
  }
  if (springs.value.rotateY?.value.value !== undefined) {
    transforms.push(`rotateY(${springs.value.rotateY.value.value}deg)`)
  }
  if (springs.value.rotateZ?.value.value !== undefined) {
    transforms.push(`rotateZ(${springs.value.rotateZ.value.value}deg)`)
  }
  if (springs.value.skew?.value.value !== undefined) {
    transforms.push(`skew(${springs.value.skew.value.value}deg)`)
  }
  if (springs.value.skewX?.value.value !== undefined) {
    transforms.push(`skewX(${springs.value.skewX.value.value}deg)`)
  }
  if (springs.value.skewY?.value.value !== undefined) {
    transforms.push(`skewY(${springs.value.skewY.value.value}deg)`)
  }

  if (transforms.length > 0) {
    styles.transform = transforms.join(' ')
  }

  // Other properties
  if (springs.value.opacity?.value.value !== undefined) {
    styles.opacity = springs.value.opacity.value.value
  }

  return styles
})

// Event handlers
const handleMouseEnter = () => {
  isHovering.value = true
  emit('hoverStart')
  props.onHoverStart?.()
}

const handleMouseLeave = () => {
  isHovering.value = false
  emit('hoverEnd')
  props.onHoverEnd?.()
}

const handleMouseDown = () => {
  isTapping.value = true
  emit('tapStart')
  props.onTapStart?.()
}

const handleMouseUp = () => {
  isTapping.value = false
  emit('tapEnd')
  props.onTapEnd?.()
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}
</script>

<style scoped>
.motion-element {
  transform-origin: center;
  will-change: transform, opacity;
}
</style>