var e=`<script setup lang="ts">
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
<\/script>

<template>
  <NeonGradientCard
    :border-size="3"
    :border-radius="28"
    :neon-colors="{ firstColor: '#f97316', secondColor: '#8b5cf6' }"
    class="w-full max-w-xs"
  >
    <div class="flex flex-col gap-3">
      <span class="w-fit rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
        Launch week
      </span>
      <h3 class="text-xl font-semibold tracking-tight">Ship your next idea tonight</h3>
      <p class="text-sm text-muted-foreground">
        Copy a component, tweak two props and watch it glow. Every colour is a prop away.
      </p>
      <button class="mt-2 h-9 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Get started
      </button>
    </div>
  </NeonGradientCard>
</template>
`;export{e as default};