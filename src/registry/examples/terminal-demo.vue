<script setup lang="ts">
import { AnimatedSpan, Terminal, TerminalTypingAnimation } from '@/components/ui/terminal'
</script>

<template>
  <Terminal>
    <TerminalTypingAnimation>&gt; npx shadcn-vue@latest init</TerminalTypingAnimation>

    <AnimatedSpan class="text-green-500">✔ Preflight checks.</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Verifying framework. Found Vite.</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Validating Tailwind CSS.</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Validating import alias.</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Writing components.json.</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Checking registry.</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Updating src/assets/index.css</AnimatedSpan>
    <AnimatedSpan class="text-green-500">✔ Installing dependencies.</AnimatedSpan>

    <AnimatedSpan class="text-blue-500">
      <span>ℹ Updated 1 file:</span>
      <span class="pl-2">- src/lib/utils.ts</span>
    </AnimatedSpan>

    <TerminalTypingAnimation class="text-muted-foreground">Success! Project initialization completed.</TerminalTypingAnimation>
    <TerminalTypingAnimation class="text-muted-foreground">You may now add components.</TerminalTypingAnimation>
  </Terminal>
</template>
