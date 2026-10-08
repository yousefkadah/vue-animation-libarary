var e=`<script setup lang="ts">
import { AnimatedSpan, Terminal, TerminalTypingAnimation } from '@/components/ui/terminal'
<\/script>

<template>
  <!-- With \`sequence\` off, every line runs on its own \`delay\` (in milliseconds). -->
  <Terminal :sequence="false">
    <TerminalTypingAnimation :delay="0">$ ls</TerminalTypingAnimation>
    <AnimatedSpan :delay="800" class="text-blue-500">Documents Downloads Pictures</AnimatedSpan>
    <TerminalTypingAnimation :delay="1600">$ cd Documents</TerminalTypingAnimation>
    <TerminalTypingAnimation :delay="2400">$ pwd</TerminalTypingAnimation>
    <AnimatedSpan :delay="3200" class="text-green-500">/home/user/Documents</AnimatedSpan>
  </Terminal>
</template>
`;export{e as default};