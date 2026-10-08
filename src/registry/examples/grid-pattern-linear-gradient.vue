<script setup lang="ts">
import { GridPattern } from '@/components/ui/grid-pattern'
</script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
    <GridPattern
      :width="20"
      :height="20"
      :x="-1"
      :y="-1"
      class="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
    />
  </div>
</template>
