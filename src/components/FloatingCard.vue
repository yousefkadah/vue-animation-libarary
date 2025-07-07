<template>
  <div 
    ref="cardElement"
    :class="['floating-card', { 'floating-card--hovering': isHovering }]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    :style="cardStyle"
  >
    <div class="floating-card__glow" :style="glowStyle"></div>
    <div class="floating-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  glowColor?: string
  floatIntensity?: number
  rotateIntensity?: number
  glowIntensity?: number
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: '#42b883',
  floatIntensity: 10,
  rotateIntensity: 5,
  glowIntensity: 0.3
})

const cardElement = ref<HTMLElement>()
const isHovering = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const cardRect = ref({ width: 0, height: 0, left: 0, top: 0 })

const cardStyle = computed(() => {
  if (!isHovering.value) return {}
  
  const centerX = cardRect.value.width / 2
  const centerY = cardRect.value.height / 2
  
  const rotateX = ((mouseY.value - centerY) / centerY) * props.rotateIntensity
  const rotateY = ((mouseX.value - centerX) / centerX) * props.rotateIntensity
  
  return {
    transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(${props.floatIntensity}px)`
  }
})

const glowStyle = computed(() => {
  if (!isHovering.value) return { opacity: 0 }
  
  const centerX = cardRect.value.width / 2
  const centerY = cardRect.value.height / 2
  
  const glowX = ((mouseX.value - centerX) / centerX) * 20
  const glowY = ((mouseY.value - centerY) / centerY) * 20
  
  return {
    opacity: props.glowIntensity,
    transform: `translate(${glowX}px, ${glowY}px)`,
    background: `radial-gradient(circle at ${mouseX.value}px ${mouseY.value}px, ${props.glowColor}, transparent 70%)`
  }
})

const onMouseEnter = () => {
  isHovering.value = true
  updateCardRect()
}

const onMouseLeave = () => {
  isHovering.value = false
}

const onMouseMove = (event: MouseEvent) => {
  if (!cardElement.value) return
  
  const rect = cardElement.value.getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
}

const updateCardRect = () => {
  if (!cardElement.value) return
  
  const rect = cardElement.value.getBoundingClientRect()
  cardRect.value = {
    width: rect.width,
    height: rect.height,
    left: rect.left,
    top: rect.top
  }
}

onMounted(() => {
  updateCardRect()
})
</script>

<style scoped>
.floating-card {
  position: relative;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.floating-card__glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  transition: all 0.3s ease;
  pointer-events: none;
}

.floating-card__content {
  position: relative;
  z-index: 2;
  padding: 24px;
}

.floating-card--hovering {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.floating-card:hover {
  transform: translateY(-5px);
}
</style>
