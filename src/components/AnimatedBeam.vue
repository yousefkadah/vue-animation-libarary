<template>
  <div class="animated-beam-container" :style="containerStyles">
    <svg 
      class="animated-beam-svg"
      :width="svgWidth"
      :height="svgHeight"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="startColor" stop-opacity="0" />
          <stop offset="50%" :stop-color="pathColor" stop-opacity="1" />
          <stop offset="100%" :stop-color="endColor" stop-opacity="0" />
        </linearGradient>
      </defs>
      
      <path 
        :d="pathData"
        stroke="url(#beam-gradient)"
        :stroke-width="strokeWidth"
        fill="none"
        stroke-linecap="round"
        class="animated-beam-path"
      />
    </svg>
    
    <div class="animated-beam-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  width?: number
  height?: number
  duration?: number
  pathColor?: string
  startColor?: string
  endColor?: string
  strokeWidth?: number
  delay?: number
  curvature?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 300,
  height: 100,
  duration: 3,
  pathColor: '#00D4FF',
  startColor: '#00D4FF',
  endColor: '#00D4FF',
  strokeWidth: 2,
  delay: 0,
  curvature: 0.5
})

const containerStyles = computed(() => ({
  '--duration': `${props.duration}s`,
  '--delay': `${props.delay}s`,
  width: `${props.width}px`,
  height: `${props.height}px`
}))

const svgWidth = computed(() => props.width)
const svgHeight = computed(() => props.height)

const pathData = computed(() => {
  const startX = 0
  const startY = 50
  const endX = 100
  const endY = 50
  const curvature = props.curvature * 50
  
  return `M ${startX} ${startY} Q 50 ${50 - curvature} ${endX} ${endY}`
})
</script>

<style scoped>
.animated-beam-container {
  position: relative;
  overflow: hidden;
}

.animated-beam-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.animated-beam-path {
  animation: beam-flow var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  stroke-dasharray: 20 80;
  stroke-dashoffset: 100;
}

.animated-beam-content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes beam-flow {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -100;
    opacity: 0;
  }
}
</style>
