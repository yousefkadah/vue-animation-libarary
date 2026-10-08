<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import { cn } from '@/lib/utils'
import { scrollVelocityKey, useScrollVelocityFactor } from './context'

export interface ScrollVelocityContainerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<ScrollVelocityContainerProps>()

provide(scrollVelocityKey, useScrollVelocityFactor())
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <slot />
  </div>
</template>
