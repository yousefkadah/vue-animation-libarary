var e=`<script setup lang="ts">
import { SparklesText } from '@/components/ui/sparkles-text'
<\/script>

<template>
  <div class="flex flex-col items-center gap-3 text-center">
    <p class="text-sm font-medium tracking-wide text-muted-foreground uppercase">Limited release</p>
    <SparklesText as="h2" :sparkles-count="16" :colors="{ first: '#FBBF24', second: '#F97316' }" class="text-5xl sm:text-6xl">
      Golden Hour
    </SparklesText>
  </div>
</template>
`;export{e as default};