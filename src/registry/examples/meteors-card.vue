<script setup lang="ts">
import { Meteors } from '@/components/ui/meteors'
</script>

<template>
  <div class="relative w-full max-w-sm overflow-hidden rounded-2xl border bg-zinc-950 p-8 text-white shadow-xl">
    <Meteors :number="12" :angle="200" :min-duration="3" :max-duration="8" class="bg-sky-300 [&>span]:from-sky-300" />
    <div class="relative">
      <div class="mb-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-5" aria-hidden="true">
          <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636" stroke-linecap="round" />
        </svg>
      </div>
      <h3 class="text-xl font-bold">Meteors because they're cool</h3>
      <p class="mt-2 text-sm text-zinc-400">
        A quiet shower of light behind your content. Fewer meteors, a shallower angle and a tinted tail make a calm card
        background.
      </p>
      <button class="mt-6 rounded-lg border border-white/20 px-4 py-1.5 text-sm text-zinc-200 hover:bg-white/10">Explore</button>
    </div>
  </div>
</template>
