<script setup lang="ts">
import { X } from '@lucide/vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { mobileNavOpen } from '../state'
import DocsNav from './DocsNav.vue'

const route = useRoute()
watch(() => route.fullPath, () => (mobileNavOpen.value = false))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileNavOpen" class="fixed inset-0 z-50 bg-black/50 md:hidden" @click="mobileNavOpen = false" />
    </Transition>
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="-translate-x-full"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="mobileNavOpen"
        class="fixed inset-y-0 start-0 z-50 w-72 overflow-y-auto border-e bg-background p-4 shadow-xl md:hidden"
        aria-label="Navigation"
      >
        <div class="mb-4 flex items-center justify-between">
          <RouterLink to="/" class="font-semibold">Home</RouterLink>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md hover:bg-accent"
            aria-label="Close navigation"
            @click="mobileNavOpen = false"
          >
            <X class="size-4" />
          </button>
        </div>
        <DocsNav @navigate="mobileNavOpen = false" />
      </aside>
    </Transition>
  </Teleport>
</template>
