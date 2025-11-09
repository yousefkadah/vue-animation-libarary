<template>
  <div class="skeleton-loader" :class="[variant, { animated }]">
    <!-- Text skeleton -->
    <template v-if="variant === 'text'">
      <div 
        v-for="line in lines"
        :key="line"
        class="skeleton-line"
        :style="getLineStyle(line)"
      ></div>
    </template>
    
    <!-- Avatar skeleton -->
    <template v-else-if="variant === 'avatar'">
      <div class="skeleton-avatar" :style="avatarStyle"></div>
    </template>
    
    <!-- Card skeleton -->
    <template v-else-if="variant === 'card'">
      <div class="skeleton-card">
        <div class="skeleton-image" :style="{ height: imageHeight + 'px' }"></div>
        <div class="skeleton-card-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-subtitle"></div>
          <div class="skeleton-text-lines">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line long"></div>
          </div>
        </div>
      </div>
    </template>
    
    <!-- Custom skeleton -->
    <template v-else>
      <div class="skeleton-custom" :style="customStyle">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'text' | 'avatar' | 'card' | 'custom'
  lines?: number
  width?: string | number
  height?: string | number
  size?: number
  imageHeight?: number
  animated?: boolean
  color?: string
  highlightColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  lines: 3,
  width: '100%',
  height: '1rem',
  size: 40,
  imageHeight: 200,
  animated: true,
  color: '#e5e7eb',
  highlightColor: '#f3f4f6'
})

const avatarStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: '50%',
  backgroundColor: props.color
}))

const customStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  backgroundColor: props.color
}))

const getLineStyle = (lineIndex: number) => {
  const widths = ['100%', '80%', '90%', '60%', '85%']
  const width = widths[(lineIndex - 1) % widths.length]
  
  return {
    width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    backgroundColor: props.color,
    marginBottom: lineIndex < props.lines ? '0.5rem' : '0'
  }
}
</script>

<style scoped>
.skeleton-loader {
  --skeleton-color: #e5e7eb;
  --skeleton-highlight: #f3f4f6;
}

.skeleton-loader.animated * {
  background: linear-gradient(
    90deg, 
    var(--skeleton-color) 25%, 
    var(--skeleton-highlight) 50%, 
    var(--skeleton-color) 75%
  );
  background-size: 200% 100%;
  animation: skeletonLoading 2s infinite ease-in-out;
}

@keyframes skeletonLoading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-line {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.skeleton-avatar {
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-card {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  border: 1px solid #e5e7eb;
}

.skeleton-image {
  width: 100%;
  background-color: var(--skeleton-color);
  border-radius: 0;
}

.skeleton-card-content {
  padding: 1.5rem;
}

.skeleton-title {
  height: 1.5rem;
  background-color: var(--skeleton-color);
  border-radius: 6px;
  margin-bottom: 0.75rem;
  width: 70%;
}

.skeleton-subtitle {
  height: 1rem;
  background-color: var(--skeleton-color);
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 50%;
}

.skeleton-text-lines {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-text-lines .skeleton-line {
  height: 0.875rem;
  background-color: var(--skeleton-color);
}

.skeleton-text-lines .skeleton-line.short {
  width: 60%;
}

.skeleton-text-lines .skeleton-line.medium {
  width: 85%;
}

.skeleton-text-lines .skeleton-line.long {
  width: 95%;
}

.skeleton-custom {
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .skeleton-loader {
    --skeleton-color: #374151;
    --skeleton-highlight: #4b5563;
  }
  
  .skeleton-card {
    background: #1f2937;
    border-color: #374151;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .skeleton-card-content {
    padding: 1rem;
  }
  
  .skeleton-title {
    height: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .skeleton-subtitle {
    height: 0.875rem;
    margin-bottom: 0.75rem;
  }
  
  .skeleton-text-lines {
    gap: 0.375rem;
  }
  
  .skeleton-text-lines .skeleton-line {
    height: 0.75rem;
  }
}
</style>