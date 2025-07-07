<template>
  <span 
    class="gradient-text"
    :style="{ 
      backgroundImage: gradientStyle,
      animationDuration: `${animationDuration}s`,
      backgroundSize: animated ? '200% 100%' : '100% 100%'
    }"
    :class="{ 'gradient-text--animated': animated }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  colors?: string[]
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  animated?: boolean
  animationDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['#42b883', '#369870'],
  direction: 'horizontal',
  animated: false,
  animationDuration: 3
})

const gradientStyle = computed(() => {
  const colorStops = props.colors.join(', ')
  
  switch (props.direction) {
    case 'vertical':
      return `linear-gradient(to bottom, ${colorStops})`
    case 'diagonal':
      return `linear-gradient(135deg, ${colorStops})`
    default:
      return `linear-gradient(to right, ${colorStops})`
  }
})
</script>

<style scoped>
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
  display: inline-block;
  font-weight: bold;
}

.gradient-text--animated {
  animation: gradient-shift infinite linear;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
</style>
