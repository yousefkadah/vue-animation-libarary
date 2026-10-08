var e=`<script setup lang="ts">
import { TypingAnimation } from '@/components/ui/typing-animation'

const cursors = [
  { style: 'line', label: 'Line cursor (default)' },
  { style: 'block', label: 'Block cursor (VS Code style)' },
  { style: 'underscore', label: 'Underscore cursor' },
] as const
<\/script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div v-for="cursor in cursors" :key="cursor.style">
      <p class="text-sm text-muted-foreground">{{ cursor.label }}</p>
      <TypingAnimation
        :words="[cursor.label.split(' (')[0]]"
        :cursor-style="cursor.style"
        loop
        class="text-3xl leading-tight font-bold"
      />
    </div>
  </div>
</template>
`;export{e as default};