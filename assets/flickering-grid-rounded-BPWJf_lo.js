var e=`<script setup lang="ts">
import { FlickeringGrid } from '@/components/ui/flickering-grid'
<\/script>

<template>
  <div class="relative h-[400px] w-full overflow-hidden rounded-lg border bg-background">
    <FlickeringGrid
      class="absolute inset-0 z-0 size-full [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
      :square-size="4"
      :grid-gap="6"
      color="#60A5FA"
      :max-opacity="0.5"
      :flicker-chance="0.1"
    />
  </div>
</template>
`;export{e as default};