<template>
  <div 
    ref="containerRef"
    class="meteors-container"
    :style="{ 
      height: `${height}px`, 
      width: `${width}px`,
      position: 'relative',
      overflow: 'hidden'
    }"
  >
    <div 
      v-for="meteor in meteors" 
      :key="meteor.id"
      class="meteor"
      :style="{
        left: meteor.left + 'px',
        top: meteor.top + 'px',
        animationDelay: meteor.delay + 's',
        animationDuration: meteor.duration + 's',
        '--meteor-color': meteor.color
      }"
    >
      <div class="meteor-tail"></div>
      <div class="meteor-head"></div>
    </div>
    <div class="meteors-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  number?: number
  width?: number
  height?: number
  colors?: string[]
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  number: 30,
  width: 800,
  height: 400,
  colors: () => ['#42b883', '#369870', '#2a9d8f', '#fbbf24'],
  speed: 1
})

interface Meteor {
  id: number
  left: number
  top: number
  delay: number
  duration: number
  color: string
}

const containerRef = ref<HTMLElement>()
const meteors = ref<Meteor[]>([])

const createMeteors = () => {
  meteors.value = Array.from({ length: props.number }, (_, i) => ({
    id: i,
    left: Math.random() * (props.width + 200) - 50,
    top: Math.random() * (props.height + 200) - 100,
    delay: Math.random() * 6,
    duration: Math.random() * 3 + 4,
    color: props.colors[Math.floor(Math.random() * props.colors.length)]
  }))
}

onMounted(() => {
  createMeteors()
})
</script>

<style scoped>
.meteors-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.meteor {
  position: absolute;
  animation: meteor infinite linear;
  pointer-events: none;
  transform: rotate(-45deg);
}

.meteor-head {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: var(--meteor-color);
  box-shadow: 0 0 4px var(--meteor-color);
  position: relative;
  z-index: 2;
}

.meteor-tail {
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--meteor-color));
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  opacity: 0.7;
}

.meteors-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes meteor {
  0% {
    transform: rotate(-45deg) translateX(0) translateY(0);
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  97% {
    opacity: 1;
  }
  100% {
    transform: rotate(-45deg) translateX(-300px) translateY(300px);
    opacity: 0;
  }
}
</style>
