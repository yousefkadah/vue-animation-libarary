<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar'

const value = ref(0)
let interval: ReturnType<typeof setInterval> | undefined

const next = (previous: number) => (previous === 100 ? 0 : previous + 10)

onMounted(() => {
  value.value = next(value.value)
  interval = setInterval(() => {
    value.value = next(value.value)
  }, 2000)
})

onBeforeUnmount(() => clearInterval(interval))
</script>

<template>
  <!-- The track colour switches with the theme through a CSS variable. -->
  <AnimatedCircularProgressBar
    :value="value"
    gauge-primary-color="rgb(79 70 229)"
    gauge-secondary-color="var(--track)"
    class="[--track:rgba(0,0,0,0.1)] dark:[--track:rgba(255,255,255,0.1)]"
  />
</template>
