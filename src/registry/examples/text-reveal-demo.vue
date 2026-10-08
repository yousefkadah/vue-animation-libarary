<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { ChevronsDown } from '@lucide/vue'
import { TextReveal } from '@/components/ui/text-reveal'

const scroller = useTemplateRef<HTMLElement>('scroller')
</script>

<template>
  <div class="relative w-full">
    <!-- The preview box is short, so TextReveal tracks this scroll area instead of the page. -->
    <div ref="scroller" class="h-[350px] w-full overflow-y-auto">
      <TextReveal :container="scroller" text="Vue Magic UI will change the way you design." class="h-[700px]" />
    </div>
    <div class="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
      Scroll
      <ChevronsDown class="size-3.5 animate-bounce motion-reduce:animate-none" />
    </div>
  </div>
</template>
