var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, useId } from 'vue'
import { FolderIcon, FolderOpenIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { useTree } from './context'
import TreeIndicator from './TreeIndicator.vue'

export interface FolderProps {
  class?: HTMLAttributes['class']
  /** Folder name. */
  element: string
  /** Unique id, used for selection and expansion. */
  value: string
  isSelectable?: boolean
  /** Force the selected state. Defaults to whether this folder is the tree's selected item. */
  isSelect?: boolean
}

const props = withDefaults(defineProps<FolderProps>(), {
  isSelectable: true,
  isSelect: undefined,
})

const tree = useTree()
const contentId = useId()
const isSelected = computed(() => props.isSelect ?? tree.selectedId.value === props.value)
const isOpen = computed(() => tree.expandedItems.value?.includes(props.value) ?? false)

function onClick() {
  tree.selectItem(props.value)
  tree.handleExpand(props.value)
}
<\/script>

<template>
  <div class="relative h-full overflow-hidden" :data-state="isOpen ? 'open' : 'closed'">
    <button
      type="button"
      :disabled="!props.isSelectable"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      :class="
        cn(
          'flex items-center gap-1 rounded-md text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset',
          props.class,
          {
            'rounded-md bg-muted': isSelected && props.isSelectable,
            'cursor-pointer': props.isSelectable,
            'cursor-not-allowed opacity-50': !props.isSelectable,
          },
        )
      "
      @click="onClick"
    >
      <component
        :is="isOpen ? (tree.openIcon.value ?? FolderOpenIcon) : (tree.closeIcon.value ?? FolderIcon)"
        class="size-4"
        aria-hidden="true"
      />
      <span>{{ props.element }}</span>
    </button>
    <div
      :id="contentId"
      :inert="!isOpen"
      :class="
        cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )
      "
    >
      <div class="relative min-h-0 overflow-hidden text-sm">
        <TreeIndicator v-if="props.element && tree.indicator.value" aria-hidden="true" />
        <div class="ms-5 flex flex-col gap-1 py-1" :dir="tree.direction.value">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
`;export{e as default};