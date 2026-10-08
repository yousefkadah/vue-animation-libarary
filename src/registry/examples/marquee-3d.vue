<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'

const reviews = ['jack', 'jill', 'john', 'jane', 'jenny', 'james', 'jade', 'jules'].map((name) => ({
  name: name[0].toUpperCase() + name.slice(1),
  username: `@${name}`,
  body: 'This library made our product feel alive.',
  img: `https://avatar.vercel.sh/${name}`,
}))

const rows = [reviews.slice(0, 4), reviews.slice(4), reviews.slice(2, 6), reviews.slice(1, 5)]
</script>

<template>
  <div class="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
    <div
      class="flex flex-row items-center gap-4"
      style="transform: translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)"
    >
      <Marquee
        v-for="(row, index) in rows"
        :key="index"
        vertical
        pause-on-hover
        :reverse="index % 2 === 1"
        duration="20s"
      >
        <figure
          v-for="review in row"
          :key="review.username"
          class="relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] p-4 sm:w-36 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
        >
          <div class="flex flex-row items-center gap-2">
            <img class="rounded-full" width="32" height="32" alt="" :src="review.img" />
            <div class="flex flex-col">
              <p class="text-sm font-medium">{{ review.name }}</p>
              <p class="text-xs font-medium text-muted-foreground">{{ review.username }}</p>
            </div>
          </div>
          <blockquote class="mt-2 text-sm">{{ review.body }}</blockquote>
        </figure>
      </Marquee>
    </div>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background" />
    <div class="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background" />
  </div>
</template>
