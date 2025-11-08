import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'

export interface ScrollOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  offset?: [string | number, string | number] // [start, end]
}

export interface ScrollState {
  isInView: boolean
  scrollY: number
  progress: number
  velocity: number
}

/**
 * Modern scroll-triggered animation hook
 * Provides intersection observer and scroll progress tracking
 */
export function useScroll(
  target: Ref<HTMLElement | null>,
  options: ScrollOptions = {}
) {
  const isInView = ref(false)
  const scrollY = ref(0)
  const progress = ref(0)
  const velocity = ref(0)
  
  let observer: IntersectionObserver | null = null
  let lastScrollY = 0
  let lastTime = 0
  
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false
  } = options
  
  // Intersection Observer for visibility detection
  const setupIntersectionObserver = () => {
    if (!target.value || typeof window === 'undefined') return
    
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInView = isInView.value
          isInView.value = entry.isIntersecting
          
          if (!wasInView && entry.isIntersecting) {
            // Element entered view
          } else if (wasInView && !entry.isIntersecting && triggerOnce) {
            // Element left view and triggerOnce is true
            observer?.disconnect()
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )
    
    observer.observe(target.value)
  }
  
  // Scroll progress calculation
  const calculateProgress = () => {
    if (!target.value) return
    
    const rect = target.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height
    
    // Calculate progress based on element position relative to viewport
    const elementTop = rect.top
    const elementBottom = rect.bottom
    
    // Element is above viewport
    if (elementBottom < 0) {
      progress.value = 1
    }
    // Element is below viewport
    else if (elementTop > windowHeight) {
      progress.value = 0
    }
    // Element is partially or fully visible
    else {
      // Calculate progress based on how much of the element has scrolled past
      const totalScrollableHeight = elementHeight + windowHeight
      const scrolledHeight = windowHeight - elementTop
      
      progress.value = Math.max(0, Math.min(1, scrolledHeight / totalScrollableHeight))
    }
  }
  
  // Scroll velocity calculation
  const calculateVelocity = (currentTime: number) => {
    const deltaTime = currentTime - lastTime
    const deltaY = scrollY.value - lastScrollY
    
    if (deltaTime > 0) {
      velocity.value = deltaY / deltaTime
    }
    
    lastScrollY = scrollY.value
    lastTime = currentTime
  }
  
  // Scroll event handler
  const handleScroll = () => {
    scrollY.value = window.scrollY
    calculateProgress()
    calculateVelocity(performance.now())
  }
  
  // Throttled scroll handler for better performance
  let ticking = false
  const throttledScrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }
  
  // Setup and cleanup
  onMounted(() => {
    if (typeof window === 'undefined') return
    
    setupIntersectionObserver()
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })
    
    // Initial calculation
    handleScroll()
  })
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', throttledScrollHandler)
    }
  })
  
  return {
    isInView: computed(() => isInView.value),
    scrollY: computed(() => scrollY.value),
    progress: computed(() => progress.value),
    velocity: computed(() => velocity.value),
    state: computed((): ScrollState => ({
      isInView: isInView.value,
      scrollY: scrollY.value,
      progress: progress.value,
      velocity: velocity.value
    }))
  }
}

/**
 * Parallax scrolling hook
 * Creates smooth parallax effects based on scroll position
 */
export function useParallax(
  target: Ref<HTMLElement | null>,
  speed: number = 0.5
) {
  const { scrollY, progress } = useScroll(target)
  
  const parallaxY = computed(() => {
    return scrollY.value * speed
  })
  
  const parallaxProgress = computed(() => {
    return progress.value * speed
  })
  
  return {
    y: parallaxY,
    progress: parallaxProgress,
    scrollY,
    scrollProgress: progress
  }
}

/**
 * Scroll-triggered transform hook
 * Transforms elements based on scroll progress
 */
export function useScrollTransform(
  target: Ref<HTMLElement | null>,
  transforms: {
    translateX?: [number, number]
    translateY?: [number, number]
    scale?: [number, number]
    rotate?: [number, number]
    opacity?: [number, number]
  } = {}
) {
  const { progress } = useScroll(target)
  
  const interpolate = (start: number, end: number, progress: number) => {
    return start + (end - start) * progress
  }
  
  const transform = computed(() => {
    const p = progress.value
    const result: Record<string, number> = {}
    
    if (transforms.translateX) {
      result.translateX = interpolate(transforms.translateX[0], transforms.translateX[1], p)
    }
    if (transforms.translateY) {
      result.translateY = interpolate(transforms.translateY[0], transforms.translateY[1], p)
    }
    if (transforms.scale) {
      result.scale = interpolate(transforms.scale[0], transforms.scale[1], p)
    }
    if (transforms.rotate) {
      result.rotate = interpolate(transforms.rotate[0], transforms.rotate[1], p)
    }
    if (transforms.opacity) {
      result.opacity = interpolate(transforms.opacity[0], transforms.opacity[1], p)
    }
    
    return result
  })
  
  return {
    transform,
    progress,
    isInView: useScroll(target).isInView
  }
}