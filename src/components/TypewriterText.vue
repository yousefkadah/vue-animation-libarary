<template>
  <span class="typewriter-text">
    <span class="typewriter-text__content">{{ displayText }}</span>
    <span 
      v-if="showCursor" 
      class="typewriter-text__cursor"
      :class="{ 'typewriter-text__cursor--blinking': !isTyping }"
    >
      {{ cursor }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  text: string | string[]
  speed?: number
  pauseTime?: number
  cursor?: string
  showCursor?: boolean
  loop?: boolean
  startDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 100,
  pauseTime: 2000,
  cursor: '|',
  showCursor: true,
  loop: false,
  startDelay: 0
})

const displayText = ref('')
const isTyping = ref(false)
let timeoutId: number | null = null

const texts = Array.isArray(props.text) ? props.text : [props.text]
let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false

const typeText = () => {
  const currentText = texts[currentTextIndex]
  
  if (!isDeleting) {
    // Typing
    if (currentCharIndex < currentText.length) {
      displayText.value = currentText.substring(0, currentCharIndex + 1)
      currentCharIndex++
      isTyping.value = true
      timeoutId = setTimeout(typeText, props.speed)
    } else {
      // Finished typing current text
      isTyping.value = false
      if (texts.length > 1) {
        // Start deleting after pause
        timeoutId = setTimeout(() => {
          isDeleting = true
          isTyping.value = true
          typeText()
        }, props.pauseTime)
      } else if (props.loop) {
        // Restart the same text
        timeoutId = setTimeout(() => {
          currentCharIndex = 0
          displayText.value = ''
          typeText()
        }, props.pauseTime)
      }
    }
  } else {
    // Deleting
    if (currentCharIndex > 0) {
      displayText.value = currentText.substring(0, currentCharIndex - 1)
      currentCharIndex--
      timeoutId = setTimeout(typeText, props.speed / 2)
    } else {
      // Finished deleting
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % texts.length
      
      if (currentTextIndex === 0 && !props.loop) {
        // Completed all texts and not looping
        isTyping.value = false
        return
      }
      
      // Start typing next text
      timeoutId = setTimeout(typeText, props.speed)
    }
  }
}

const startTypewriter = () => {
  if (props.startDelay > 0) {
    timeoutId = setTimeout(typeText, props.startDelay)
  } else {
    typeText()
  }
}

onMounted(() => {
  startTypewriter()
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

watch(() => props.text, () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  displayText.value = ''
  currentTextIndex = 0
  currentCharIndex = 0
  isDeleting = false
  startTypewriter()
})
</script>

<style scoped>
.typewriter-text {
  display: inline-block;
  font-family: 'Courier New', monospace;
}

.typewriter-text__content {
  display: inline;
}

.typewriter-text__cursor {
  display: inline-block;
  font-weight: bold;
  color: currentColor;
  animation: none;
}

.typewriter-text__cursor--blinking {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>
