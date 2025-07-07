<template>
  <div class="wave-loader" :style="{ width: `${size}px`, height: `${size}px` }">
    <div 
      v-for="i in 4" 
      :key="i"
      class="wave-loader__bar"
      :style="{ 
        backgroundColor: color,
        animationDelay: `${(i - 1) * 0.1}s`,
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
  duration: 1.2
})
</script>

<style scoped>
.wave-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.wave-loader__bar {
  width: 4px;
  height: 100%;
  border-radius: 2px;
  animation: wave infinite ease-in-out;
}

@keyframes wave {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
