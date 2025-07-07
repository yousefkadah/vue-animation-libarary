<template>
  <div class="glow-card" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="glow-card__glow" :style="{ boxShadow: glowShadow }"></div>
    <div class="glow-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  glowColor?: string
  glowIntensity?: number
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: '#42b883',
  glowIntensity: 0.5
})

const isHovered = ref(false)

const glowShadow = computed(() => {
  if (!isHovered.value) return 'none'
  const alpha = Math.floor(props.glowIntensity * 128).toString(16).padStart(2, '0')
  return `0 0 20px 5px ${props.glowColor}${alpha}, 0 0 40px 10px ${props.glowColor}${Math.floor(props.glowIntensity * 64).toString(16).padStart(2, '0')}`
})

const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.glow-card {
  position: relative;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e4e4e7;
  transition: all 0.3s ease;
  overflow: hidden;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glow-card:hover {
  border-color: transparent;
}

.glow-card__glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: inherit;
  transition: box-shadow 0.3s ease;
  pointer-events: none;
}

.glow-card__content {
  position: relative;
  z-index: 2;
  padding: 20px;
  text-align: center;
  color: #09090b;
  font-weight: 500;
}
</style>
