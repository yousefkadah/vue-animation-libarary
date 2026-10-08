<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { cn } from '@/lib/utils'

export interface MorphingTextProps {
  class?: HTMLAttributes['class']
  /** The texts to morph between, in order. */
  texts: string[]
}

const props = defineProps<MorphingTextProps>()

/** Seconds a morph takes. */
const MORPH_TIME = 1.5
/** Seconds each text rests before the next morph. */
const COOLDOWN_TIME = 0.5

/** Unique per instance so several MorphingTexts on one page don't share a filter. */
const filterId = `morphing-text-threshold-${useId().replace(/[^\w-]/g, '')}`

const text1 = ref<HTMLSpanElement | null>(null)
const text2 = ref<HTMLSpanElement | null>(null)

let textIndex = 0
let morph = 0
let cooldown = 0
let lastTime = 0
let frame: number | null = null
let reducedMotionQuery: MediaQueryList | null = null

function textAt(index: number) {
  return props.texts.length ? props.texts[index % props.texts.length] : ''
}

function setStyles(fraction: number) {
  const [current1, current2] = [text1.value, text2.value]
  if (!current1 || !current2) return

  current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
  current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

  const invertedFraction = 1 - fraction
  current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
  current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

  current1.textContent = textAt(textIndex)
  current2.textContent = textAt(textIndex + 1)
}

function doMorph() {
  morph -= cooldown
  cooldown = 0

  let fraction = morph / MORPH_TIME
  if (fraction > 1) {
    cooldown = COOLDOWN_TIME
    fraction = 1
  }
  // Reduced motion: keep the timing but swap texts in one step, without the blur.
  if (fraction < 1 && reducedMotionQuery?.matches) fraction = 0

  setStyles(fraction)

  if (fraction === 1) textIndex++
}

function doCooldown() {
  morph = 0
  const [current1, current2] = [text1.value, text2.value]
  if (current1 && current2) {
    current2.style.filter = 'none'
    current2.style.opacity = '100%'
    current1.style.filter = 'none'
    current1.style.opacity = '0%'
  }
}

function animate(now: number) {
  frame = requestAnimationFrame(animate)
  const dt = lastTime ? (now - lastTime) / 1000 : 0
  lastTime = now
  cooldown -= dt
  if (cooldown <= 0) doMorph()
  else doCooldown()
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  frame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (frame !== null) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    :class="
      cn(
        'relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]',
        props.class,
      )
    "
    :style="{ filter: `url(#${filterId}) blur(0.6px)` }"
  >
    <span class="sr-only">{{ props.texts.join(', ') }}</span>
    <span ref="text1" aria-hidden="true" class="absolute inset-x-0 top-0 m-auto inline-block w-full" />
    <span ref="text2" aria-hidden="true" class="absolute inset-x-0 top-0 m-auto inline-block w-full" />
    <svg aria-hidden="true" class="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter :id="filterId">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>
