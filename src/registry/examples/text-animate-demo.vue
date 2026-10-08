<script setup lang="ts">
import { TextAnimate } from '@/components/ui/text-animate'
</script>

<template>
  <TextAnimate
    text="Blur in by character"
    animation="blurInUp"
    by="character"
    once
    class="text-4xl font-semibold tracking-tight sm:text-5xl"
  />
</template>
