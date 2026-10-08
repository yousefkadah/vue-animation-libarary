var e=`<script setup lang="ts">
import { NoiseTexture } from '@/components/ui/noise-texture'
<\/script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <label for="noise-input-demo" class="text-sm font-medium text-muted-foreground">Search with texture</label>
    <div class="relative overflow-hidden rounded-lg border bg-muted/30">
      <NoiseTexture :noise-opacity="0.45" />
      <input
        id="noise-input-demo"
        type="search"
        placeholder="Try typing…"
        class="relative z-10 h-10 w-full bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
    </div>
  </div>
</template>
`;export{e as default};