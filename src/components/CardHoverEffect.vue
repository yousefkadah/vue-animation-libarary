<template>
  <div class="card-hover-effect" :class="variant">
    <div class="card-background"></div>
    <div class="card-content">
      <slot />
    </div>
    <div class="card-glow"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'gradient' | 'neon' | 'glass'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style scoped>
.card-hover-effect {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.1) 0%, 
    rgba(147, 51, 234, 0.1) 50%, 
    rgba(236, 72, 153, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    #3b82f6, #8b5cf6, #ec4899, #f59e0b);
  background-size: 400% 400%;
  border-radius: 18px;
  opacity: 0;
  z-index: -1;
  filter: blur(20px);
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.card-hover-effect:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.card-hover-effect:hover .card-background {
  opacity: 1;
}

.card-hover-effect:hover .card-glow {
  opacity: 0.6;
}

/* Variant Styles */
.card-hover-effect.gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-hover-effect.neon {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #00d4ff;
  box-shadow: 
    0 0 20px rgba(0, 212, 255, 0.3),
    inset 0 0 20px rgba(0, 212, 255, 0.1);
}

.card-hover-effect.neon:hover {
  box-shadow: 
    0 0 40px rgba(0, 212, 255, 0.6),
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 30px rgba(0, 212, 255, 0.2);
}

.card-hover-effect.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-hover-effect.glass:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}
</style>