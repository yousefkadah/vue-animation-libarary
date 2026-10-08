var e=`<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Particles } from '@/components/ui/particles'

// White particles in dark mode, black in light mode.
const color = ref('#ffffff')
let observer: MutationObserver | undefined

function syncColor() {
  color.value = document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000'
}

onMounted(() => {
  syncColor()
  observer = new MutationObserver(syncColor)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => observer?.disconnect())
<\/script>

<template>
  <div class="relative flex h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
    <span class="pointer-events-none z-10 text-center text-8xl leading-none font-semibold whitespace-pre-wrap">Particles</span>
    <Particles class="absolute inset-0 z-0" :quantity="100" :ease="80" :color="color" refresh />
  </div>
</template>
`;export{e as default};