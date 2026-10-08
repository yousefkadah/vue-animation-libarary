var e=`<script setup lang="ts">
import { HyperText } from '@/components/ui/hyper-text'

const stats = [
  { label: 'Uptime', value: '99.99%' },
  { label: 'Regions', value: '32' },
  { label: 'Latency', value: '14 ms' },
]
<\/script>

<template>
  <div class="grid w-full max-w-md grid-cols-3 gap-3">
    <div v-for="(stat, index) in stats" :key="stat.label" class="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
      <p class="text-xs font-medium text-muted-foreground">{{ stat.label }}</p>
      <HyperText
        :text="stat.value"
        start-on-view
        :delay="index * 200"
        :character-set="'0123456789'.split('')"
        class="py-1 text-xl sm:text-2xl"
      />
    </div>
  </div>
</template>
`;export{e as default};