var e=`<script setup lang="ts">
import { Text3DFlip } from '@/components/ui/text-3d-flip'
<\/script>

<template>
  <Text3DFlip
    class="bg-background font-serif text-2xl sm:text-5xl md:text-[56px]"
    text-class="bg-background text-foreground"
    flip-text-class="bg-background text-foreground"
    rotate-direction="top"
    :stagger-duration="0.03"
    stagger-from="first"
    :transition="{ type: 'spring', damping: 25, stiffness: 160 }"
  >
    Stay hungry, stay foolish
  </Text3DFlip>
</template>
`;export{e as default};