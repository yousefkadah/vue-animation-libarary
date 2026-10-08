<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useTree } from './context'

export interface TreeIndicatorProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<TreeIndicatorProps>()
const tree = useTree()
</script>

<template>
  <div
    :dir="tree.direction.value"
    :class="
      cn(
        'absolute start-1.5 h-full w-px rounded-md bg-border py-3 duration-300 ease-in-out hover:bg-slate-300 dark:hover:bg-slate-600',
        props.class,
      )
    "
  />
</template>
