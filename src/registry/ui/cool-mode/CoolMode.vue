<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { applyParticleEffect, type CoolModeOptions } from './particle-effect'

export interface CoolModeProps {
  class?: HTMLAttributes['class']
  /** Particle settings. Changing them restarts the effect. */
  options?: CoolModeOptions
}

const props = defineProps<CoolModeProps>()

const wrapperRef = ref<HTMLSpanElement>()
let cleanup: (() => void) | null = null

function start() {
  cleanup?.()
  cleanup = wrapperRef.value ? applyParticleEffect(wrapperRef.value, props.options) : null
}

onMounted(start)
watch(() => props.options, start, { deep: true })
onBeforeUnmount(() => {
  cleanup?.()
  cleanup = null
})
</script>

<template>
  <span ref="wrapperRef" :class="props.class">
    <slot />
  </span>
</template>
