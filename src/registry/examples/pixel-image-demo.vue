<script setup lang="ts">
import { PixelImage } from '@/components/ui/pixel-image'
</script>

<template>
  <PixelImage
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&q=80&auto=format&fit=crop"
    alt="A misty mountain valley at sunrise"
    :custom-grid="{ rows: 4, cols: 6 }"
    grayscale-animation
  />
</template>
