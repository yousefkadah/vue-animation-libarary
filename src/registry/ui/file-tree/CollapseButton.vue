<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { watch } from 'vue'
import { cn } from '@/lib/utils'
import { useTree, type TreeViewElement } from './context'

export interface CollapseButtonProps {
  class?: HTMLAttributes['class']
  /** The tree's data, used to find every folder to expand. */
  elements: TreeViewElement[]
  /** Expand every folder straight away. */
  expandAll?: boolean
}

const props = withDefaults(defineProps<CollapseButtonProps>(), {
  expandAll: false,
})

const tree = useTree()

/** Ids of every selectable folder that has children. */
function expandAllTree(elements: TreeViewElement[]): string[] {
  const expandedElementIds: string[] = []
  const expandTree = (element: TreeViewElement) => {
    const isSelectable = element.isSelectable ?? true
    if (isSelectable && element.children && element.children.length > 0) {
      expandedElementIds.push(element.id)
      element.children.forEach(expandTree)
    }
  }
  elements.forEach(expandTree)
  return [...new Set(expandedElementIds)]
}

watch(
  () => [props.expandAll, props.elements] as const,
  ([expandAll, elements]) => {
    if (expandAll) tree.setExpandedItems(expandAllTree(elements))
  },
  { immediate: true },
)

function toggle() {
  if (tree.expandedItems.value && tree.expandedItems.value.length > 0) tree.setExpandedItems([])
  else tree.setExpandedItems(expandAllTree(props.elements))
}
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'absolute end-2 bottom-1 inline-flex h-8 w-fit cursor-pointer items-center justify-center gap-2 rounded-md p-1 text-sm font-medium whitespace-nowrap outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50',
        props.class,
      )
    "
    @click="toggle"
  >
    <slot />
    <span class="sr-only">Toggle</span>
  </button>
</template>
