var e=`<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { FileIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { useTree } from './context'

export interface FileProps {
  class?: HTMLAttributes['class']
  /** Unique id, used for selection. */
  value: string
  isSelectable?: boolean
  /** Force the selected state. Defaults to whether this file is the tree's selected item. */
  isSelect?: boolean
  /** Icon component. Use the \`icon\` slot for anything else. */
  fileIcon?: Component
}

const props = withDefaults(defineProps<FileProps>(), {
  isSelectable: true,
  isSelect: undefined,
})

const emit = defineEmits<{
  select: [value: string]
}>()

const tree = useTree()
const isSelected = computed(() => props.isSelect ?? tree.selectedId.value === props.value)

function onClick() {
  tree.selectItem(props.value)
  emit('select', props.value)
}
<\/script>

<template>
  <button
    type="button"
    :disabled="!props.isSelectable"
    :class="
      cn(
        'flex w-fit items-center gap-1 rounded-md pe-1 text-sm outline-none duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset',
        { 'bg-muted': isSelected && props.isSelectable },
        props.isSelectable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot name="icon">
      <component :is="props.fileIcon ?? FileIcon" class="size-4" aria-hidden="true" />
    </slot>
    <slot />
  </button>
</template>
`;export{e as default};