var e=`<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { computed, provide, ref, toRef, watch } from 'vue'
import { cn } from '@/lib/utils'
import { mergeExpandedItems, sortTreeElements, treeKey, type TreeSortMode, type TreeViewElement } from './context'
import TreeElements from './TreeElements.vue'

export interface TreeProps {
  class?: HTMLAttributes['class']
  /** Data to render when the default slot is empty. */
  elements?: TreeViewElement[]
  /** Id of the item selected at first. Its parent folders are expanded automatically. */
  initialSelectedId?: string
  /** Ids of the folders expanded at first. */
  initialExpandedItems?: string[]
  /** Show the vertical guide line inside expanded folders. */
  indicator?: boolean
  /** Icon component for expanded folders. */
  openIcon?: Component
  /** Icon component for collapsed folders. */
  closeIcon?: Component
  /** Sorting used when rendering from \`elements\`: folders first and alphabetical, input order, or a comparator. */
  sort?: TreeSortMode
  /** Text direction. */
  dir?: 'rtl' | 'ltr'
}

const props = withDefaults(defineProps<TreeProps>(), {
  indicator: true,
  sort: 'default',
})

const emit = defineEmits<{
  select: [id: string]
}>()

const selectedId = ref(props.initialSelectedId)
const expandedItems = ref<string[] | undefined>(props.initialExpandedItems ? [...props.initialExpandedItems] : undefined)

function selectItem(id: string) {
  selectedId.value = id
  emit('select', id)
}

function handleExpand(id: string) {
  const previous = expandedItems.value
  expandedItems.value = previous?.includes(id) ? previous.filter((item) => item !== id) : [...(previous ?? []), id]
}

/** Expands every folder on the path to \`selectId\` (and the item itself when it is a selectable folder). */
function expandSpecificTargetedElements(elements: TreeViewElement[] | undefined, selectId: string | undefined) {
  if (!elements || !selectId) return
  const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
    const isSelectable = currentElement.isSelectable ?? true
    const newPath = [...currentPath, currentElement.id]
    if (currentElement.id === selectId) {
      if (!isSelectable) newPath.pop()
      expandedItems.value = mergeExpandedItems(expandedItems.value, newPath)
      return
    }
    currentElement.children?.forEach((child) => findParent(child, newPath))
  }
  elements.forEach((element) => findParent(element))
}

watch(
  () => [props.initialSelectedId, props.elements] as const,
  ([id, elements]) => expandSpecificTargetedElements(elements, id),
  { immediate: true },
)

const direction = computed(() => (props.dir === 'rtl' ? 'rtl' : 'ltr'))
const sortedElements = computed(() => (props.elements ? sortTreeElements(props.elements, props.sort) : []))

provide(treeKey, {
  selectedId,
  expandedItems,
  indicator: toRef(() => props.indicator),
  openIcon: toRef(() => props.openIcon),
  closeIcon: toRef(() => props.closeIcon),
  direction,
  handleExpand,
  selectItem,
  setExpandedItems: (items) => {
    expandedItems.value = items
  },
})
<\/script>

<template>
  <div :class="cn('size-full', props.class)">
    <div class="relative h-full overflow-auto px-2" :dir="direction">
      <div class="flex flex-col gap-1" :dir="direction">
        <slot>
          <TreeElements v-if="props.elements" :elements="sortedElements" />
        </slot>
      </div>
    </div>
  </div>
</template>
`;export{e as default};