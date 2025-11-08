import { ref, computed, watch, onUnmounted } from 'vue'

export interface SpringConfig {
  mass?: number
  tension?: number
  friction?: number
  precision?: number
  velocity?: number
}

export interface SpringOptions {
  immediate?: boolean
  config?: SpringConfig
  onStart?: () => void
  onChange?: (value: number) => void
  onRest?: () => void
}

const defaultConfig: Required<SpringConfig> = {
  mass: 1,
  tension: 280,
  friction: 60,
  precision: 0.01,
  velocity: 0
}

/**
 * Modern spring animation hook inspired by react-spring
 * Provides physics-based animations with spring dynamics
 */
export function useSpring(
  targetValue: number | (() => number),
  options: SpringOptions = {}
) {
  const currentValue = ref(0)
  const velocity = ref(options.config?.velocity ?? defaultConfig.velocity)
  const isAnimating = ref(false)
  
  const config = { ...defaultConfig, ...options.config }
  
  let animationFrame: number | null = null
  let startTime = 0

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    
    const deltaTime = (timestamp - startTime) / 1000
    startTime = timestamp
    
    const target = typeof targetValue === 'function' ? targetValue() : targetValue
    const displacement = currentValue.value - target
    
    // Spring force calculation
    const springForce = -config.tension * displacement
    const dampingForce = -config.friction * velocity.value
    const acceleration = (springForce + dampingForce) / config.mass
    
    velocity.value += acceleration * deltaTime
    currentValue.value += velocity.value * deltaTime
    
    options.onChange?.(currentValue.value)
    
    // Check if animation should continue
    if (Math.abs(displacement) < config.precision && Math.abs(velocity.value) < config.precision) {
      currentValue.value = target
      velocity.value = 0
      isAnimating.value = false
      options.onRest?.()
      return
    }
    
    animationFrame = requestAnimationFrame(animate)
  }
  
  const start = (newTarget?: number) => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    
    if (newTarget !== undefined) {
      if (typeof targetValue !== 'function') {
        targetValue = newTarget
      }
    }
    
    if (!options.immediate) {
      isAnimating.value = true
      startTime = 0
      options.onStart?.()
      animationFrame = requestAnimationFrame(animate)
    } else {
      const target = typeof targetValue === 'function' ? targetValue() : targetValue
      currentValue.value = target
      velocity.value = 0
    }
  }
  
  const stop = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
    isAnimating.value = false
    velocity.value = 0
  }
  
  const reset = () => {
    stop()
    currentValue.value = 0
    velocity.value = 0
  }
  
  // Auto-start when target changes
  watch(() => typeof targetValue === 'function' ? targetValue() : targetValue, () => {
    start()
  }, { immediate: true })
  
  onUnmounted(() => {
    stop()
  })
  
  return {
    value: computed(() => currentValue.value),
    velocity: computed(() => velocity.value),
    isAnimating: computed(() => isAnimating.value),
    start,
    stop,
    reset
  }
}