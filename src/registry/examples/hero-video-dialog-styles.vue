<script setup lang="ts">
import { ref } from 'vue'
import { HeroVideoDialog, type HeroVideoAnimationStyle } from '@/components/ui/hero-video-dialog'

const styles: HeroVideoAnimationStyle[] = [
  'from-center',
  'from-bottom',
  'from-top',
  'from-left',
  'from-right',
  'fade',
  'top-in-bottom-out',
  'left-in-right-out',
]
const selected = ref<HeroVideoAnimationStyle>('from-left')
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <div class="flex flex-wrap justify-center gap-1.5" role="radiogroup" aria-label="Animation style">
      <button
        v-for="style in styles"
        :key="style"
        type="button"
        role="radio"
        :aria-checked="selected === style"
        class="rounded-full border px-3 py-1 font-mono text-xs transition-colors hover:bg-accent aria-checked:border-primary aria-checked:bg-primary aria-checked:text-primary-foreground"
        @click="selected = style"
      >
        {{ style }}
      </button>
    </div>
    <HeroVideoDialog
      :animation-style="selected"
      video-src="https://www.youtube.com/embed/OrxmtDw4pVI"
      thumbnail-src="https://i.ytimg.com/vi/OrxmtDw4pVI/maxresdefault.jpg"
      thumbnail-alt="Vue.js: The Documentary"
    />
  </div>
</template>
