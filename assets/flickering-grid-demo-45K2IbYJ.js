var e=`<script setup lang="ts">
import { FlickeringGrid } from '@/components/ui/flickering-grid'
<\/script>

<template>
  <div class="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background">
    <FlickeringGrid
      class="absolute inset-0 z-0 size-full"
      :square-size="4"
      :grid-gap="6"
      color="#6B7280"
      :max-opacity="0.5"
      :flicker-chance="0.1"
    />
  </div>
</template>
`;export{e as default};