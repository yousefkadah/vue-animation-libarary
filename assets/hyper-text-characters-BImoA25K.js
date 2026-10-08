var e=`<script setup lang="ts">
import { HyperText } from '@/components/ui/hyper-text'

const binary = ['0', '1']
const symbols = '!<>-_\\\\/[]{}—=+*^?#'.split('')
<\/script>

<template>
  <div class="flex flex-col items-center gap-2 text-center">
    <HyperText text="Decrypting" as="h2" :character-set="binary" :duration="1600" class="text-3xl sm:text-5xl" />
    <HyperText
      text="Access granted"
      as="p"
      :character-set="symbols"
      :delay="600"
      class="text-lg font-medium text-muted-foreground sm:text-xl"
    />
  </div>
</template>
`;export{e as default};