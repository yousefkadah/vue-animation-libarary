<script setup lang="ts">
import { HexagonPattern } from '@/components/ui/hexagon-pattern'
</script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
    <HexagonPattern :gap="20" :radius="40" :x="-1" :y="-1" />
  </div>
</template>
