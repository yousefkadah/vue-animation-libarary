<template>
  <button 
    ref="buttonElement"
    :class="['magic-button', variant, size, { 'magic-button--loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <span class="magic-button__bg"></span>
    <span class="magic-button__border"></span>
    <span class="magic-button__content">
      <slot v-if="!loading" />
      <span v-else class="magic-button__loader">
        <span class="magic-button__spinner"></span>
      </span>
    </span>
    <span class="magic-button__ripple" :class="{ active: rippleActive }"></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'gradient' | 'glass' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  rippleEffect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  rippleEffect: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonElement = ref<HTMLElement>()
const rippleActive = ref(false)

const handleClick = (event: MouseEvent) => {
  if (props.rippleEffect) {
    rippleActive.value = true
    setTimeout(() => {
      rippleActive.value = false
    }, 800)
  }
  emit('click', event)
}

const onMouseEnter = () => {
  if (buttonElement.value) {
    buttonElement.value.style.transform = 'translateY(-2px)'
  }
}

const onMouseLeave = () => {
  if (buttonElement.value) {
    buttonElement.value.style.transform = 'translateY(0)'
  }
}
</script>

<style scoped>
.magic-button {
  position: relative;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  outline: none;
  background: transparent;
}

.magic-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.magic-button__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  transition: all 0.3s ease;
}

.magic-button__border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(45deg, #42b883 0%, #369870 100%);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.magic-button__content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.magic-button__ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  transform: translate(-50%, -50%);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
}

.magic-button__ripple.active {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%);
}

.magic-button__loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.magic-button__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Sizes */
.magic-button.sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.magic-button.md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.magic-button.lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.magic-button.primary .magic-button__bg {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
}

.magic-button.primary {
  color: white;
}

.magic-button.secondary .magic-button__bg {
  background: #f8f9fa;
}

.magic-button.secondary {
  color: #495057;
}

.magic-button.gradient .magic-button__bg {
  background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
}

.magic-button.gradient {
  color: white;
}

.magic-button.glass .magic-button__bg {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.magic-button.glass {
  color: #333;
}

.magic-button.outline .magic-button__bg {
  background: transparent;
  border: 2px solid #42b883;
}

.magic-button.outline {
  color: #42b883;
}

.magic-button.outline:hover {
  color: white;
}

.magic-button.outline:hover .magic-button__bg {
  background: #42b883;
}

.magic-button:hover .magic-button__bg {
  transform: scale(1.05);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
