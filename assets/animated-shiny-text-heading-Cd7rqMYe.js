var e=`<script setup lang="ts">
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
<\/script>

<template>
  <div class="flex flex-col items-center gap-3 text-center">
    <AnimatedShinyText :shimmer-width="240" class="text-4xl font-bold tracking-tight sm:text-5xl">
      Shimmering headline
    </AnimatedShinyText>
    <p class="max-w-sm text-balance text-sm text-muted-foreground">
      A wider <code class="font-mono text-foreground">shimmer-width</code> gives big type a broader glare.
    </p>
  </div>
</template>
`;export{e as default};