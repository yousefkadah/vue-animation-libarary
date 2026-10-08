<script setup lang="ts">
import { KineticText } from '@/components/ui/kinetic-text'
</script>

<template>
  <div class="flex flex-col items-center gap-3 text-center">
    <KineticText as="h2" text="Hover every letter" class="justify-center text-4xl tracking-tight sm:text-6xl" />
    <KineticText as="p" text="weight follows your cursor" class="justify-center text-lg text-muted-foreground" />
  </div>
</template>
