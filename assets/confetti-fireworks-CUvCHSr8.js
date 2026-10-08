var e=`<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import confetti from 'canvas-confetti'

let interval: ReturnType<typeof setInterval> | undefined

function handleClick() {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

  clearInterval(interval)
  interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) return clearInterval(interval)

    const particleCount = 50 * (timeLeft / duration)
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
  }, 250)
}

onBeforeUnmount(() => clearInterval(interval))
<\/script>

<template>
  <div class="relative">
    <button type="button" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90" @click="handleClick">Trigger Fireworks</button>
  </div>
</template>
`;export{e as default};