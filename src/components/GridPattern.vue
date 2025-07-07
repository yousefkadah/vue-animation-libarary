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
  '--fade-mask': props.fadeMask ? 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)' : 'none'
}))
</script>

<style scoped>
.grid-pattern {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) var(--stroke-width), transparent var(--stroke-width)),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) var(--stroke-width), transparent var(--stroke-width));
  background-size: var(--grid-size) var(--grid-size);
  mask-image: var(--fade-mask);
  -webkit-mask-image: var(--fade-mask);
}

.grid-content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
}
</style>
