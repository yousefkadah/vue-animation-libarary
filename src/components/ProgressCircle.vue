<template>
  <div class="progress-circle" :style="{ width: size + 'px', height: size + 'px' }">
    <svg
      class="progress-ring"
      :width="size"
      :height="size"
      viewBox="0 0 120 120"
    >
      <!-- Background circle -->
      <circle
        class="progress-ring-background"
        cx="60"
        cy="60"
        :r="radius"
        fill="transparent"
        :stroke="backgroundColor"
        :stroke-width="strokeWidth"
      />
      
      <!-- Progress circle -->
      <circle
        class="progress-ring-progress"
        cx="60"
        cy="60"
        :r="radius"
        fill="transparent"
        :stroke="color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        stroke-linecap="round"
        :style="{ 
          transition: animated ? 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          filter: glowEffect ? `drop-shadow(0 0 8px ${color})` : 'none'
        }"
      />
      
      <!-- Glow effect -->
      <circle
        v-if="glowEffect"
        class="progress-ring-glow"
        cx="60"
        cy="60"
        :r="radius"
        fill="transparent"
        :stroke="color"
        :stroke-width="strokeWidth / 2"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        stroke-linecap="round"
        opacity="0.5"
        :style="{ 
          transition: animated ? 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          filter: `blur(4px)`
        }"
      />
    </svg>
    
    <!-- Center content -->
    <div class="progress-content">
      <slot>
        <span class="progress-text" v-if="showText">
          {{ displayValue }}{{ suffix }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

interface Props {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  animated?: boolean
  showText?: boolean
  suffix?: string
  glowEffect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  size: 120,
  strokeWidth: 8,
  color: '#3b82f6',
  backgroundColor: '#e5e7eb',
  animated: true,
  showText: true,
  suffix: '%',
  glowEffect: false
})

const animatedValue = ref(0)
const radius = computed(() => (120 - props.strokeWidth) / 2)
const circumference = computed(() => radius.value * 2 * Math.PI)

const strokeDashoffset = computed(() => {
  const normalizedValue = Math.min(Math.max(animatedValue.value, 0), props.max)
  const progress = normalizedValue / props.max
  return circumference.value - progress * circumference.value
})

const displayValue = computed(() => {
  if (props.suffix === '%') {
    return Math.round((animatedValue.value / props.max) * 100)
  }
  return Math.round(animatedValue.value)
})

// Animate the value
const animateToValue = (targetValue: number) => {
  if (!props.animated) {
    animatedValue.value = targetValue
    return
  }

  const startValue = animatedValue.value
  const duration = 1000 // 1 second
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Ease out cubic function
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    
    animatedValue.value = startValue + (targetValue - startValue) * easeProgress
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

watch(() => props.value, (newValue) => {
  animateToValue(newValue)
}, { immediate: false })

onMounted(() => {
  // Start animation from 0 to the initial value
  setTimeout(() => {
    animateToValue(props.value)
  }, 100)
})
</script>

<style scoped>
.progress-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
  overflow: visible;
}

.progress-ring-background {
  opacity: 0.3;
}

.progress-ring-progress {
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-content {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
}

.progress-text {
  font-size: 1.25rem;
  font-weight: 700;
}

/* Responsive sizing */
@media (max-width: 640px) {
  .progress-content {
    font-size: 1.25rem;
  }
  
  .progress-text {
    font-size: 1rem;
  }
}
</style>