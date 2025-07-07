<template>
  <div ref="textElement" class="text-reveal">
    <span 
      v-for="(char, index) in characters" 
      :key="index"
      :class="['text-reveal__char', { 'text-reveal__char--visible': char.visible }]"
      :style="{ animationDelay: `${index * 0.05}s` }"
    >
      {{ char.char === ' ' ? '&nbsp;' : char.char }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  text: string
  threshold?: number
  stagger?: number
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 0.5,
  stagger: 0.05
})

interface Character {
  char: string
  visible: boolean
}

const textElement = ref<HTMLElement>()
const characters = ref<Character[]>([])
let observer: IntersectionObserver | null = null

const initializeText = () => {
  characters.value = props.text.split('').map(char => ({
    char,
    visible: false
  }))
}

const revealText = () => {
  characters.value.forEach((char, index) => {
    setTimeout(() => {
      char.visible = true
    }, index * props.stagger * 1000)
  })
}

onMounted(() => {
  initializeText()
  
  if (textElement.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealText()
            observer?.disconnect()
          }
        })
      },
      { threshold: props.threshold }
    )
    
    observer.observe(textElement.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.text-reveal {
  display: inline-block;
}

.text-reveal__char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.text-reveal__char--visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
