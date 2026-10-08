<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'

const reviews = [
  { name: 'Jack', username: '@jack', body: "I've never seen anything like this before. It's amazing.", img: 'https://avatar.vercel.sh/jack' },
  { name: 'Jill', username: '@jill', body: "I don't know what to say. I'm speechless.", img: 'https://avatar.vercel.sh/jill' },
  { name: 'John', username: '@john', body: "I'm at a loss for words. This is amazing.", img: 'https://avatar.vercel.sh/john' },
  { name: 'Jane', username: '@jane', body: 'Shipped our landing page in an afternoon.', img: 'https://avatar.vercel.sh/jane' },
  { name: 'Jenny', username: '@jenny', body: 'The motion feels incredibly polished.', img: 'https://avatar.vercel.sh/jenny' },
  { name: 'James', username: '@james', body: 'Copy, paste, done. Love it.', img: 'https://avatar.vercel.sh/james' },
]
</script>

<template>
  <div class="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
    <Marquee pause-on-hover vertical duration="20s">
      <figure
        v-for="review in reviews.slice(0, 3)"
        :key="review.username"
        class="relative w-56 overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] p-4 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
      >
        <div class="flex items-center gap-2">
          <img class="rounded-full" width="32" height="32" alt="" :src="review.img" />
          <div class="flex flex-col">
            <p class="text-sm font-medium">{{ review.name }}</p>
            <p class="text-xs font-medium text-muted-foreground">{{ review.username }}</p>
          </div>
        </div>
        <blockquote class="mt-2 text-sm">{{ review.body }}</blockquote>
      </figure>
    </Marquee>
    <Marquee reverse pause-on-hover vertical duration="20s">
      <figure
        v-for="review in reviews.slice(3)"
        :key="review.username"
        class="relative w-56 overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] p-4 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
      >
        <div class="flex items-center gap-2">
          <img class="rounded-full" width="32" height="32" alt="" :src="review.img" />
          <div class="flex flex-col">
            <p class="text-sm font-medium">{{ review.name }}</p>
            <p class="text-xs font-medium text-muted-foreground">{{ review.username }}</p>
          </div>
        </div>
        <blockquote class="mt-2 text-sm">{{ review.body }}</blockquote>
      </figure>
    </Marquee>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-background" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background" />
  </div>
</template>
