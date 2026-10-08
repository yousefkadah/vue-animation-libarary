<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowRight } from '@lucide/vue'
import { cn } from '@/lib/utils'

export interface InteractiveHoverButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<InteractiveHoverButtonProps>()
</script>

<template>
  <button
    :class="
      cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold',
        props.class,
      )
    "
  >
    <span class="flex items-center justify-center gap-2">
      <span class="size-2 rounded-full bg-primary transition-all duration-300 group-hover:scale-[100.8]" />
      <span class="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        <slot />
      </span>
    </span>
    <span
      aria-hidden="true"
      class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100"
    >
      <span><slot /></span>
      <ArrowRight />
    </span>
  </button>
</template>
