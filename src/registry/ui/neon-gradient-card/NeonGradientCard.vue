<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'

export interface NeonColorsProps {
  firstColor: string
  secondColor: string
}

export interface NeonGradientCardProps {
  class?: HTMLAttributes['class']
  /** Element to render the card as. */
  as?: string
  /** Width of the neon border in pixels. */
  borderSize?: number
  /** Corner radius in pixels. */
  borderRadius?: number
  /** The two colours of the neon gradient. */
  neonColors?: NeonColorsProps
}

const props = withDefaults(defineProps<NeonGradientCardProps>(), {
  as: 'div',
  borderSize: 2,
  borderRadius: 20,
  neonColors: () => ({ firstColor: '#ff00aa', secondColor: '#00FFF1' }),
})

const container = ref<HTMLElement | null>(null)
const dimensions = ref({ width: 0, height: 0 })

function updateDimensions() {
  if (!container.value) return
  const { offsetWidth, offsetHeight } = container.value
  dimensions.value = { width: offsetWidth, height: offsetHeight }
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  updateDimensions()
  resizeObserver = new ResizeObserver(updateDimensions)
  if (container.value) resizeObserver.observe(container.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())

const style = computed(() => {
  const { width, height } = dimensions.value
  const { firstColor, secondColor } = props.neonColors
  return {
    '--border-size': `${props.borderSize}px`,
    '--border-radius': `${props.borderRadius}px`,
    '--neon-first-color': firstColor,
    '--neon-second-color': secondColor,
    '--card-width': `${width}px`,
    '--card-height': `${height}px`,
    '--card-content-radius': `${props.borderRadius - props.borderSize}px`,
    '--pseudo-element-background-image': `linear-gradient(0deg, ${firstColor}, ${secondColor})`,
    '--pseudo-element-width': `${width + props.borderSize * 2}px`,
    '--pseudo-element-height': `${height + props.borderSize * 2}px`,
    '--after-blur': `${width / 3}px`,
  }
})

/** Static classes for the inner surface and its two neon layers (`before` = border, `after` = glow). */
const innerClass = [
  'relative size-full min-h-[inherit] rounded-(--card-content-radius) bg-gray-100 p-6',
  'before:absolute before:-top-(--border-size) before:-left-(--border-size) before:-z-10 before:block',
  'before:h-(--pseudo-element-height) before:w-(--pseudo-element-width) before:rounded-(--border-radius)',
  'before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-size-[100%_200%]',
  'before:animate-background-position-spin motion-reduce:before:animate-none',
  'after:absolute after:-top-(--border-size) after:-left-(--border-size) after:-z-10 after:block',
  'after:h-(--pseudo-element-height) after:w-(--pseudo-element-width) after:rounded-(--border-radius) after:blur-(--after-blur)',
  'after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-size-[100%_200%] after:opacity-80',
  'after:animate-background-position-spin motion-reduce:after:animate-none',
  'dark:bg-neutral-900',
  'wrap-break-word',
].join(' ')
</script>

<template>
  <component
    :is="props.as"
    ref="container"
    :style="style"
    :class="cn('relative z-10 size-full rounded-(--border-radius)', props.class)"
  >
    <div :class="innerClass">
      <slot />
    </div>
  </component>
</template>
