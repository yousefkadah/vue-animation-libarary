var e=`<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface GlareHoverProps {
  class?: HTMLAttributes['class']
  /** CSS width of the root, e.g. \`100%\` or \`320px\`. */
  width?: string
  /** CSS height of the root, e.g. \`auto\` or \`200px\`. */
  height?: string
  /** Background colour of the wrapper. */
  background?: string
  /** Glare colour as \`#rgb\` or \`#rrggbb\` (converted to \`rgba\` with \`opacity\`). */
  color?: string
  /** Opacity of the glare colour, 0–1. */
  opacity?: number
  /** Angle of the glare in degrees. */
  angle?: number
  /** Size of the glare tile as a percentage of the element. */
  size?: number
  /** Duration of the sweep in milliseconds. */
  duration?: number
  /** Only animate while hovered — the glare snaps back instead of sweeping out. */
  playOnce?: boolean
}

const props = withDefaults(defineProps<GlareHoverProps>(), {
  background: '#000',
  color: '#ffffff',
  opacity: 0.5,
  angle: -45,
  size: 250,
  duration: 650,
  playOnce: false,
})

function parseHex(color: string, opacity: number): string {
  const hex = color.replace('#', '')
  const parse = (value: string) => Number.parseInt(value, 16)
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return \`rgba(\${parse(hex.slice(0, 2))},\${parse(hex.slice(2, 4))},\${parse(hex.slice(4, 6))},\${opacity})\`
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return \`rgba(\${parse(hex[0] + hex[0])},\${parse(hex[1] + hex[1])},\${parse(hex[2] + hex[2])},\${opacity})\`
  }
  return color
}

const style = computed(() => ({
  '--gh-angle': \`\${props.angle}deg\`,
  '--gh-duration': \`\${props.duration}ms\`,
  '--gh-size': \`\${props.size}%\`,
  '--gh-rgba': parseHex(props.color, props.opacity),
  background: props.background,
  ...(props.width !== undefined ? { width: props.width } : {}),
  ...(props.height !== undefined ? { height: props.height } : {}),
}))
<\/script>

<template>
  <div
    :style="style"
    :class="
      cn(
        'relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent',
        'before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat',
        'before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]',
        'before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]',
        'before:[background-position:-100%_-100%,0_0]',
        !props.playOnce && 'before:transition-[background-position] before:duration-(--gh-duration) before:ease-in-out',
        props.playOnce &&
          'before:transition-none hover:before:transition-[background-position] hover:before:duration-(--gh-duration)',
        'hover:before:[background-position:100%_100%,0_0]',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
`;export{e as default};