import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface PerformanceConfig {
  enableReducedMotion?: boolean
  enableGPUAcceleration?: boolean
  enableWillChange?: boolean
  throttleScrollEvents?: boolean
  debounceResizeEvents?: boolean
}

/**
 * Modern performance and accessibility hook
 * Provides optimizations and a11y features for animations
 */
export function usePerformance(config: PerformanceConfig = {}) {
  const {
    enableReducedMotion = true,
    enableGPUAcceleration = true,
    enableWillChange = true,
    throttleScrollEvents = true,
    debounceResizeEvents = true
  } = config
  
  const prefersReducedMotion = ref(false)
  const isLowPowerMode = ref(false)
  const devicePixelRatio = ref(1)
  const connectionSpeed = ref<'slow' | 'fast' | 'unknown'>('unknown')
  const memoryInfo = ref<any>(null)
  
  // Detect user preferences and device capabilities
  const detectCapabilities = () => {
    if (typeof window === 'undefined') return
    
    // Reduced motion preference
    if (enableReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.value = mediaQuery.matches
      
      const handleChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion.value = e.matches
      }
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange)
      }
    }
    
    // Device pixel ratio
    devicePixelRatio.value = window.devicePixelRatio || 1
    
    // Connection speed detection
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      const effectiveType = connection.effectiveType
      connectionSpeed.value = effectiveType === '2g' || effectiveType === 'slow-2g' ? 'slow' : 'fast'
    }
    
    // Memory info (Chrome only)
    if ('memory' in performance) {
      memoryInfo.value = (performance as any).memory
      
      // Consider low power mode if memory usage is high
      const memLimit = memoryInfo.value?.jsHeapSizeLimit || 0
      const memUsed = memoryInfo.value?.usedJSHeapSize || 0
      isLowPowerMode.value = memUsed / memLimit > 0.8
    }
    
    // Battery API for power mode detection
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updatePowerMode = () => {
          isLowPowerMode.value = battery.level < 0.2 || !battery.charging
        }
        
        battery.addEventListener('levelchange', updatePowerMode)
        battery.addEventListener('chargingchange', updatePowerMode)
        updatePowerMode()
      })
    }
  }
  
  // Performance optimization helpers
  const shouldReduceAnimations = computed(() => {
    return prefersReducedMotion.value || isLowPowerMode.value || connectionSpeed.value === 'slow'
  })
  
  const getOptimalAnimationDuration = (baseDuration: number): number => {
    if (shouldReduceAnimations.value) {
      return Math.min(baseDuration * 0.5, 150) // Reduce duration by 50% or cap at 150ms
    }
    return baseDuration
  }
  
  const getOptimalFrameRate = (): number => {
    if (isLowPowerMode.value || connectionSpeed.value === 'slow') {
      return 30 // Lower frame rate for performance
    }
    return 60
  }
  
  const createOptimizedStyles = (baseStyles: Record<string, any>) => {
    const optimizedStyles = { ...baseStyles }
    
    if (enableGPUAcceleration) {
      // Add GPU acceleration hints
      if ('transform' in optimizedStyles) {
        optimizedStyles.transform = `${optimizedStyles.transform} translateZ(0)`
      } else {
        optimizedStyles.transform = 'translateZ(0)'
      }
    }
    
    if (enableWillChange && 'transform' in optimizedStyles) {
      optimizedStyles.willChange = 'transform, opacity'
    }
    
    return optimizedStyles
  }
  
  // Throttled scroll handler
  const createThrottledScrollHandler = (callback: () => void) => {
    if (!throttleScrollEvents) return callback
    
    let isThrottled = false
    
    return () => {
      if (!isThrottled) {
        requestAnimationFrame(() => {
          callback()
          isThrottled = false
        })
        isThrottled = true
      }
    }
  }
  
  // Debounced resize handler
  const createDebouncedResizeHandler = (callback: () => void, delay = 150) => {
    if (!debounceResizeEvents) return callback
    
    let timeoutId: number | null = null
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = window.setTimeout(() => {
        callback()
        timeoutId = null
      }, delay)
    }
  }
  
  // Intersection Observer with performance optimizations
  const createOptimizedObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    const optimizedOptions = {
      rootMargin: '50px', // Preload elements slightly before they come into view
      threshold: shouldReduceAnimations.value ? 0.5 : 0.1, // Higher threshold for low-power mode
      ...options
    }
    
    return new IntersectionObserver(callback, optimizedOptions)
  }
  
  // RequestAnimationFrame with frame rate limiting
  const createOptimizedRAF = (callback: () => void) => {
    const targetFrameRate = getOptimalFrameRate()
    const frameInterval = 1000 / targetFrameRate
    let lastTime = 0
    
    const optimizedCallback = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        callback()
        lastTime = currentTime
      }
    }
    
    return requestAnimationFrame(optimizedCallback)
  }
  
  // Memory management helpers
  const clearAnimationResources = () => {
    // Clear any cached animation data, event listeners, etc.
    // This should be called when components are unmounted
  }
  
  // Development-only performance monitoring
  const startPerformanceMonitoring = () => {
    if (import.meta.env.DEV !== true) return
    
    let frameCount = 0
    let lastSecond = Date.now()
    
    const monitor = () => {
      frameCount++
      const now = Date.now()
      
      if (now - lastSecond >= 1000) {
        console.log(`FPS: ${frameCount}`)
        frameCount = 0
        lastSecond = now
      }
      
      requestAnimationFrame(monitor)
    }
    
    monitor()
  }
  
  onMounted(() => {
    detectCapabilities()
    
    if (import.meta.env.DEV) {
      startPerformanceMonitoring()
    }
  })
  
  onUnmounted(() => {
    clearAnimationResources()
  })
  
  return {
    // State
    prefersReducedMotion: computed(() => prefersReducedMotion.value),
    isLowPowerMode: computed(() => isLowPowerMode.value),
    shouldReduceAnimations,
    devicePixelRatio: computed(() => devicePixelRatio.value),
    connectionSpeed: computed(() => connectionSpeed.value),
    
    // Optimization helpers
    getOptimalAnimationDuration,
    getOptimalFrameRate,
    createOptimizedStyles,
    createThrottledScrollHandler,
    createDebouncedResizeHandler,
    createOptimizedObserver,
    createOptimizedRAF,
    
    // Memory management
    clearAnimationResources
  }
}

/**
 * Accessibility helpers for animations
 */
export function useA11yAnimations() {
  const { prefersReducedMotion, shouldReduceAnimations } = usePerformance()
  
  const announceAnimationStart = (description: string) => {
    if (typeof window === 'undefined') return
    
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    
    announcement.textContent = description
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
  
  const createAccessibleAnimationConfig = (config: any) => {
    if (shouldReduceAnimations.value) {
      return {
        ...config,
        duration: Math.min(config.duration || 300, 150),
        type: 'tween', // Prefer simple tweens over spring animations
        ease: 'easeOut' // Use simpler easing
      }
    }
    
    return config
  }
  
  return {
    prefersReducedMotion,
    shouldReduceAnimations,
    announceAnimationStart,
    createAccessibleAnimationConfig
  }
}

/**
 * Bundle size optimization utilities
 */
export const optimizations = {
  // Lazy load heavy animation dependencies
  async loadSpringPhysics() {
    // Dynamically import spring physics calculations only when needed
    return await import('../utils/easing')
  },
  
  // Lazy load complex easing functions
  async loadAdvancedEasings() {
    const { easings } = await import('../utils/easing')
    return easings
  },
  
  // Code splitting for different animation types
  async loadMotionComponents() {
    return await import('../components/Motion.vue')
  }
}