<template>
  <div 
    ref="containerRef"
    class="spotlight-container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="spotlight-effect"
      :style="spotlightStyles"
    ></div>
    <div class="spotlight-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  color?: string
  size?: number
  intensity?: number
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: '#3b82f6',
  size: 300,
  intensity: 0.4,
  speed: 0.3
})

const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const containerRef = ref<HTMLElement>()

const spotlightStyles = computed(() => {
  const opacity = isHovering.value ? props.intensity : 0
  const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0')
  
  return {
    background: `radial-gradient(${props.size}px circle at ${mouseX.value}px ${mouseY.value}px, 
      ${props.color}${opacityHex} 0%, 
      transparent 70%)`,
    transition: `opacity ${props.speed}s cubic-bezier(0.4, 0, 0.2, 1)`,
    opacity: isHovering.value ? 1 : 0
  }
})

const handleMouseMove = (event: MouseEvent) => {
  if (!containerRef.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}
</script>

<style scoped>
.spotlight-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.spotlight-container:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.spotlight-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.spotlight-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
  color: white;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .spotlight-container {
    background: rgba(15, 23, 42, 0.98);
  }
}

/* Light mode styles */
@media (prefers-color-scheme: light) {
  .spotlight-container {
    background: rgba(248, 250, 252, 0.95);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .spotlight-container:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
  
  .spotlight-content {
    color: #1e293b;
  }
}
</style>