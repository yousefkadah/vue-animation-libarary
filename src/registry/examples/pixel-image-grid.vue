<script setup lang="ts">
import { PixelImage } from '@/components/ui/pixel-image'
</script>

<template>
  <PixelImage
    src="https://picsum.photos/seed/vue-magic-ui/800/800"
    alt="Random stock photo"
    grid="8x8"
    :grayscale-animation="false"
    :pixel-fade-in-duration="600"
    :max-animation-delay="1600"
    class="size-64 md:size-80"
  />
</template>
