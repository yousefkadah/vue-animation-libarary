var e=`<script setup lang="ts">
import { Ripple } from '@/components/ui/ripple'
<\/script>

<template>
  <div class="relative flex h-[400px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border bg-background">
    <div class="relative size-24">
      <Ripple :main-circle-size="130" :main-circle-opacity="0.2" :num-circles="6" class="[mask-image:none]" />
      <img
        src="https://avatar.vercel.sh/jane"
        alt="Jane Cooper"
        width="96"
        height="96"
        class="relative z-10 size-24 rounded-full border-4 border-background shadow-lg"
      />
    </div>
    <div class="z-10 text-center">
      <p class="text-lg font-semibold">Jane Cooper</p>
      <p class="text-sm text-muted-foreground">Calling…</p>
    </div>
  </div>
</template>
`;export{e as default};