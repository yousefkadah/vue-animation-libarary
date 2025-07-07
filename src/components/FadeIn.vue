<template>
  <div 
    ref="element"
    :class="['fade-in', { 'fade-in--visible': isVisible }]"
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
  delay?: number
  duration?: number
  threshold?: number
  triggerOnce?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 600,
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
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in--visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
