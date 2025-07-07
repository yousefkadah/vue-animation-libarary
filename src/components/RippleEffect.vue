<template>
  <div class="ripple-container" :style="containerStyles">
    <div 
      v-for="(ripple, index) in ripples" 
      :key="index"
      class="ripple-circle"
      :style="ripple.style"
    ></div>
    <div class="ripple-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  rippleColor?: string
  numRipples?: number
  rippleSize?: number
  duration?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  rippleColor: 'rgba(255, 255, 255, 0.2)',
  numRipples: 3,
  rippleSize: 300,
  duration: 2,
  delay: 0.5
})

interface Ripple {
  style: {
    width: string
    height: string
    border: string
    animationDelay: string
    animationDuration: string
  }
}

const ripples = ref<Ripple[]>([])

const containerStyles = computed(() => ({
  '--ripple-color': props.rippleColor,
  '--ripple-size': `${props.rippleSize}px`,
  '--duration': `${props.duration}s`
}))

const createRipples = () => {
  ripples.value = Array.from({ length: props.numRipples }, (_, i) => ({
    style: {
      width: `${props.rippleSize}px`,
      height: `${props.rippleSize}px`,
      border: `1px solid ${props.rippleColor}`,
      animationDelay: `${i * props.delay}s`,
      animationDuration: `${props.duration}s`
    }
  }))
}

onMounted(() => {
  createRipples()
})
</script>

<style scoped>
.ripple-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ripple-circle {
  position: absolute;
  border-radius: 50%;
  animation: ripple-expand var(--duration) ease-out infinite;
  opacity: 0;
}

.ripple-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

@keyframes ripple-expand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
