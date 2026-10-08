<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { SpinningText } from '@/components/ui/spinning-text'
</script>

<template>
  <a
    href="#"
    class="group relative flex size-36 items-center justify-center rounded-full border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent"
    @click.prevent
  >
    <SpinningText
      text="get in touch • get in touch •"
      :duration="14"
      :radius="8"
      class="absolute inset-0 text-xs font-semibold tracking-[0.2em] uppercase"
    />
    <span class="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
      <ArrowUpRight class="size-5" />
    </span>
  </a>
</template>
