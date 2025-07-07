<template>
  <div class="number-ticker" :style="tickerStyles">
    <div class="number-display">
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <span 
        v-for="(digit, index) in displayDigits" 
        :key="`${index}-${digit.value}`"
        class="digit-container"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <span class="digit">{{ digit.value }}</span>
      </span>
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  value: number
  duration?: number
  className?: string
  decimalPlaces?: number
  prefix?: string
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  className: '',
  decimalPlaces: 0,
  prefix: '',
  suffix: ''
})

const currentValue = ref(0)
const animationId = ref<number | null>(null)

const displayDigits = computed(() => {
  const valueStr = currentValue.value.toFixed(props.decimalPlaces)
  return valueStr.split('').map((char, index) => ({
    value: char,
    index
  }))
})

const tickerStyles = computed(() => ({
  '--duration': `${props.duration}ms`
}))

const animateToValue = (targetValue: number) => {
  const startValue = currentValue.value
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    currentValue.value = startValue + (targetValue - startValue) * easeOutQuart
    
    if (progress < 1) {
      animationId.value = requestAnimationFrame(animate)
    } else {
      currentValue.value = targetValue
    }
  }
  
  animate()
}

onMounted(() => {
  animateToValue(props.value)
})

watch(() => props.value, (newValue) => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  animateToValue(newValue)
})
</script>

<style scoped>
.number-ticker {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.number-display {
  display: flex;
  align-items: center;
  justify-content: center;
}

.digit-container {
  display: inline-block;
  animation: digit-bounce 0.6s ease-out;
}

.digit {
  display: inline-block;
  min-width: 0.6em;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes digit-bounce {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  50% {
    transform: translateY(-5px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.prefix,
.suffix {
  font-weight: inherit;
  color: inherit;
}
</style>
