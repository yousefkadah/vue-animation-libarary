var e=`<script setup lang="ts">
import { Lens } from '@/components/ui/lens'
<\/script>

<template>
  <div class="relative flex w-full max-w-md flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground">
    <div class="px-6">
      <Lens :default-position="{ x: 260, y: 150 }">
        <img
          src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=1200&auto=format&fit=crop"
          alt="Camp destination"
          width="500"
          height="375"
          class="aspect-[4/3] w-full object-cover"
        />
      </Lens>
    </div>
    <div class="space-y-1.5 px-6">
      <h3 class="text-2xl leading-none font-semibold">Your next camp</h3>
      <p class="text-sm text-muted-foreground">See our latest and best camp destinations all across the five continents of the globe.</p>
    </div>
    <div class="flex items-center gap-4 px-6">
      <button type="button" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Let's go
      </button>
      <button type="button" class="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
        Another time
      </button>
    </div>
  </div>
</template>
`;export{e as default};