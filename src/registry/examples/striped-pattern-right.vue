<script setup lang="ts">
import { StripedPattern } from '@/components/ui/striped-pattern'
</script>

<template>
  <div class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
    <StripedPattern direction="right" class="text-muted-foreground" />
  </div>
</template>
