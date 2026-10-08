var e=`<script setup lang="ts">
import { ConfettiButton } from '@/components/ui/confetti'

// A getter is read on every click, so each burst flies in a new direction.
const options = {
  get angle() {
    return Math.random() * 360
  },
}
<\/script>

<template>
  <div class="relative">
    <ConfettiButton :options="options">Random Confetti 🎉</ConfettiButton>
  </div>
</template>
`;export{e as default};