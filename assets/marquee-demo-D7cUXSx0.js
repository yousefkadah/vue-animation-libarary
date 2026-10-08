var e=`<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'

const reviews = [
  { name: 'Jack', username: '@jack', body: "I've never seen anything like this before. It's amazing. I love it.", img: 'https://avatar.vercel.sh/jack' },
  { name: 'Jill', username: '@jill', body: "I don't know what to say. I'm speechless. This is amazing.", img: 'https://avatar.vercel.sh/jill' },
  { name: 'John', username: '@john', body: "I'm at a loss for words. This is amazing. I love it.", img: 'https://avatar.vercel.sh/john' },
  { name: 'Jane', username: '@jane', body: "I'm at a loss for words. This is amazing. I love it.", img: 'https://avatar.vercel.sh/jane' },
  { name: 'Jenny', username: '@jenny', body: "I'm at a loss for words. This is amazing. I love it.", img: 'https://avatar.vercel.sh/jenny' },
  { name: 'James', username: '@james', body: "I'm at a loss for words. This is amazing. I love it.", img: 'https://avatar.vercel.sh/james' },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)
<\/script>

<template>
  <div class="relative flex w-full flex-col items-center justify-center overflow-hidden">
    <Marquee pause-on-hover duration="20s">
      <figure
        v-for="review in firstRow"
        :key="review.username"
        class="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] p-4 hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      >
        <div class="flex flex-row items-center gap-2">
          <img class="rounded-full" width="32" height="32" alt="" :src="review.img" />
          <div class="flex flex-col">
            <p class="text-sm font-medium dark:text-white">{{ review.name }}</p>
            <p class="text-xs font-medium dark:text-white/40">{{ review.username }}</p>
          </div>
        </div>
        <blockquote class="mt-2 text-sm">{{ review.body }}</blockquote>
      </figure>
    </Marquee>
    <Marquee reverse pause-on-hover duration="20s">
      <figure
        v-for="review in secondRow"
        :key="review.username"
        class="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] p-4 hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      >
        <div class="flex flex-row items-center gap-2">
          <img class="rounded-full" width="32" height="32" alt="" :src="review.img" />
          <div class="flex flex-col">
            <p class="text-sm font-medium dark:text-white">{{ review.name }}</p>
            <p class="text-xs font-medium dark:text-white/40">{{ review.username }}</p>
          </div>
        </div>
        <blockquote class="mt-2 text-sm">{{ review.body }}</blockquote>
      </figure>
    </Marquee>
    <div class="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background" />
    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background" />
  </div>
</template>
`;export{e as default};