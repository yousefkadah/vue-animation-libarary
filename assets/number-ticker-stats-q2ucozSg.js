var e=`<script setup lang="ts">
import { NumberTicker } from '@/components/ui/number-ticker'

const stats = [
  { label: 'Downloads', value: 1284503, prefix: '', suffix: '' },
  { label: 'Uptime', value: 99.98, decimalPlaces: 2, prefix: '', suffix: '%' },
  { label: 'Revenue', value: 48250.5, decimalPlaces: 2, prefix: '', suffix: ' €', locale: 'de-DE' },
]
<\/script>

<template>
  <div class="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
    <div v-for="(stat, index) in stats" :key="stat.label" class="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
      <p class="mt-1 text-3xl font-semibold tracking-tight">
        {{ stat.prefix }}<NumberTicker
          :value="stat.value"
          :decimal-places="stat.decimalPlaces ?? 0"
          :locale="stat.locale"
          :delay="index * 0.15"
          class="tracking-tight"
        />{{ stat.suffix }}
      </p>
    </div>
    <div class="rounded-xl border border-dashed p-5 sm:col-span-3">
      <p class="text-sm text-muted-foreground">Seats left — counts down</p>
      <NumberTicker :value="250" :start-value="12" direction="down" class="mt-1 text-3xl font-semibold tracking-tight" />
    </div>
  </div>
</template>
`;export{e as default};