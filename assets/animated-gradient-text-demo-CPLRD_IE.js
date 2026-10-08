var e=`<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'

/** Cuts the gradient down to a 1px ring (the padding box minus the content box). */
const ringMask = {
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'destination-out',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'subtract',
}
<\/script>

<template>
  <div
    class="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]"
  >
    <span
      class="animate-gradient absolute inset-0 block size-full rounded-[inherit] bg-linear-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-size-[300%_100%] p-px motion-reduce:animate-none"
      :style="ringMask"
    />
    🎉
    <hr class="mx-2 h-4 w-px shrink-0 border-0 bg-neutral-500" />
    <AnimatedGradientText class="text-sm font-medium">Introducing Vue Magic UI</AnimatedGradientText>
    <ChevronRight class="ms-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
  </div>
</template>
`;export{e as default};