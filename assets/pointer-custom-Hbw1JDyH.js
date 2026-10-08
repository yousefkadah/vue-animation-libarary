var e=`<script setup lang="ts">
import { Pointer } from '@/components/ui/pointer'
<\/script>

<template>
  <div class="relative flex h-64 w-full max-w-lg flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-background">
    <p class="text-2xl font-semibold tracking-tight">Hover me</p>
    <p class="text-sm text-muted-foreground">The cursor is replaced only inside this card.</p>
    <Pointer :transition="{ type: 'spring', stiffness: 400, damping: 20 }">
      <div class="flex items-center gap-1.5">
        <span class="size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30" />
        <span class="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-medium text-white shadow-sm">You</span>
      </div>
    </Pointer>
  </div>
</template>
`;export{e as default};