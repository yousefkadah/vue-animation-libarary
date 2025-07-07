<template>
  <div 
    ref="element"
    :class="['slide-in', `slide-in--${direction}`, { 'slide-in--visible': isVisible }]"
    :style="{ 
      transitionDelay: `${delay}ms`,
      transitionDuration: `${duration}ms` 
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  triggerOnce?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'up',
  delay: 0,
  duration: 600,
  distance: 50,
  threshold: 0.1,
  triggerOnce: true
})

const element = ref<HTMLElement>()
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!element.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.triggerOnce && observer) {
            observer.disconnect()
          }
        } else if (!props.triggerOnce) {
          isVisible.value = false
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: '50px'
    }
  )

  observer.observe(element.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.slide-in {
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.slide-in--left {
  transform: translateX(-50px);
}

.slide-in--right {
  transform: translateX(50px);
}

.slide-in--up {
  transform: translateY(50px);
}

.slide-in--down {
  transform: translateY(-50px);
}

.slide-in--visible {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
