<template>
  <button :class="['shimmer-button', variant, size]" @click="$emit('click')">
    <span class="shimmer-button__shimmer"></span>
    <span class="shimmer-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.shimmer-button {
  position: relative;
  padding: 12px 24px;
  border: none;
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.shimmer-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.shimmer-button__shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s ease;
}

.shimmer-button:hover .shimmer-button__shimmer {
  left: 100%;
}

.shimmer-button__content {
  position: relative;
  z-index: 2;
}

/* Sizes */
.shimmer-button.sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.shimmer-button.md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.shimmer-button.lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.shimmer-button.primary {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
}

.shimmer-button.outline {
  background: transparent;
  border: 2px solid #42b883;
  color: #42b883;
}

.shimmer-button.outline:hover {
  background: linear-gradient(135deg, #42b883 0%, #369870 100%);
  color: white;
}
</style>
