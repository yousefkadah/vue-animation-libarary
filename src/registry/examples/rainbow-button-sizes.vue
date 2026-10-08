<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import { RainbowButton } from '@/components/ui/rainbow-button'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <RainbowButton size="sm">Small</RainbowButton>
    <RainbowButton>Default</RainbowButton>
    <RainbowButton size="lg">Large</RainbowButton>
    <RainbowButton size="icon" aria-label="Sparkles">
      <Sparkles />
    </RainbowButton>
    <RainbowButton as="a" href="#" variant="outline" class="[--speed:4s]">Link, slower</RainbowButton>
  </div>
</template>
