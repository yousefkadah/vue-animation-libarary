<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { getThemeTransitionClipPaths, type ThemeTransitionVariant } from './clip-paths'

export interface AnimatedThemeTogglerProps {
  class?: HTMLAttributes['class']
  /** Length of the reveal in milliseconds. */
  duration?: number
  /** Shape of the reveal. */
  variant?: ThemeTransitionVariant
  /** Grow the reveal from the centre of the viewport instead of from the button. */
  fromCenter?: boolean
  /**
   * Controlled theme. When set, the parent owns persistence and the component does not write to
   * localStorage; listen to `themeChange` (or use `v-model:theme`).
   */
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<AnimatedThemeTogglerProps>(), {
  duration: 400,
  variant: 'circle',
  fromCenter: false,
  theme: undefined,
})

const emit = defineEmits<{
  /** Fired on every toggle with the new theme. */
  themeChange: [theme: 'light' | 'dark']
  'update:theme': [theme: 'light' | 'dark']
}>()

const STYLE_ID = 'animated-theme-toggler-vt'

const buttonRef = ref<HTMLButtonElement>()
const internalIsDark = ref(false)
const isControlled = computed(() => props.theme !== undefined)
const isDark = computed(() => (isControlled.value ? props.theme === 'dark' : internalIsDark.value))

let observer: MutationObserver | null = null
let isTransitioning = false
let activeAnimation: Animation | null = null

function syncFromDocument() {
  internalIsDark.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  syncFromDocument()
  observer = new MutationObserver(syncFromDocument)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  activeAnimation?.cancel()
  activeAnimation = null
  if (isTransitioning) document.getElementById(STYLE_ID)?.remove()
})

function applyTheme() {
  const nextTheme = isDark.value ? 'light' : 'dark'
  // Toggle synchronously so the view transition snapshots the new theme.
  document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  if (!isControlled.value) {
    internalIsDark.value = nextTheme === 'dark'
    try {
      localStorage.setItem('theme', nextTheme)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  }
  emit('themeChange', nextTheme)
  emit('update:theme', nextTheme)
}

/**
 * Replaces the browser's default cross-fade for the duration of one transition and pins the new
 * snapshot to its collapsed shape until the reveal animation takes over.
 */
function injectTransitionStyle(clipFrom: string) {
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = [
    '::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}',
    `::view-transition-new(root){clip-path:${clipFrom}}`,
  ].join('')
  document.head.appendChild(style)
  return style
}

function toggleTheme() {
  const button = buttonRef.value
  if (!button || isTransitioning) return

  if (typeof document.startViewTransition !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme()
    return
  }

  // innerWidth/innerHeight include classic scrollbars, matching the snapshot box.
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  let x = viewportWidth / 2
  let y = viewportHeight / 2
  if (!props.fromCenter) {
    const { top, left, width, height } = button.getBoundingClientRect()
    x = left + width / 2
    y = top + height / 2
  }
  const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y))
  const clipPath = getThemeTransitionClipPaths(props.variant, x, y, maxRadius, viewportWidth, viewportHeight)

  isTransitioning = true
  const style = injectTransitionStyle(clipPath[0])
  const transition = document.startViewTransition(async () => {
    applyTheme()
    await nextTick()
  })

  transition.ready
    .then(() => {
      activeAnimation = document.documentElement.animate(
        { clipPath },
        {
          duration: props.duration,
          // Linear avoids easing overshoot fighting the star's polygon interpolation.
          easing: props.variant === 'star' ? 'linear' : 'ease-in-out',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
    .catch(() => {})

  transition.finished
    .finally(() => {
      isTransitioning = false
      style.remove()
      activeAnimation?.cancel()
      activeAnimation = null
    })
    .catch(() => {})
}
</script>

<template>
  <button ref="buttonRef" type="button" :class="cn(props.class)" @click="toggleTheme">
    <Sun v-if="isDark" />
    <Moon v-else />
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
