<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { cn } from '@/lib/utils'

export interface WarpBackgroundProps {
  class?: HTMLAttributes['class']
  /** CSS perspective of the tunnel in pixels. */
  perspective?: number
  /** Number of beams on each of the four walls. */
  beamsPerSide?: number
  /** Size of a beam (and of a grid cell) as a percentage of the wall. */
  beamSize?: number
  /** Maximum random delay in seconds before a beam starts. */
  beamDelayMax?: number
  /** Minimum random delay in seconds before a beam starts. */
  beamDelayMin?: number
  /** Seconds a beam takes to travel the length of a wall. */
  beamDuration?: number
  /** Colour of the grid lines. */
  gridColor?: string
}

const props = withDefaults(defineProps<WarpBackgroundProps>(), {
  perspective: 100,
  beamsPerSide: 3,
  beamSize: 5,
  beamDelayMax: 3,
  beamDelayMin: 0,
  beamDuration: 3,
  gridColor: 'var(--border)',
})

interface Beam {
  x: number
  delay: number
  hue: number
  aspectRatio: number
}

type Side = 'top' | 'bottom' | 'left' | 'right'

const grid =
  'bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] transform-3d'

/** The four walls of the tunnel, each folded 90° into the screen. */
const sides: { name: Side; class: string }[] = [
  { name: 'top', class: `@container absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] ${grid}` },
  { name: 'bottom', class: `@container absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] transform-[rotateX(-90deg)] ${grid}` },
  {
    name: 'left',
    class: `@container absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] transform-[rotate(90deg)_rotateX(-90deg)] ${grid}`,
  },
  {
    name: 'right',
    class: `@container absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] transform-[rotate(-90deg)_rotateX(-90deg)] ${grid}`,
  },
]

const reducedMotion = useReducedMotion()

// Beams are random, so they are generated on the client only.
const beams = ref<Record<Side, Beam[]>>({ top: [], bottom: [], left: [], right: [] })

function generateBeams(): Beam[] {
  const cellsPerSide = Math.floor(100 / props.beamSize)
  const step = cellsPerSide / props.beamsPerSide
  return Array.from({ length: props.beamsPerSide }, (_, index) => ({
    x: Math.floor(index * step),
    delay: Math.random() * (props.beamDelayMax - props.beamDelayMin) + props.beamDelayMin,
    hue: Math.floor(Math.random() * 360),
    aspectRatio: Math.floor(Math.random() * 10) + 1,
  }))
}

function generate() {
  beams.value = { top: generateBeams(), bottom: generateBeams(), left: generateBeams(), right: generateBeams() }
}

onMounted(generate)
watch(() => [props.beamsPerSide, props.beamSize, props.beamDelayMax, props.beamDelayMin], generate)
</script>

<template>
  <div :class="cn('relative rounded border p-20', props.class)">
    <div
      aria-hidden="true"
      :style="{
        '--perspective': `${props.perspective}px`,
        '--grid-color': props.gridColor,
        '--beam-size': `${props.beamSize}%`,
      }"
      class="pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clip-path:inset(0)] perspective-(--perspective) transform-3d @container-[size]"
    >
      <div v-for="side in sides" :key="side.name" :class="side.class">
        <template v-if="!reducedMotion">
          <motion.div
            v-for="(beam, index) in beams[side.name]"
            :key="`${side.name}-${index}`"
            :style="{
              '--x': `${beam.x * props.beamSize}%`,
              '--width': `${props.beamSize}%`,
              '--aspect-ratio': `${beam.aspectRatio}`,
              '--background': `linear-gradient(hsl(${beam.hue} 80% 60%), transparent)`,
            }"
            class="absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--background)]"
            :initial="{ y: '100cqmax', x: '-50%' }"
            :animate="{ y: '-100%', x: '-50%' }"
            :transition="{ duration: props.beamDuration, delay: beam.delay, repeat: Infinity, ease: 'linear' }"
          />
        </template>
      </div>
    </div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
