var e=`<script setup lang="ts">
import { Highlighter } from '@/components/ui/highlighter'
<\/script>

<template>
  <article class="max-w-md space-y-3 text-left">
    <h3 class="text-xl font-semibold tracking-tight">Release notes</h3>
    <p class="leading-relaxed text-muted-foreground">
      This release makes the editor
      <Highlighter is-view action="highlight" color="#FDE68A" :animation-duration="900" class="text-foreground dark:text-black">
        twice as fast on large documents
      </Highlighter>
      and adds
      <Highlighter is-view action="underline" color="#22C55E" :iterations="3">offline support</Highlighter>
      for every workspace. Annotations with <code class="rounded bg-muted px-1 text-sm">is-view</code> wait until they
      scroll into view.
    </p>
  </article>
</template>
`;export{e as default};