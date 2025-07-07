<template>
  <span 
    ref="textElement"
    class="sparkle-text"
    :style="{ color: textColor }"
    @mouseenter="startSparkle"
    @mouseleave="stopSparkle"
  >
    <span class="sparkle-text__content">
      <slot />
    </span>
    <span 
      v-for="(sparkle, index) in sparkles" 
      :key="index"
      class="sparkle"
      :style="{
        left: sparkle.x + 'px',
        top: sparkle.y + 'px',
        fontSize: sparkle.size + 'px',
        animationDelay: sparkle.delay + 'ms',
        color: sparkle.color
      }"
    >
      ✨
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  textColor?: string
  sparkleColors?: string[]
  sparkleCount?: number
  autoSparkle?: boolean
  sparkleInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  textColor: '#000',
  sparkleColors: () => ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'],
  sparkleCount: 8,
  autoSparkle: false,
  sparkleInterval: 2000
})

interface Sparkle {
  x: number
  y: number
  size: number
  delay: number
  color: string
}

const textElement = ref<HTMLElement>()
const sparkles = ref<Sparkle[]>([])
let sparkleTimer: number | null = null

const createSparkle = (): Sparkle => {
  const rect = textElement.value?.getBoundingClientRect()
  if (!rect) return { x: 0, y: 0, size: 12, delay: 0, color: '#ffd700' }
  
  return {
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    size: Math.random() * 8 + 8,
    delay: Math.random() * 500,
    color: props.sparkleColors[Math.floor(Math.random() * props.sparkleColors.length)]
  }
}

const startSparkle = () => {
  sparkles.value = Array.from({ length: props.sparkleCount }, createSparkle)
  setTimeout(() => {
    sparkles.value = []
  }, 1000)
}

const stopSparkle = () => {
  sparkles.value = []
}

onMounted(() => {
  if (props.autoSparkle) {
    const autoSparkleInterval = setInterval(() => {
      startSparkle()
    }, props.sparkleInterval)
    
    sparkleTimer = autoSparkleInterval
  }
})

onUnmounted(() => {
  if (sparkleTimer) {
    clearInterval(sparkleTimer)
  }
})
</script>

<style scoped>
.sparkle-text {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sparkle-text:hover {
  transform: scale(1.05);
}

.sparkle-text__content {
  position: relative;
  z-index: 1;
}

.sparkle {
  position: absolute;
  pointer-events: none;
  animation: sparkle-animation 1s ease-out forwards;
  z-index: 2;
}

@keyframes sparkle-animation {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
}
</style>
