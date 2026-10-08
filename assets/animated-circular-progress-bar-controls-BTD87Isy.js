var e=`<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus } from '@lucide/vue'
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar'

const value = ref(40)
const step = (delta: number) => {
  value.value = Math.min(100, Math.max(0, value.value + delta))
}
<\/script>

<template>
  <div class="flex items-center gap-6">
    <button
      type="button"
      aria-label="Decrease"
      class="inline-flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-accent disabled:opacity-50"
      :disabled="value <= 0"
      @click="step(-10)"
    >
      <Minus class="size-4" />
    </button>
    <AnimatedCircularProgressBar
      :value="value"
      gauge-primary-color="#10b981"
      gauge-secondary-color="var(--track)"
      class="[--track:rgba(0,0,0,0.08)] dark:[--track:rgba(255,255,255,0.12)]"
    />
    <button
      type="button"
      aria-label="Increase"
      class="inline-flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-accent disabled:opacity-50"
      :disabled="value >= 100"
      @click="step(10)"
    >
      <Plus class="size-4" />
    </button>
  </div>
</template>
`;export{e as default};