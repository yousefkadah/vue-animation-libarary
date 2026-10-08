var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface KineticTextProps {
  class?: HTMLAttributes['class']
  /** The text to render with the kinetic hover effect. */
  text: string
  /** Element to render. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

const props = withDefaults(defineProps<KineticTextProps>(), {
  as: 'h1',
})

const letters = computed(() => props.text.split('').map((letter) => (letter === ' ' ? '\xA0' : letter)))
<\/script>

<template>
  <component
    :is="props.as"
    :class="cn('flex flex-wrap font-[300]', props.class)"
    :style="{ '--hover-padding': 'calc(1em / 12)', '--text-stroke-width': 'calc(1em * 125 / 6000)' }"
  >
    <span
      v-for="(letter, index) in letters"
      :key="index"
      aria-hidden="true"
      class="[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] motion-reduce:transition-none [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
    >{{ letter }}</span>
    <span class="sr-only">{{ props.text }}</span>
  </component>
</template>
`;export{e as default};