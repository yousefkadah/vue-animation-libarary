var e=`<script setup lang="ts">
import { BorderBeam } from '@/components/ui/border-beam'
<\/script>

<template>
  <div class="relative flex h-48 w-[350px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-card shadow-sm">
    <p class="text-lg font-semibold">Counter-clockwise</p>
    <p class="text-sm text-muted-foreground">The beam travels in reverse.</p>
    <BorderBeam :duration="4" :size="300" reverse class="from-transparent via-green-500 to-transparent" />
  </div>
</template>
`;export{e as default};