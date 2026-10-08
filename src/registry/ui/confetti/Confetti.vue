<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import confetti from 'canvas-confetti'
import type { CreateTypes, GlobalOptions as ConfettiGlobalOptions, Options as ConfettiOptions } from 'canvas-confetti'
import { CONFETTI_INJECTION_KEY, type ConfettiRef } from './context'

export interface ConfettiProps {
  /** Classes for the canvas. Size it yourself, e.g. `absolute inset-0 size-full`. */
  class?: HTMLAttributes['class']
  /** Default options for every burst. */
  options?: ConfettiOptions
  /** Options for `confetti.create()`: `resize`, `useWorker`, `disableForReducedMotion`. */
  globalOptions?: ConfettiGlobalOptions
  /** Don't fire a burst on mount; call `fire()` yourself. */
  manualstart?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ConfettiProps>(), {
  globalOptions: () => ({ resize: true, useWorker: true }),
  manualstart: false,
})

const canvasRef = ref<HTMLCanvasElement>()
let instance: CreateTypes | null = null

async function fire(options: ConfettiOptions = {}) {
  try {
    await instance?.({ ...props.options, ...options })
  } catch (error) {
    console.error('Confetti error:', error)
  }
}

const api: ConfettiRef = { fire }
provide(CONFETTI_INJECTION_KEY, api)
defineExpose(api)

onMounted(() => {
  if (!canvasRef.value) return
  instance = confetti.create(canvasRef.value, { resize: true, useWorker: true, ...props.globalOptions })
  if (!props.manualstart) void fire()
})

onBeforeUnmount(() => {
  instance?.reset()
  instance = null
})
</script>

<template>
  <canvas ref="canvasRef" :class="props.class" v-bind="$attrs" />
  <slot />
</template>
