var e=`<script setup lang="ts">
import { GridPattern } from '@/components/ui/grid-pattern'
<\/script>

<template>
  <div class="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
    <GridPattern
      :width="30"
      :height="30"
      :x="-1"
      :y="-1"
      stroke-dasharray="4 2"
      class="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
    />
  </div>
</template>
`;export{e as default};