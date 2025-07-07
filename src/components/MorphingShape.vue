<template>
  <div class="morphing-shape" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <path 
        :d="currentPath" 
        :fill="color"
        :style="{ animationDuration: `${duration}s` }"
        class="morphing-path"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  size?: number
  color?: string
  duration?: number
  shapes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  color: '#42b883',
  duration: 3,
  shapes: () => [
    'M50,10 L90,50 L50,90 L10,50 Z', // Diamond
    'M50,5 C80,5 95,20 95,50 C95,80 80,95 50,95 C20,95 5,80 5,50 C5,20 20,5 50,5 Z', // Circle
    'M10,10 L90,10 L90,90 L10,90 Z', // Square
    'M50,10 L85,35 L75,85 L25,85 L15,35 Z' // Pentagon
  ]
})

const currentPath = ref('')
let intervalId: number | null = null
let currentShapeIndex = 0

const morphToNextShape = () => {
  currentPath.value = props.shapes[currentShapeIndex]
  currentShapeIndex = (currentShapeIndex + 1) % props.shapes.length
}

onMounted(() => {
  morphToNextShape()
  intervalId = setInterval(morphToNextShape, props.duration * 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.morphing-shape {
  display: inline-block;
}

.morphing-path {
  transition: d 0.8s ease-in-out;
}
</style>
