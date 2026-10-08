<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { Play, XIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'

export type HeroVideoAnimationStyle =
  | 'from-bottom'
  | 'from-center'
  | 'from-top'
  | 'from-left'
  | 'from-right'
  | 'fade'
  | 'top-in-bottom-out'
  | 'left-in-right-out'

export interface HeroVideoDialogProps {
  class?: HTMLAttributes['class']
  /** How the video dialog enters and leaves. */
  animationStyle?: HeroVideoAnimationStyle
  /** Embeddable video URL (for YouTube, the `/embed/` URL). */
  videoSrc: string
  /** Thumbnail shown behind the play button. */
  thumbnailSrc: string
  thumbnailAlt?: string
}

const props = withDefaults(defineProps<HeroVideoDialogProps>(), {
  animationStyle: 'from-center',
  thumbnailAlt: 'Video thumbnail',
})

const emit = defineEmits<{
  open: []
  close: []
}>()

const animationVariants = {
  'from-bottom': {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'from-center': {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  'from-top': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  'from-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'from-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'top-in-bottom-out': {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'left-in-right-out': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
} as const

const selectedAnimation = computed(() => animationVariants[props.animationStyle] ?? animationVariants['from-center'])

const isVideoOpen = ref(false)
const titleId = useId()
const triggerRef = ref<HTMLButtonElement | null>(null)
const dialogRef = ref()
const closeButtonRef = ref<HTMLButtonElement | null>(null)

function open() {
  isVideoOpen.value = true
}

function close() {
  isVideoOpen.value = false
}

function dialogElement(): HTMLElement | null {
  const value = dialogRef.value
  return (value?.$el ?? value ?? null) as HTMLElement | null
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== 'Tab') return
  const dialog = dialogElement()
  if (!dialog) return
  const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button, iframe, [href], [tabindex]:not([tabindex="-1"])'))
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

/** Keeps focus inside the dialog while it is open. */
function onFocusIn(event: FocusEvent) {
  const dialog = dialogElement()
  if (dialog && event.target instanceof Node && !dialog.contains(event.target)) closeButtonRef.value?.focus()
}

let previousOverflow = ''
function setListeners(active: boolean) {
  if (active) {
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('focusin', onFocusIn)
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('focusin', onFocusIn)
    document.body.style.overflow = previousOverflow
  }
}

watch(isVideoOpen, async (value) => {
  setListeners(value)
  if (value) {
    emit('open')
    await nextTick()
    closeButtonRef.value?.focus()
  } else {
    emit('close')
    triggerRef.value?.focus()
  }
})

onBeforeUnmount(() => {
  if (isVideoOpen.value) setListeners(false)
})
</script>

<template>
  <div :class="cn('relative', props.class)">
    <button
      ref="triggerRef"
      type="button"
      aria-label="Play video"
      aria-haspopup="dialog"
      class="group relative cursor-pointer border-0 bg-transparent p-0"
      @click="open"
    >
      <img
        :src="props.thumbnailSrc"
        :alt="props.thumbnailAlt"
        width="1920"
        height="1080"
        class="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
      />
      <div
        class="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100"
      >
        <div class="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
          <div
            class="relative flex size-20 scale-100 items-center justify-center rounded-full bg-linear-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
          >
            <Play
              class="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
              :style="{ filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))' }"
            />
          </div>
        </div>
      </div>
    </button>

    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="isVideoOpen"
          key="hero-video-backdrop"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          @click.self="close"
        >
          <motion.div
            ref="dialogRef"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            class="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
            :initial="selectedAnimation.initial"
            :animate="selectedAnimation.animate"
            :exit="selectedAnimation.exit"
            :transition="{ type: 'spring', damping: 30, stiffness: 300 }"
          >
            <span :id="titleId" class="sr-only">{{ props.thumbnailAlt }}</span>
            <button
              ref="closeButtonRef"
              type="button"
              aria-label="Close video"
              class="absolute -top-16 end-0 cursor-pointer rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
              @click="close"
            >
              <XIcon class="size-5" />
            </button>
            <div class="relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white">
              <iframe
                :src="props.videoSrc"
                title="Hero Video player"
                class="size-full rounded-2xl"
                allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </div>
</template>
