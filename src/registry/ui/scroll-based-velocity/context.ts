import type { InjectionKey } from 'vue'
import { useScroll, useSpring, useTransform, useVelocity, type MotionValue } from 'motion-v'

/** Shared scroll-velocity factor (-5…5) provided by `ScrollVelocityContainer`. */
export const scrollVelocityKey: InjectionKey<MotionValue<number>> = Symbol('ScrollVelocity')

/** Wraps `v` into the range [min, max). */
export function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

/** Page scroll velocity, smoothed and mapped to a -5…5 speed boost. Call from `setup`. */
export function useScrollVelocityFactor(): MotionValue<number> {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  return useTransform(smoothVelocity, (v: number) => {
    const sign = v < 0 ? -1 : 1
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
    return sign * magnitude
  })
}
