var e=`<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import confetti from 'canvas-confetti'

let frameId = 0

function handleClick() {
  const end = Date.now() + 3 * 1000
  const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1']

  const frame = () => {
    if (Date.now() > end) return
    confetti({ particleCount: 2, angle: 60, spread: 55, startVelocity: 60, origin: { x: 0, y: 0.5 }, colors })
    confetti({ particleCount: 2, angle: 120, spread: 55, startVelocity: 60, origin: { x: 1, y: 0.5 }, colors })
    frameId = requestAnimationFrame(frame)
  }

  cancelAnimationFrame(frameId)
  frame()
}

onBeforeUnmount(() => cancelAnimationFrame(frameId))
<\/script>

<template>
  <div class="relative">
    <button type="button" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90" @click="handleClick">Trigger Side Cannons</button>
  </div>
</template>
`;export{e as default};