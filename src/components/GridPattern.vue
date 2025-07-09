<template>
  <div class="grid-pattern" :style="gridStyles">
    <div class="grid-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number
  strokeWidth?: number
  className?: string
  fadeMask?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  strokeWidth: 1,
  className: '',
  fadeMask: true,
  animated: false
})

const gridStyles = computed(() => ({
  '--grid-size': `${props.size}px`,
  '--stroke-width': `${props.strokeWidth}px`,
  '--fade-mask': props.fadeMask ? 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)' : 'none',
  '--animation': props.animated ? 'grid-move 4s ease-in-out infinite alternate' : 'none'
}))
</script>

<style scoped>
.grid-pattern {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-color: #1a1a2e;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.3) var(--stroke-width), transparent var(--stroke-width)),
    linear-gradient(90deg, rgba(0, 255, 255, 0.3) var(--stroke-width), transparent var(--stroke-width));
  background-size: var(--grid-size) var(--grid-size);
  mask-image: var(--fade-mask);
  -webkit-mask-image: var(--fade-mask);
  animation: var(--animation);
}

@keyframes grid-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: var(--grid-size) var(--grid-size);
  }
}

.grid-content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 2rem;
}
</style>
