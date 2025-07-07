<template>
  <div 
    ref="containerRef"
    class="particle-effect"
    :style="{ width: `${width}px`, height: `${height}px` }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        width: particle.size + 'px',
        height: particle.size + 'px',
        backgroundColor: particle.color,
        opacity: particle.opacity,
        transform: `translate(${particle.moveX}px, ${particle.moveY}px)`
      }"
    ></div>
    <div class="particle-effect__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  width?: number
  height?: number
  particleCount?: number
  colors?: string[]
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 300,
  height: 200,
  particleCount: 50,
  colors: () => ['#42b883', '#369870', '#2a9d8f', '#264653'],
  interactive: true
})

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  moveX: number
  moveY: number
  speedX: number
  speedY: number
}

const containerRef = ref<HTMLElement>()
const particles = ref<Particle[]>([])
let animationId: number | null = null

const createParticle = (id: number): Particle => ({
  id,
  x: Math.random() * props.width,
  y: Math.random() * props.height,
  size: Math.random() * 3 + 1,
  color: props.colors[Math.floor(Math.random() * props.colors.length)],
  opacity: Math.random() * 0.5 + 0.3,
  moveX: 0,
  moveY: 0,
  speedX: (Math.random() - 0.5) * 0.5,
  speedY: (Math.random() - 0.5) * 0.5
})

const initParticles = () => {
  particles.value = Array.from({ length: props.particleCount }, (_, i) => createParticle(i))
}

const updateParticles = () => {
  particles.value.forEach(particle => {
    particle.x += particle.speedX
    particle.y += particle.speedY
    
    if (particle.x < 0 || particle.x > props.width) particle.speedX *= -1
    if (particle.y < 0 || particle.y > props.height) particle.speedY *= -1
    
    particle.x = Math.max(0, Math.min(props.width, particle.x))
    particle.y = Math.max(0, Math.min(props.height, particle.y))
  })
}

const animate = () => {
  updateParticles()
  animationId = requestAnimationFrame(animate)
}

const onMouseEnter = () => {
  if (props.interactive) {
    particles.value.forEach(particle => {
      particle.moveX = (Math.random() - 0.5) * 20
      particle.moveY = (Math.random() - 0.5) * 20
    })
  }
}

const onMouseLeave = () => {
  if (props.interactive) {
    particles.value.forEach(particle => {
      particle.moveX = 0
      particle.moveY = 0
    })
  }
}

onMounted(() => {
  initParticles()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.particle-effect {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.particle {
  position: absolute;
  border-radius: 50%;
  transition: transform 0.3s ease, opacity 0.3s ease;
  pointer-events: none;
}

.particle-effect__content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
