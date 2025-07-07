<template>
  <div class="marquee-container" :style="containerStyles">
    <div 
      class="marquee-content"
      :class="{ 'marquee-content--vertical': vertical }"
    >
      <div 
        v-for="n in repeatCount" 
        :key="n"
        class="marquee-item"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: any
  vertical?: boolean
  repeat?: number
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  reverse: false,
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
  speed: 50
})

const containerStyles = computed(() => ({
  '--marquee-speed': `${props.speed}s`,
  '--marquee-direction': props.reverse ? 'reverse' : 'normal',
  '--marquee-pause': props.pauseOnHover ? 'paused' : 'running'
}))

const repeatCount = computed(() => Math.max(2, props.repeat))
</script>

<style scoped>
.marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 1rem;
}

.marquee-content {
  display: flex;
  min-width: 100%;
  animation: marquee-scroll var(--marquee-speed) linear infinite;
  animation-direction: var(--marquee-direction);
}

.marquee-content--vertical {
  flex-direction: column;
}

.marquee-container:hover .marquee-content {
  animation-play-state: var(--marquee-pause);
}

.marquee-item {
  flex: 0 0 auto;
  min-width: max-content;
  padding-right: 1rem;
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
