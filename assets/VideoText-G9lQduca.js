var e=`<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import { Comment, computed } from 'vue'
import { cn } from '@/lib/utils'

export interface VideoTextProps {
  /** The video source URL. */
  src: string
  /** The text the video plays inside. Falls back to the text content of the default slot. */
  text?: string
  class?: HTMLAttributes['class']
  /** Start playing as soon as possible. */
  autoPlay?: boolean
  /** Mute the video (required by browsers for autoplay). */
  muted?: boolean
  /** Restart the video when it ends. */
  loop?: boolean
  /** How much of the video to preload. */
  preload?: 'auto' | 'metadata' | 'none'
  /** Font size of the text mask. Numbers are read as \`vw\` of the mask box. */
  fontSize?: string | number
  /** Font weight of the text mask. */
  fontWeight?: string | number
  /** SVG \`text-anchor\` of the text mask. */
  textAnchor?: string
  /** SVG \`dominant-baseline\` of the text mask. */
  dominantBaseline?: string
  /** Font family of the text mask. */
  fontFamily?: string
  /** Element to render. */
  as?: string
}

const props = withDefaults(defineProps<VideoTextProps>(), {
  autoPlay: true,
  muted: true,
  loop: true,
  preload: 'auto',
  fontSize: 20,
  fontWeight: 'bold',
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fontFamily: 'sans-serif',
  as: 'div',
})

const slots = defineSlots<{ default?: () => unknown }>()

/** Plain text of the slot's vnodes; the mask is an SVG string, so it needs plain text. */
function textFromVNodes(nodes: unknown): string {
  if (!Array.isArray(nodes)) return ''
  return nodes
    .map((node: VNode) => {
      if (node.type === Comment) return ''
      if (typeof node.children === 'string') return node.children
      return textFromVNodes(node.children)
    })
    .join('')
}

const content = computed(() => props.text ?? textFromVNodes(slots.default?.()).trim())

const escapeXml = (value: string | number) =>
  String(value).replace(/[&<>'"]/g, (char) => \`&#\${char.charCodeAt(0)};\`)

const maskStyle = computed(() => {
  const fontSize = typeof props.fontSize === 'number' ? \`\${props.fontSize}vw\` : props.fontSize
  const svg =
    \`<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>\` +
    \`<text x='50%' y='50%' font-size='\${escapeXml(fontSize)}' font-weight='\${escapeXml(props.fontWeight)}' \` +
    \`text-anchor='\${escapeXml(props.textAnchor)}' dominant-baseline='\${escapeXml(props.dominantBaseline)}' \` +
    \`font-family='\${escapeXml(props.fontFamily)}'>\${escapeXml(content.value)}</text></svg>\`
  const mask = \`url("data:image/svg+xml,\${encodeURIComponent(svg)}")\`
  // The SVG has no intrinsic size, so it is stretched to exactly the box (\`contain\` left the
  // fit to the browser's guess of an aspect ratio).
  return {
    maskImage: mask,
    WebkitMaskImage: mask,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  }
})
<\/script>

<template>
  <component :is="props.as" :class="cn('relative size-full', props.class)">
    <!--
      p-px keeps the video 1px inside the mask box. Chrome snaps the mask tile and the video layer to
      device pixels independently, which could otherwise leave a 1px unmasked row of video at the
      top and bottom edges. The glyphs never reach the edges, so nothing visible is lost.
    -->
    <div class="absolute inset-0 flex items-center justify-center p-px" :style="maskStyle">
      <video
        class="h-full w-full object-cover"
        :autoplay="props.autoPlay"
        :muted="props.muted"
        :loop="props.loop"
        :preload="props.preload"
        playsinline
        aria-hidden="true"
      >
        <source :src="props.src" />
        Your browser does not support the video tag.
      </video>
    </div>
    <span class="sr-only">{{ content }}</span>
  </component>
</template>
`;export{e as default};