<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { rainbowButtonVariants, type RainbowButtonSize, type RainbowButtonVariant } from './variants'

export interface RainbowButtonProps {
  class?: HTMLAttributes['class']
  /** `default` is solid, `outline` is light with a rainbow underline. */
  variant?: RainbowButtonVariant
  size?: RainbowButtonSize
  /** Element or component to render, e.g. `a` or a router link. Replaces Magic UI's `asChild`. */
  as?: string | Component
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  variant: 'default',
  size: 'default',
  as: 'button',
})
</script>

<template>
  <component
    :is="props.as"
    data-slot="button"
    :class="cn(rainbowButtonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </component>
</template>
