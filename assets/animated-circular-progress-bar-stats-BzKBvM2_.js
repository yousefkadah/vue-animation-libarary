var e=`<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar'

const stats = [
  { label: 'CPU', value: 72, color: '#f43f5e' },
  { label: 'Memory', value: 4.6, max: 8, color: '#f59e0b' },
  { label: 'Disk', value: 31, color: '#0ea5e9' },
]

// Start empty, then fill once mounted so the arcs animate in.
const ready = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined
onMounted(() => {
  timeout = setTimeout(() => {
    ready.value = true
  }, 150)
})
onBeforeUnmount(() => clearTimeout(timeout))
<\/script>

<template>
  <div class="grid grid-cols-3 gap-6 [--track:rgba(0,0,0,0.08)] dark:[--track:rgba(255,255,255,0.12)]">
    <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center gap-2">
      <AnimatedCircularProgressBar
        :value="ready ? stat.value : 0"
        :max="stat.max"
        :gauge-primary-color="stat.color"
        gauge-secondary-color="var(--track)"
        class="size-24 text-lg"
      />
      <span class="text-sm text-muted-foreground">{{ stat.label }}</span>
    </div>
  </div>
</template>
`;export{e as default};