<script setup lang="ts">
import { DotPattern } from '@/components/ui/dot-pattern'
</script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
    <DotPattern
      :width="20"
      :height="20"
      :cx="1"
      :cy="1"
      :cr="1"
      class="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
    />
  </div>
</template>
