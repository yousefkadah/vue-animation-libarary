<script setup lang="ts">
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
</script>

<template>
  <div class="relative h-[320px] w-full max-w-md overflow-hidden rounded-xl border">
    <div class="h-full overflow-y-auto">
      <div class="flex flex-col gap-2 p-4">
        <div
          v-for="index in 20"
          :key="index"
          class="flex h-20 w-full shrink-0 items-center justify-center rounded-xl border bg-card text-card-foreground"
        >
          {{ index - 1 }}
        </div>
      </div>
    </div>
    <ProgressiveBlur position="bottom" height="40%" />
  </div>
</template>
