var e=`<script setup lang="ts">
import { TypingAnimation } from '@/components/ui/typing-animation'
<\/script>

<template>
  <TypingAnimation
    :words="['Fast typing', 'Slow delete']"
    :type-speed="50"
    :delete-speed="150"
    :pause-delay="2000"
    loop
    class="font-mono text-3xl font-semibold sm:text-4xl"
  />
</template>
`;export{e as default};