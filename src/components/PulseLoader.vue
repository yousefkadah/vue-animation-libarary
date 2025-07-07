<template>
  <div class="pulse-loader" :style="{ width: `${size}px`, height: `${size}px` }">
    <div 
      v-for="i in 3" 
      :key="i"
      class="pulse-loader__dot"
      :style="{ 
        backgroundColor: color,
        animationDelay: `${(i - 1) * 0.15}s`,
        animationDuration: `${duration}s`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  color?: string
  duration?: number
}

withDefaults(defineProps<Props>(), {
  size: 40,
  color: '#42b883',
  duration: 1.4
})
</script>

<style scoped>
.pulse-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.pulse-loader__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: pulse infinite ease-in-out;
}

@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
