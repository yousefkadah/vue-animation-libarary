var e=`<script setup lang="ts">
import { AuroraText } from '@/components/ui/aurora-text'
<\/script>

<template>
  <div class="flex flex-col items-center gap-4 text-center">
    <h2 class="text-4xl font-bold tracking-tighter sm:text-6xl">
      <AuroraText :colors="['#22c55e', '#14b8a6', '#06b6d4', '#a3e635']" :speed="2">Northern lights</AuroraText>
    </h2>
    <p class="max-w-sm text-balance text-muted-foreground">
      Pick your own palette with <code class="font-mono text-foreground">colors</code> and double the pace with
      <code class="font-mono text-foreground">speed</code>.
    </p>
  </div>
</template>
`;export{e as default};