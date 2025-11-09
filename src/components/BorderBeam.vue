<template>
  <div class="border-beam-wrapper" :style="wrapperStyles">
    <div class="border-beam-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
  borderRadius?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  duration: 8,
  borderWidth: 2,
  colorFrom: '#3b82f6',
  colorTo: '#8b5cf6',
  delay: 0,
  borderRadius: 12
})

const wrapperStyles = computed(() => ({
  '--border-radius': `${props.borderRadius}px`,
  '--border-width': `${props.borderWidth}px`,
  '--duration': `${props.duration}s`,
  '--delay': `${props.delay}s`,
  '--color-from': props.colorFrom,
  '--color-to': props.colorTo,
  '--beam-length': '30%'
}))
</script>

<style scoped>
.border-beam-wrapper {
  position: relative;
  border-radius: var(--border-radius);
  background: transparent;
  padding: var(--border-width);
  overflow: hidden;
}

.border-beam-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--border-radius);
  background: 
    linear-gradient(90deg, 
      transparent, 
      transparent 40%, 
      var(--color-from) 45%, 
      var(--color-to) 55%, 
      transparent 60%, 
      transparent
    );
  background-size: 300% 100%;
  background-position: -100% 0;
  animation: border-beam-horizontal var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  z-index: 1;
}

.border-beam-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--border-radius);
  background: 
    linear-gradient(0deg, 
      transparent, 
      transparent 40%, 
      var(--color-from) 45%, 
      var(--color-to) 55%, 
      transparent 60%, 
      transparent
    );
  background-size: 100% 300%;
  background-position: 0 -100%;
  animation: border-beam-vertical calc(var(--duration) * 1.2) ease-in-out infinite;
  animation-delay: calc(var(--delay) + var(--duration) * 0.25);
  z-index: 1;
}

.border-beam-content {
  position: relative;
  z-index: 2;
  background: inherit;
  border-radius: calc(var(--border-radius) - var(--border-width));
  width: 100%;
  height: 100%;
}

@keyframes border-beam-horizontal {
  0%, 20% {
    background-position: -100% 0;
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
  30% {
    background-position: 0% 0;
  }
  70% {
    background-position: 100% 0;
  }
  80%, 100% {
    background-position: 200% 0;
    opacity: 0;
  }
}

@keyframes border-beam-vertical {
  0%, 20% {
    background-position: 0 -100%;
    opacity: 0;
  }
  25%, 75% {
    opacity: 1;
  }
  30% {
    background-position: 0 0%;
  }
  70% {
    background-position: 0 100%;
  }
  80%, 100% {
    background-position: 0 200%;
    opacity: 0;
  }
}
</style>
