<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface ShinyButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<ShinyButtonProps>()

const reducedMotion = useReducedMotion()

/** Spring that sweeps the `--x` light across the label, then repeats after a pause. */
const transition = computed(() =>
  reducedMotion.value
    ? { duration: 0 }
    : {
        repeat: Infinity,
        repeatType: 'loop' as const,
        repeatDelay: 1,
        type: 'spring' as const,
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: { type: 'spring' as const, stiffness: 200, damping: 5, mass: 0.5 },
      },
)

const labelMask =
  'linear-gradient(-75deg, var(--primary) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary) calc(var(--x) + 100%))'
const borderMask = 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))'
const tint = (amount: number) => `color-mix(in oklab, var(--primary) ${amount}%, transparent)`
const borderShine = `linear-gradient(-75deg, ${tint(10)} calc(var(--x) + 20%), ${tint(50)} calc(var(--x) + 25%), ${tint(10)} calc(var(--x) + 100%))`
</script>

<template>
  <motion.button
    :class="
      cn(
        'relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_10%,transparent)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_10%,transparent)]',
        props.class,
      )
    "
    :initial="{ '--x': '100%', scale: 0.8 }"
    :animate="{ '--x': '-100%', scale: 1 }"
    :while-press="{ scale: 0.95 }"
    :transition="transition"
  >
    <span
      class="relative block size-full text-sm tracking-wide text-[rgb(0,0,0,65%)] uppercase dark:font-light dark:text-[rgb(255,255,255,90%)]"
      :style="{ maskImage: labelMask, WebkitMaskImage: labelMask }"
    >
      <slot />
    </span>
    <span
      aria-hidden="true"
      class="absolute inset-0 z-10 block rounded-[inherit] p-px"
      :style="{ mask: borderMask, WebkitMask: borderMask, backgroundImage: borderShine }"
    />
  </motion.button>
</template>
