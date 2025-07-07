<template>
  <div class="border-beam" :style="containerStyles">
    <div class="border-beam-inner" :style="innerStyles">
      <slot />
    </div>
    <div 
      class="border-beam-gradient" 
      :style="gradientStyles"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  duration?: number
  anchor?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  duration: 15,
  anchor: 90,
  borderWidth: 1.5,
  colorFrom: '#ffaa40',
  colorTo: '#9c40ff',
  delay: 0
})

const containerStyles = computed(() => ({
  '--border-width': `${props.borderWidth}px`,
  '--duration': `${props.duration}s`,
  '--anchor': `${props.anchor}%`,
  '--delay': `${props.delay}s`
}))

const innerStyles = computed(() => ({
  borderWidth: `${props.borderWidth}px`
}))

const gradientStyles = computed(() => ({
  background: `conic-gradient(from 0deg, transparent, ${props.colorFrom}, ${props.colorTo}, transparent)`,
  width: `${props.size}px`,
  height: `${props.size}px`,
  animationDelay: `${props.delay}s`
}))
</script>

<style scoped>
.border-beam {
  position: relative;
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
}

.border-beam-inner {
  position: relative;
  z-index: 10;
  border-radius: 12px;
  border: solid transparent;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
}

.border-beam-gradient {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: border-beam-spin var(--duration) linear infinite;
  animation-delay: var(--delay);
  opacity: 0.8;
  filter: blur(1px);
}

@keyframes border-beam-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.border-beam::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: var(--border-width);
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
}
</style>
