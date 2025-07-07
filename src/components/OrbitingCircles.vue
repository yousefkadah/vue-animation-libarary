<template>
  <div class="orbit-container" :style="containerStyles">
    <div class="orbit-center">
      <slot name="center" />
    </div>
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="orbit-item"
      :style="getItemStyles(index)"
    >
      <slot name="item" :item="item" :index="index">
        <div class="orbit-item-default">{{ item }}</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  items: any[]
  radius?: number
  duration?: number
  reverse?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  radius: 100,
  duration: 20,
  reverse: false,
  className: ''
})

const containerStyles = computed(() => ({
  '--orbit-radius': `${props.radius}px`,
  '--orbit-duration': `${props.duration}s`,
  '--orbit-direction': props.reverse ? 'reverse' : 'normal',
  width: `${props.radius * 2 + 100}px`,
  height: `${props.radius * 2 + 100}px`
}))

const getItemStyles = (index: number) => {
  const angle = (360 / props.items.length) * index
  const delay = (props.duration / props.items.length) * index
  
  return {
    '--angle': `${angle}deg`,
    '--delay': `${delay}s`,
    transform: `rotate(${angle}deg) translateX(${props.radius}px) rotate(-${angle}deg)`,
    animationDelay: `${delay}s`
  }
}
</script>

<style scoped>
.orbit-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.orbit-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  animation: orbit-rotate var(--orbit-duration) linear infinite;
  animation-direction: var(--orbit-direction);
}

.orbit-item-default {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  backdrop-filter: blur(10px);
}

@keyframes orbit-rotate {
  0% {
    transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
  }
}
</style>
