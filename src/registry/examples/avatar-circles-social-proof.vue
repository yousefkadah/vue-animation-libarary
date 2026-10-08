<script setup lang="ts">
import { Star } from '@lucide/vue'
import { AvatarCircles } from '@/components/ui/avatar-circles'

const avatars = ['ava', 'liam', 'noah', 'emma', 'mia'].map((name) => ({
  imageUrl: `https://avatar.vercel.sh/${name}`,
  profileUrl: '#',
}))
</script>

<template>
  <div class="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
    <AvatarCircles :num-people="2400" :avatar-urls="avatars" class="[&_span]:w-auto [&_span]:px-2" />
    <div class="flex flex-col items-center sm:items-start">
      <div class="flex gap-0.5 text-amber-500" aria-label="Rated 5 out of 5">
        <Star v-for="star in 5" :key="star" class="size-4 fill-current" aria-hidden="true" />
      </div>
      <p class="text-sm text-muted-foreground">
        Loved by <span class="font-semibold text-foreground">2,400+</span> developers
      </p>
    </div>
  </div>
</template>
