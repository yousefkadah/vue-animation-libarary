<template>
  <span class="count-up">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  end?: number
  endValue?: number
  start?: number
  startValue?: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  start: 0,
  startValue: 0,
  duration: 2000,
  decimals: 0,
  separator: ',',
  prefix: '',
  suffix: ''
})

// Support both prop names for backward compatibility
const finalEndValue = computed(() => props.end ?? props.endValue ?? 100)
const finalStartValue = computed(() => props.start ?? props.startValue ?? 0)

const currentValue = ref(finalStartValue.value)
let animationId: number | null = null

const formatNumber = (value: number) => {
  const fixed = value.toFixed(props.decimals)
  const parts = fixed.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, props.separator)
  return fixed
}

const displayValue = computed(() => {
  return props.prefix + formatNumber(currentValue.value) + props.suffix
})

const countUp = () => {
  const start = Date.now()
  const startVal = finalStartValue.value
  const endVal = finalEndValue.value
  const duration = props.duration

  const animate = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    
    currentValue.value = startVal + (endVal - startVal) * progress
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate)
    }
  }
  
  animate()
}

onMounted(() => {
  countUp()
})

watch([finalEndValue, finalStartValue], () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  currentValue.value = finalStartValue.value
  countUp()
})
</script>

<style scoped>
.count-up {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
</style>
