<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, Fragment, onBeforeUnmount, onMounted, onUpdated, ref, useSlots } from 'vue'
import { AnimatePresence } from 'motion-v'
import { cn } from '@/lib/utils'
import AnimatedListItem from './AnimatedListItem.vue'

export interface AnimatedListProps {
  class?: HTMLAttributes['class']
  /** Milliseconds between two items appearing. */
  delay?: number
}

const props = withDefaults(defineProps<AnimatedListProps>(), {
  delay: 1000,
})

const slots = useSlots()
const index = ref(0)
/** Number of items in the slot, refreshed on every render. */
let itemCount = 0
let timeout: ReturnType<typeof setTimeout> | undefined

function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment && Array.isArray(node.children)) return flatten(node.children as VNode[])
    if (node.type === Comment) return []
    return [node]
  })
}

/** The items revealed so far, newest first. Each keeps a stable key so it animates in only once. */
function visibleItems() {
  const items = flatten(slots.default?.() ?? []).map((vnode, position) => ({
    key: vnode.key ?? position,
    vnode,
  }))
  itemCount = items.length
  return items.slice(0, index.value + 1).reverse()
}

function scheduleNext() {
  if (timeout !== undefined || index.value >= itemCount - 1) return
  timeout = setTimeout(() => {
    timeout = undefined
    index.value = (index.value + 1) % Math.max(itemCount, 1)
    scheduleNext()
  }, props.delay)
}

onMounted(scheduleNext)
// New items added to the slot later continue the sequence.
onUpdated(scheduleNext)
onBeforeUnmount(() => clearTimeout(timeout))
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-4', props.class)">
    <AnimatePresence>
      <AnimatedListItem v-for="item in visibleItems()" :key="item.key">
        <component :is="item.vnode" />
      </AnimatedListItem>
    </AnimatePresence>
  </div>
</template>
