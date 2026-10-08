<script setup lang="ts">
import confetti from 'canvas-confetti'

function handleClick() {
  const scalar = 2
  const unicorn = confetti.shapeFromText({ text: '🦄', scalar })

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [unicorn],
    scalar,
  }

  const shoot = () => {
    confetti({ ...defaults, particleCount: 30 })
    confetti({ ...defaults, particleCount: 5 })
    confetti({ ...defaults, particleCount: 15, scalar: scalar / 2, shapes: ['circle'] })
  }

  setTimeout(shoot, 0)
  setTimeout(shoot, 100)
  setTimeout(shoot, 200)
}
</script>

<template>
  <div class="relative justify-center">
    <button type="button" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90" @click="handleClick">Trigger Emoji</button>
  </div>
</template>
