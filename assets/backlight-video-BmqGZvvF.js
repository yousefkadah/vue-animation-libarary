var e=`<script setup lang="ts">
import { Backlight } from '@/components/ui/backlight'
<\/script>

<template>
  <Backlight :blur="40" class="w-full py-10">
    <video
      class="mx-auto aspect-video w-full max-w-md rounded-xl object-cover"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      autoplay
      muted
      loop
      playsinline
    />
  </Backlight>
</template>
`;export{e as default};