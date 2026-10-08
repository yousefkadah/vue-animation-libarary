<script setup lang="ts">
import CommandMenu from './docs/components/CommandMenu.vue'
import MobileNav from './docs/components/MobileNav.vue'
import SiteFooter from './docs/components/SiteFooter.vue'
import SiteHeader from './docs/components/SiteHeader.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <SiteFooter />
    <CommandMenu />
    <MobileNav />
  </div>
</template>
