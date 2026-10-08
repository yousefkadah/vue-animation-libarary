<script setup lang="ts">
import { TypingAnimation } from '@/components/ui/typing-animation'
</script>

<template>
  <h2 class="text-center text-4xl font-bold tracking-tight sm:text-5xl">
    <span class="text-muted-foreground">We </span>
    <TypingAnimation :words="['Design 🎨', 'Build 🔨', 'Ship 🚀']" loop class="leading-tight" />
  </h2>
</template>
