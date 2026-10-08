var e=`<script setup lang="ts">
import { WarpBackground } from '@/components/ui/warp-background'
<\/script>

<template>
  <WarpBackground
    :perspective="60"
    :beams-per-side="5"
    :beam-size="4"
    :beam-duration="2"
    class="rounded-2xl p-16"
  >
    <div class="flex flex-col items-center gap-1 rounded-full border bg-background/80 px-6 py-3 text-center backdrop-blur">
      <span class="text-sm font-semibold">Hyperdrive engaged</span>
      <span class="text-xs text-muted-foreground">More beams, a deeper tunnel, faster travel</span>
    </div>
  </WarpBackground>
</template>
`;export{e as default};