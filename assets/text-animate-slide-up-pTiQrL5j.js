var e=`<script setup lang="ts">
import { TextAnimate } from '@/components/ui/text-animate'
<\/script>

<template>
  <div class="flex flex-col items-center gap-3 text-center">
    <TextAnimate as="h2" animation="slideUp" by="word" class="text-4xl font-bold tracking-tighter sm:text-5xl">
      Slide up by word
    </TextAnimate>
    <TextAnimate
      animation="blurIn"
      by="word"
      :delay="0.4"
      :duration="0.6"
      class="max-w-sm text-balance text-muted-foreground"
    >
      Pass the text as a prop or straight through the default slot.
    </TextAnimate>
  </div>
</template>
`;export{e as default};