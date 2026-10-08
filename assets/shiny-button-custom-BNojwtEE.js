var e=`<script setup lang="ts">
import { ShinyButton } from '@/components/ui/shiny-button'
<\/script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <ShinyButton class="rounded-full px-8">Rounded</ShinyButton>
    <!-- The shine is drawn with --primary, so a scoped override tints it. -->
    <ShinyButton class="border-violet-500/30 bg-violet-500/5 [--primary:#8b5cf6]">Violet shine</ShinyButton>
  </div>
</template>
`;export{e as default};