var e=`<script setup lang="ts">
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
<\/script>

<template>
  <div class="flex flex-col items-center gap-3 p-6">
    <AnimatedThemeToggler
      from-center
      variant="star"
      :duration="700"
      class="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 [&_svg]:size-4"
    />
    <p class="text-sm text-muted-foreground">A slower star reveal that grows from the centre of the screen.</p>
  </div>
</template>
`;export{e as default};