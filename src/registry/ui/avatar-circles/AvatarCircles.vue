<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

export interface AvatarCircleItem {
  imageUrl: string
  profileUrl: string
}

export interface AvatarCirclesProps {
  class?: HTMLAttributes['class']
  /** Number shown in the last circle, e.g. `99` renders “+99”. Hidden when 0 or omitted. */
  numPeople?: number
  avatarUrls: AvatarCircleItem[]
}

const props = defineProps<AvatarCirclesProps>()
</script>

<template>
  <div :class="cn('z-10 flex -space-x-4 rtl:space-x-reverse', props.class)">
    <a
      v-for="(avatar, index) in props.avatarUrls"
      :key="index"
      :href="avatar.profileUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="rounded-full transition-transform hover:z-10 hover:-translate-y-0.5 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <img
        class="size-10 rounded-full border-2 border-background bg-muted"
        :src="avatar.imageUrl"
        width="40"
        height="40"
        :alt="`Avatar ${index + 1}`"
      />
    </a>
    <span
      v-if="(props.numPeople ?? 0) > 0"
      class="flex size-10 items-center justify-center rounded-full border-2 border-background bg-foreground text-center text-xs font-medium text-background"
      :aria-label="`${props.numPeople} more`"
    >
      +{{ props.numPeople }}
    </span>
  </div>
</template>
