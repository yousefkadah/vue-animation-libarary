/**
 * Modern easing functions collection inspired by Framer Motion and other animation libraries
 * Provides a comprehensive set of easing functions for smooth animations
 */

export type EasingFunction = (t: number) => number

// Basic easing functions
export const linear: EasingFunction = (t: number) => t

// Cubic easing
export const easeIn: EasingFunction = (t: number) => t * t * t
export const easeOut: EasingFunction = (t: number) => --t * t * t + 1
export const easeInOut: EasingFunction = (t: number) => 
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

// Quadratic easing
export const quadIn: EasingFunction = (t: number) => t * t
export const quadOut: EasingFunction = (t: number) => t * (2 - t)
export const quadInOut: EasingFunction = (t: number) => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

// Quartic easing
export const quartIn: EasingFunction = (t: number) => t * t * t * t
export const quartOut: EasingFunction = (t: number) => 1 - (--t) * t * t * t
export const quartInOut: EasingFunction = (t: number) => 
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t

// Quintic easing
export const quintIn: EasingFunction = (t: number) => t * t * t * t * t
export const quintOut: EasingFunction = (t: number) => 1 + (--t) * t * t * t * t
export const quintInOut: EasingFunction = (t: number) => 
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t

// Sine easing
export const sineIn: EasingFunction = (t: number) => 1 - Math.cos(t * Math.PI / 2)
export const sineOut: EasingFunction = (t: number) => Math.sin(t * Math.PI / 2)
export const sineInOut: EasingFunction = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

// Exponential easing
export const expoIn: EasingFunction = (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1))
export const expoOut: EasingFunction = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
export const expoInOut: EasingFunction = (t: number) => {
  if (t === 0) return 0
  if (t === 1) return 1
  if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2
  return (2 - Math.pow(2, -20 * t + 10)) / 2
}

// Circular easing
export const circIn: EasingFunction = (t: number) => 1 - Math.sqrt(1 - t * t)
export const circOut: EasingFunction = (t: number) => Math.sqrt(1 - (t - 1) * (t - 1))
export const circInOut: EasingFunction = (t: number) => 
  t < 0.5 
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2

// Back easing
export const backIn: EasingFunction = (t: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return c3 * t * t * t - c1 * t * t
}

export const backOut: EasingFunction = (t: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export const backInOut: EasingFunction = (t: number) => {
  const c1 = 1.70158
  const c2 = c1 * 1.525
  
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
}

// Elastic easing
export const elasticIn: EasingFunction = (t: number) => {
  const c4 = (2 * Math.PI) / 3
  
  return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
}

export const elasticOut: EasingFunction = (t: number) => {
  const c4 = (2 * Math.PI) / 3
  
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

export const elasticInOut: EasingFunction = (t: number) => {
  const c5 = (2 * Math.PI) / 4.5
  
  return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
    ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
}

// Bounce easing
export const bounceIn: EasingFunction = (t: number) => 1 - bounceOut(1 - t)

export const bounceOut: EasingFunction = (t: number) => {
  const n1 = 7.5625
  const d1 = 2.75
  
  if (t < 1 / d1) {
    return n1 * t * t
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375
  }
}

export const bounceInOut: EasingFunction = (t: number) => 
  t < 0.5 ? (1 - bounceOut(1 - 2 * t)) / 2 : (1 + bounceOut(2 * t - 1)) / 2

// Custom anticipate easing (popular in modern UI)
export const anticipate: EasingFunction = (t: number) => {
  const p = 0.175
  return (Math.pow(2, 10 * (t - 1)) - p) * Math.sin((t - 1 - p / 4) * (2 * Math.PI) / p) + 1
}

// Modern UI easings (inspired by Material Design and iOS)
export const materialStandard: EasingFunction = (t: number) => {
  // Cubic bezier equivalent: cubic-bezier(0.4, 0.0, 0.2, 1)
  return t < 0.5 
    ? 2 * t * t * (3 * t - 2 * t * t)
    : 1 - 2 * (t - 1) * (t - 1) * (3 * (t - 1) - 2 * (t - 1) * (t - 1))
}

export const materialDecelerate: EasingFunction = (t: number) => {
  // Cubic bezier equivalent: cubic-bezier(0.0, 0.0, 0.2, 1)
  return 1 - (1 - t) * (1 - t) * (1 - 2 * t)
}

export const materialAccelerate: EasingFunction = (t: number) => {
  // Cubic bezier equivalent: cubic-bezier(0.4, 0.0, 1, 1)
  return t * t * (3 - 2 * t)
}

export const iosStandard: EasingFunction = (t: number) => {
  // Cubic bezier equivalent: cubic-bezier(0.25, 0.1, 0.25, 1)
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Easing presets object
export const easings = {
  linear,
  easeIn,
  easeOut,
  easeInOut,
  quadIn,
  quadOut,
  quadInOut,
  quartIn,
  quartOut,
  quartInOut,
  quintIn,
  quintOut,
  quintInOut,
  sineIn,
  sineOut,
  sineInOut,
  expoIn,
  expoOut,
  expoInOut,
  circIn,
  circOut,
  circInOut,
  backIn,
  backOut,
  backInOut,
  elasticIn,
  elasticOut,
  elasticInOut,
  bounceIn,
  bounceOut,
  bounceInOut,
  anticipate,
  materialStandard,
  materialDecelerate,
  materialAccelerate,
  iosStandard
} as const

export type EasingName = keyof typeof easings

/**
 * Get an easing function by name
 */
export function getEasing(name: EasingName | EasingFunction): EasingFunction {
  return typeof name === 'string' ? easings[name] : name
}

/**
 * Create a custom cubic bezier easing function
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): EasingFunction {
  return (t: number) => {
    // Simplified cubic bezier calculation for common cases
    // For production use, consider a more accurate implementation
    if (t === 0) return 0
    if (t === 1) return 1
    
    // Newton-Raphson method approximation
    let guess = t
    for (let i = 0; i < 4; i++) {
      const current = (3 * (1 - guess) * (1 - guess) * guess * x1) + 
                     (3 * (1 - guess) * guess * guess * x2) + 
                     (guess * guess * guess)
      const currentDerivative = (3 * (1 - guess) * (1 - guess) * x1) + 
                               (6 * (1 - guess) * guess * (x2 - x1)) + 
                               (3 * guess * guess * (1 - x2))
      
      if (Math.abs(currentDerivative) < 1e-6) break
      guess = guess - (current - t) / currentDerivative
    }
    
    return (3 * (1 - guess) * (1 - guess) * guess * y1) + 
           (3 * (1 - guess) * guess * guess * y2) + 
           (guess * guess * guess)
  }
}