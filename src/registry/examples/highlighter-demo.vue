<script setup lang="ts">
import { Highlighter } from '@/components/ui/highlighter'
</script>

<template>
  <div class="text-center">
    <p class="leading-relaxed">
      The
      <Highlighter action="underline" color="#FF9800">Magic UI Highlighter</Highlighter>
      makes important
      <Highlighter action="highlight" color="#87CEFA" class="dark:text-black">text stand out</Highlighter>
      effortlessly.
    </p>
  </div>
</template>
