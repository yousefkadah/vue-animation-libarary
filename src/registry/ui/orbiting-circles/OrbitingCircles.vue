<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, Fragment, computed, useSlots } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

export interface OrbitingCirclesProps {
  class?: HTMLAttributes['class']
  /** Orbit counter-clockwise. */
  reverse?: boolean
  /** Seconds for one full orbit (divided by `speed`). */
  duration?: number
  /** Seconds to offset the starting position along the orbit. */
  delay?: number
  /** Radius of the orbit in pixels. */
  radius?: number
  /** Draw the circular path. */
  path?: boolean
  /** Size of each orbiting item in pixels. */
  iconSize?: number
  /** Speed multiplier. */
  speed?: number
}

const props = withDefaults(defineProps<OrbitingCirclesProps>(), {
  reverse: false,
  duration: 20,
  delay: 0,
  radius: 160,
  path: true,
  iconSize: 30,
  speed: 1,
})

const slots = useSlots()
const calculatedDuration = computed(() => props.duration / props.speed)

function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment && Array.isArray(node.children)) return flatten(node.children as VNode[])
    if (node.type === Comment) return []
    return [node]
  })
}

/** Every slot child, spread evenly around the circle. */
function orbitItems() {
  const children = flatten(slots.default?.() ?? [])
  return children.map((vnode, index) => ({ vnode, angle: (360 / children.length) * index }))
}
</script>

<template>
  <svg
    v-if="props.path"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    class="pointer-events-none absolute inset-0 size-full"
    aria-hidden="true"
  >
    <circle class="stroke-black/10 stroke-1 dark:stroke-white/10" cx="50%" cy="50%" :r="props.radius" fill="none" />
  </svg>
  <div
    v-for="(item, index) in orbitItems()"
    :key="index"
    v-bind="$attrs"
    :style="{
      '--duration': calculatedDuration,
      '--radius': props.radius,
      '--angle': item.angle,
      '--icon-size': `${props.iconSize}px`,
      animationDelay: props.delay ? `${-props.delay}s` : undefined,
    }"
    :class="
      cn(
        'animate-orbit absolute flex size-(--icon-size) transform-gpu items-center justify-center rounded-full motion-reduce:[animation-play-state:paused]',
        props.reverse && '[animation-direction:reverse]',
        props.class,
      )
    "
  >
    <component :is="item.vnode" />
  </div>
</template>
