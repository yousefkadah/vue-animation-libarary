var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export interface BentoGridProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<BentoGridProps>()
<\/script>

<template>
  <div :class="cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', props.class)">
    <slot />
  </div>
</template>
`;export{e as default};