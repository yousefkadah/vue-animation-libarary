import { ref, computed, onUnmounted } from 'vue'

export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string | ((t: number) => number)
  repeat?: number | 'infinite'
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  playState?: 'running' | 'paused'
}

export interface KeyframeOptions {
  from?: Record<string, any>
  to?: Record<string, any>
  keyframes?: Record<string, any>[]
}

/**
 * Modern animation timeline inspired by Framer Motion and CSS Animations API
 * Provides precise control over complex animation sequences
 */
export function useAnimation() {
  const animations = ref<Map<string, Animation>>(new Map())
  const isPlaying = ref(false)
  const currentTime = ref(0)
  
  const createKeyframes = (keyframeOptions: KeyframeOptions) => {
    if (keyframeOptions.keyframes) {
      return keyframeOptions.keyframes
    }
    
    const keyframes = []
    if (keyframeOptions.from) {
      keyframes.push(keyframeOptions.from)
    }
    if (keyframeOptions.to) {
      keyframes.push(keyframeOptions.to)
    }
    
    return keyframes
  }
  
  const animate = (
    element: Element | Element[],
    keyframeOptions: KeyframeOptions,
    config: AnimationConfig = {}
  ) => {
    const elements = Array.isArray(element) ? element : [element]
    const animationId = Math.random().toString(36).substr(2, 9)
    
    const {
      duration = 300,
      delay = 0,
      ease = 'ease',
      repeat = 0,
      direction = 'normal',
      fill = 'forwards'
    } = config
    
    elements.forEach((el, index) => {
      const keyframes = createKeyframes(keyframeOptions)
      
      const animationConfig: KeyframeAnimationOptions = {
        duration,
        delay: delay + (index * 50), // Stagger effect
        easing: typeof ease === 'string' ? ease : 'ease',
        iterations: repeat === 'infinite' ? Infinity : repeat + 1,
        direction,
        fill
      }
      
      const animation = el.animate(keyframes, animationConfig)
      
      animation.addEventListener('finish', () => {
        animations.value.delete(`${animationId}-${index}`)
        if (animations.value.size === 0) {
          isPlaying.value = false
        }
      })
      
      animations.value.set(`${animationId}-${index}`, animation)
    })
    
    isPlaying.value = true
    
    return {
      play: () => {
        animations.value.forEach(anim => anim.play())
        isPlaying.value = true
      },
      pause: () => {
        animations.value.forEach(anim => anim.pause())
        isPlaying.value = false
      },
      cancel: () => {
        animations.value.forEach(anim => anim.cancel())
        animations.value.clear()
        isPlaying.value = false
      },
      finish: () => {
        animations.value.forEach(anim => anim.finish())
      },
      reverse: () => {
        animations.value.forEach(anim => anim.reverse())
      }
    }
  }
  
  const animateSequence = async (
    sequence: Array<{
      element: Element | Element[]
      keyframes: KeyframeOptions
      config?: AnimationConfig
    }>
  ) => {
    for (const step of sequence) {
      animate(step.element, step.keyframes, step.config)
      
      // Wait for animation to complete
      await new Promise(resolve => {
        const checkComplete = () => {
          if (animations.value.size === 0) {
            resolve(void 0)
          } else {
            requestAnimationFrame(checkComplete)
          }
        }
        checkComplete()
      })
    }
  }
  
  const stagger = (
    elements: Element[],
    keyframeOptions: KeyframeOptions,
    config: AnimationConfig = {},
    staggerDelay: number = 100
  ) => {
    elements.forEach((element, index) => {
      const staggeredConfig = {
        ...config,
        delay: (config.delay || 0) + (index * staggerDelay)
      }
      
      animate(element, keyframeOptions, staggeredConfig)
    })
  }
  
  const cancelAll = () => {
    animations.value.forEach(animation => animation.cancel())
    animations.value.clear()
    isPlaying.value = false
  }
  
  onUnmounted(() => {
    cancelAll()
  })
  
  return {
    animate,
    animateSequence,
    stagger,
    cancelAll,
    isPlaying: computed(() => isPlaying.value),
    currentTime: computed(() => currentTime.value)
  }
}

/**
 * Preset animation configurations
 */
export const animationPresets = {
  // Fade animations
  fadeIn: {
    keyframes: { from: { opacity: 0 }, to: { opacity: 1 } },
    config: { duration: 300, ease: 'ease-out' }
  },
  fadeOut: {
    keyframes: { from: { opacity: 1 }, to: { opacity: 0 } },
    config: { duration: 300, ease: 'ease-in' }
  },
  
  // Scale animations
  scaleIn: {
    keyframes: { from: { opacity: 0, transform: 'scale(0.5)' }, to: { opacity: 1, transform: 'scale(1)' } },
    config: { duration: 200, ease: 'ease-out' }
  },
  scaleOut: {
    keyframes: { from: { opacity: 1, transform: 'scale(1)' }, to: { opacity: 0, transform: 'scale(0.5)' } },
    config: { duration: 200, ease: 'ease-in' }
  },
  
  // Slide animations
  slideInUp: {
    keyframes: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
    config: { duration: 300, ease: 'ease-out' }
  },
  slideInDown: {
    keyframes: { from: { opacity: 0, transform: 'translateY(-30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
    config: { duration: 300, ease: 'ease-out' }
  },
  slideInLeft: {
    keyframes: { from: { opacity: 0, transform: 'translateX(-30px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
    config: { duration: 300, ease: 'ease-out' }
  },
  slideInRight: {
    keyframes: { from: { opacity: 0, transform: 'translateX(30px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
    config: { duration: 300, ease: 'ease-out' }
  },
  
  // Bounce animations
  bounceIn: {
    keyframes: {
      keyframes: [
        { opacity: 0, transform: 'scale(0.3)' },
        { opacity: 1, transform: 'scale(1.05)' },
        { opacity: 1, transform: 'scale(0.9)' },
        { opacity: 1, transform: 'scale(1)' }
      ]
    },
    config: { duration: 600, ease: 'ease-out' }
  },
  
  // Flip animations
  flipInX: {
    keyframes: {
      keyframes: [
        { opacity: 0, transform: 'perspective(400px) rotateX(90deg)' },
        { opacity: 1, transform: 'perspective(400px) rotateX(-20deg)' },
        { opacity: 1, transform: 'perspective(400px) rotateX(10deg)' },
        { opacity: 1, transform: 'perspective(400px) rotateX(-5deg)' },
        { opacity: 1, transform: 'perspective(400px) rotateX(0deg)' }
      ]
    },
    config: { duration: 600, ease: 'ease-out' }
  },
  
  // Attention seekers
  pulse: {
    keyframes: {
      keyframes: [
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ]
    },
    config: { duration: 1000, repeat: 'infinite', ease: 'ease-in-out' }
  },
  
  shake: {
    keyframes: {
      keyframes: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(0)' }
      ]
    },
    config: { duration: 820, ease: 'ease-in-out' }
  }
} as const

export type AnimationPresetName = keyof typeof animationPresets