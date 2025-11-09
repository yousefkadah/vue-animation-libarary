<template>
  <div class="loading-dots" :class="variant">
    <div 
      v-for="i in dotCount" 
      :key="i"
      class="dot"
      :style="getDotStyle(i)"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'bounce' | 'pulse' | 'wave' | 'elastic'
  color?: string
  size?: number
  dotCount?: number
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  color: '#3b82f6',
  size: 8,
  dotCount: 3,
  speed: 1
})

const getDotStyle = (index: number) => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: props.color,
  animationDelay: `${(index - 1) * 0.2 / props.speed}s`,
  animationDuration: `${1.4 / props.speed}s`
})
</script>

<style scoped>
.loading-dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.dot {
  border-radius: 50%;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
}

/* Default variant - simple fade */
.loading-dots.default .dot {
  animation-name: dotFade;
}

@keyframes dotFade {
  0%, 80%, 100% { 
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% { 
    opacity: 1;
    transform: scale(1);
  }
}

/* Bounce variant */
.loading-dots.bounce .dot {
  animation-name: dotBounce;
}

@keyframes dotBounce {
  0%, 80%, 100% { 
    transform: translateY(0) scale(0.8);
    opacity: 0.5;
  }
  40% { 
    transform: translateY(-10px) scale(1);
    opacity: 1;
  }
}

/* Pulse variant */
.loading-dots.pulse .dot {
  animation-name: dotPulse;
}

@keyframes dotPulse {
  0%, 100% { 
    transform: scale(0.6);
    opacity: 0.4;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Wave variant */
.loading-dots.wave .dot {
  animation-name: dotWave;
  transform-origin: center bottom;
}

@keyframes dotWave {
  0%, 100% { 
    transform: scaleY(0.4);
    opacity: 0.6;
  }
  50% { 
    transform: scaleY(1.4);
    opacity: 1;
  }
}

/* Elastic variant */
.loading-dots.elastic .dot {
  animation-name: dotElastic;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes dotElastic {
  0%, 70%, 100% { 
    transform: scale(0.6) rotate(0deg);
    opacity: 0.5;
  }
  35% { 
    transform: scale(1.3) rotate(180deg);
    opacity: 1;
  }
}

/* Responsive sizing */
@media (max-width: 640px) {
  .loading-dots {
    gap: 3px;
  }
}
</style>