var e=`<script setup lang="ts">
import { Check } from '@lucide/vue'
import { GlareHover } from '@/components/ui/glare-hover'

const features = ['Unlimited projects', 'Team collaboration', 'Advanced analytics']
<\/script>

<template>
  <GlareHover class="rounded-xl" background="transparent" color="#a78bfa" :opacity="0.4" :duration="600">
    <div class="flex w-[340px] flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm">
      <div class="space-y-1.5 px-6">
        <div class="flex items-center justify-between">
          <h3 class="leading-none font-semibold">Pro</h3>
          <span class="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">Popular</span>
        </div>
        <p class="text-sm text-muted-foreground">For teams that need more.</p>
        <div class="flex items-baseline gap-1 pt-2">
          <span class="text-4xl font-semibold tracking-tight">$49</span>
          <span class="text-sm text-muted-foreground">/mo</span>
        </div>
      </div>
      <ul class="flex flex-col gap-2.5 px-6">
        <li v-for="feature in features" :key="feature" class="flex items-center gap-2 text-sm">
          <Check class="size-4" aria-hidden="true" />
          {{ feature }}
        </li>
        <li class="flex items-center gap-2 text-sm text-muted-foreground">
          <span class="mx-1.5 size-1 rounded-full bg-current opacity-40" aria-hidden="true" />
          SSO (coming soon)
        </li>
      </ul>
      <div class="px-6">
        <button class="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Get started
        </button>
      </div>
    </div>
  </GlareHover>
</template>
`;export{e as default};