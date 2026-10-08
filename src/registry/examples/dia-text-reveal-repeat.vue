<script setup lang="ts">
import { DiaTextReveal } from '@/components/ui/dia-text-reveal'
</script>

<template>
  <div class="flex min-h-64 items-center justify-center p-8 text-foreground">
    <h1 class="text-center text-3xl font-semibold tracking-tight md:text-4xl">
      Learn to
      <DiaTextReveal repeat :repeat-delay="1.2" :text="['build faster', 'ship smarter', 'scale easier']" />
    </h1>
  </div>
</template>
