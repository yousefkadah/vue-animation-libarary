<script setup lang="ts">
import { IconCloud } from '@/components/ui/icon-cloud'

const slugs = [
  'typescript',
  'javascript',
  'dart',
  'vuedotjs',
  'nuxt',
  'flutter',
  'android',
  'html5',
  'css',
  'nodedotjs',
  'express',
  'vite',
  'prisma',
  'redis',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'vitest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'tailwindcss',
  'androidstudio',
  'graphql',
  'figma',
]

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)
</script>

<template>
  <div class="relative flex size-full items-center justify-center overflow-hidden">
    <IconCloud :images="images" />
  </div>
</template>
