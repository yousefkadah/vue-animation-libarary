<script setup lang="ts">
import { VideoText } from '@/components/ui/video-text'
</script>

<template>
  <div class="flex w-full max-w-xl flex-col items-center gap-2">
    <div class="relative h-[180px] w-full overflow-hidden">
      <VideoText
        as="h2"
        text="Spring"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        :font-size="24"
        :font-weight="900"
        font-family="Georgia, 'Times New Roman', serif"
      />
    </div>
    <p class="text-sm text-muted-foreground">Any font, weight or size: the mask is plain SVG text.</p>
  </div>
</template>
