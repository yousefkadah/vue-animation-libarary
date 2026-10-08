var e=`<script setup lang="ts">
import { ref } from 'vue'
import { RippleButton } from '@/components/ui/ripple-button'

const clicks = ref(0)
<\/script>

<template>
  <div class="flex flex-col items-center gap-3">
    <RippleButton
      ripple-color="#a855f7"
      duration="1s"
      class="rounded-full border-violet-500/40 px-6 py-2.5 font-medium text-violet-700 dark:text-violet-300"
      @click="clicks++"
    >
      Slow purple ripple
    </RippleButton>
    <p class="text-sm text-muted-foreground" aria-live="polite">Clicked {{ clicks }} {{ clicks === 1 ? 'time' : 'times' }}</p>
  </div>
</template>
`;export{e as default};