<script setup lang="ts">
import DocsNav from '../components/DocsNav.vue'
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-2xl px-4 sm:px-6">
    <aside class="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto py-8 pe-4 md:block lg:w-64 [scrollbar-width:thin]">
      <DocsNav />
    </aside>
    <div class="min-w-0 flex-1 md:ps-6 lg:ps-10">
      <RouterView />
    </div>
  </div>
</template>
