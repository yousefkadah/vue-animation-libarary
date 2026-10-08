<script setup lang="ts">
import { TextAnimate } from '@/components/ui/text-animate'

const poem = `Fade in by line, one at a time.
Each line is its own segment,
so long copy reads like a story.`
</script>

<template>
  <TextAnimate :text="poem" animation="fadeIn" by="line" :duration="0.9" class="text-center text-2xl leading-relaxed font-medium" />
</template>
