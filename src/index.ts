import type { App } from 'vue'

// Import all components
import FadeIn from './components/FadeIn.vue'
import SlideIn from './components/SlideIn.vue'
import SparkleText from './components/SparkleText.vue'
import MagicButton from './components/MagicButton.vue'
import FloatingCard from './components/FloatingCard.vue'
import TypewriterText from './components/TypewriterText.vue'
import GradientText from './components/GradientText.vue'
import PulseLoader from './components/PulseLoader.vue'
import WaveLoader from './components/WaveLoader.vue'
import ParticleEffect from './components/ParticleEffect.vue'
import MorphingShape from './components/MorphingShape.vue'
import GlowCard from './components/GlowCard.vue'
import ShimmerButton from './components/ShimmerButton.vue'
import CountUp from './components/CountUp.vue'
import TextReveal from './components/TextReveal.vue'

// Professional components
import Meteors from './components/Meteors.vue'
import GridPattern from './components/GridPattern.vue'
import BorderBeam from './components/BorderBeam.vue'
import RippleEffect from './components/RippleEffect.vue'
import RetroGrid from './components/RetroGrid.vue'
import Aurora from './components/Aurora.vue'
import NumberTicker from './components/NumberTicker.vue'
import OrbitingCircles from './components/OrbitingCircles.vue'
import AnimatedBeam from './components/AnimatedBeam.vue'
import Marquee from './components/Marquee.vue'

// Modern components
import Motion from './components/Motion.vue'
import FadeInModern from './components/FadeInModern.vue'

// Export composables
export { useSpring } from './composables/useSpring'
export { useGesture } from './composables/useGesture'
export { useScroll, useParallax, useScrollTransform } from './composables/useScroll'

// Export utilities
export { easings, getEasing, cubicBezier } from './utils/easing'
export type { EasingFunction, EasingName } from './utils/easing'

// Component map
const components = {
  FadeIn,
  SlideIn,
  SparkleText,
  MagicButton,
  FloatingCard,
  TypewriterText,
  GradientText,
  PulseLoader,
  WaveLoader,
  ParticleEffect,
  MorphingShape,
  GlowCard,
  ShimmerButton,
  CountUp,
  TextReveal,
  Meteors,
  GridPattern,
  BorderBeam,
  RippleEffect,
  RetroGrid,
  Aurora,
  NumberTicker,
  OrbitingCircles,
  AnimatedBeam,
  Marquee,
  Motion,
  FadeInModern
}

// Install function
export function install(app: App) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key as keyof typeof components])
  })
}

// Export all components
export {
  FadeIn,
  SlideIn,
  SparkleText,
  MagicButton,
  FloatingCard,
  TypewriterText,
  GradientText,
  PulseLoader,
  WaveLoader,
  ParticleEffect,
  MorphingShape,
  GlowCard,
  ShimmerButton,
  CountUp,
  TextReveal,
  Meteors,
  GridPattern,
  BorderBeam,
  RippleEffect,
  RetroGrid,
  Aurora,
  NumberTicker,
  OrbitingCircles,
  AnimatedBeam,
  Marquee,
  Motion,
  FadeInModern
}

// Default export
export default {
  install
}
