<script setup lang="ts">
import { BorderBeam } from '@/components/ui/border-beam'
</script>

<template>
  <button class="relative overflow-hidden rounded-md border bg-background px-5 py-2 text-sm font-medium hover:bg-accent">
    Buy Now
    <BorderBeam
      :size="40"
      :initial-offset="20"
      class="from-transparent via-yellow-500 to-transparent"
      :transition="{ type: 'spring', stiffness: 60, damping: 20 }"
    />
  </button>
</template>
