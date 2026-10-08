<script setup lang="ts">
import { GlareHover } from '@/components/ui/glare-hover'
</script>

<template>
  <GlareHover class="w-full max-w-md rounded-xl" background="transparent" color="#505050" :duration="700">
    <div class="flex w-full flex-col gap-6 rounded-xl border bg-card py-6 text-center text-card-foreground shadow-sm">
      <div class="space-y-2 px-6">
        <p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">14-day free trial · No card required</p>
        <h3 class="text-2xl font-semibold tracking-tight">Ready to get started?</h3>
        <p class="mx-auto max-w-sm text-sm text-muted-foreground">
          Join 4,000+ teams already using our platform to ship faster.
        </p>
      </div>
      <div class="flex justify-center gap-2 px-6">
        <button class="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Start free trial
        </button>
        <button class="h-9 rounded-md border bg-background px-4 text-sm font-medium hover:bg-accent">View demo</button>
      </div>
    </div>
  </GlareHover>
</template>
