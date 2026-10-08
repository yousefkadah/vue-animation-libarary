<script setup lang="ts">
import { AvatarCircles } from '@/components/ui/avatar-circles'

const avatars = ['sarah', 'evan', 'anthony', 'daniel'].map((name) => ({
  imageUrl: `https://avatar.vercel.sh/${name}`,
  profileUrl: '#',
}))
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <AvatarCircles :num-people="8" :avatar-urls="avatars" class="-space-x-2 [&_img]:size-7 [&_span]:size-7 [&_span]:text-[10px]" />
    <AvatarCircles :num-people="12" :avatar-urls="avatars" />
    <AvatarCircles :num-people="36" :avatar-urls="avatars" class="-space-x-6 [&_img]:size-14 [&_span]:size-14 [&_span]:text-sm" />
  </div>
</template>
