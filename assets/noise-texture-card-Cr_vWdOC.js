var e=`<script setup lang="ts">
import { NoiseTexture } from '@/components/ui/noise-texture'
<\/script>

<template>
  <div class="relative w-full max-w-md overflow-hidden rounded-xl border bg-card/80 text-card-foreground shadow-sm">
    <NoiseTexture :noise-opacity="0.45" />
    <div class="relative z-10 space-y-1.5 p-6 pb-4">
      <h3 class="text-xl font-semibold">The weekly digest</h3>
      <p class="text-sm text-muted-foreground">
        One email on Sundays: new components, tips and changelog highlights. No spam, unsubscribe anytime.
      </p>
    </div>
    <form class="relative z-10 space-y-4 px-6 pb-6" @submit.prevent>
      <label class="grid gap-2 text-sm font-medium">
        Email
        <input
          type="email"
          autocomplete="email"
          placeholder="you@company.com"
          class="h-9 rounded-md border bg-background/60 px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </label>
      <button
        type="submit"
        class="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Subscribe
      </button>
    </form>
  </div>
</template>
`;export{e as default};