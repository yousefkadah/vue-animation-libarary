<template>
  <div class="aurora-container" :style="containerStyles">
    <div class="aurora-layer aurora-layer-1" :style="layerStyles"></div>
    <div class="aurora-layer aurora-layer-2" :style="layerStyles"></div>
    <div class="aurora-layer aurora-layer-3" :style="layerStyles"></div>
    <div class="aurora-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  invert?: boolean
  colors?: string[]
  duration?: number
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 800,
  invert: false,
  colors: () => ['#42b883', '#369870', '#2a9d8f'],
  duration: 8,
  opacity: 0.3
})

const containerStyles = computed(() => ({
  '--aurora-size': `${props.size}px`,
  '--aurora-duration': `${props.duration}s`,
  '--aurora-opacity': props.opacity.toString(),
  filter: props.invert ? 'invert(1)' : 'none'
}))

const layerStyles = computed(() => ({
  '--color-1': props.colors[0] || '#42b883',
  '--color-2': props.colors[1] || '#369870',
  '--color-3': props.colors[2] || '#2a9d8f'
}))
</script>

<style scoped>
.aurora-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  border-radius: 12px;
}

.aurora-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  filter: blur(40px);
  opacity: var(--aurora-opacity);
}

.aurora-layer-1 {
  background: radial-gradient(
    circle at 50% 50%,
    var(--color-1) 0%,
    transparent 50%
  );
  animation: aurora-drift var(--aurora-duration) ease-in-out infinite;
}

.aurora-layer-2 {
  background: radial-gradient(
    circle at 80% 20%,
    var(--color-2) 0%,
    transparent 50%
  );
  animation: aurora-drift var(--aurora-duration) ease-in-out infinite reverse;
  animation-delay: calc(var(--aurora-duration) * -0.3);
}

.aurora-layer-3 {
  background: radial-gradient(
    circle at 20% 80%,
    var(--color-3) 0%,
    transparent 50%
  );
  animation: aurora-drift var(--aurora-duration) ease-in-out infinite;
  animation-delay: calc(var(--aurora-duration) * -0.6);
}

.aurora-content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes aurora-drift {
  0%, 100% {
    transform: translateX(0) translateY(0) scale(1);
  }
  25% {
    transform: translateX(20px) translateY(-20px) scale(1.1);
  }
  50% {
    transform: translateX(-20px) translateY(20px) scale(0.9);
  }
  75% {
    transform: translateX(20px) translateY(20px) scale(1.05);
  }
}
</style>
