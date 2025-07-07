<template>
  <div class="retro-grid" :style="gridStyles">
    <div class="retro-grid-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  strokeWidth?: number
  perspective?: number
  rotateX?: number
  color?: string
  opacity?: number
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 100,
  strokeWidth: 2,
  perspective: 1000,
  rotateX: 45,
  color: '#00D4FF',
  opacity: 0.3,
  animated: true
})

const gridStyles = computed(() => ({
  '--grid-size': `${props.size}px`,
  '--stroke-width': `${props.strokeWidth}px`,
  '--perspective': `${props.perspective}px`,
  '--rotate-x': `${props.rotateX}deg`,
  '--grid-color': props.color,
  '--grid-opacity': props.opacity.toString()
}))
</script>

<style scoped>
.retro-grid {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: var(--perspective);
  overflow: hidden;
}

.retro-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(
      var(--grid-color) var(--stroke-width), 
      transparent var(--stroke-width)
    ),
    linear-gradient(
      90deg,
      var(--grid-color) var(--stroke-width), 
      transparent var(--stroke-width)
    );
  background-size: var(--grid-size) var(--grid-size);
  transform: rotateX(var(--rotate-x)) translateZ(-100px);
  opacity: var(--grid-opacity);
  animation: retro-grid-move 20s linear infinite;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
}

.retro-grid-content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes retro-grid-move {
  0% {
    transform: rotateX(var(--rotate-x)) translateZ(-100px) translateY(0);
  }
  100% {
    transform: rotateX(var(--rotate-x)) translateZ(-100px) translateY(var(--grid-size));
  }
}
</style>
