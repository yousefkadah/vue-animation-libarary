<script setup lang="ts">
import { Menu, Search } from '@lucide/vue'
import { useRoute } from 'vue-router'
import { site } from '../site'
import { commandMenuOpen, mobileNavOpen } from '../state'
import GithubIcon from './GithubIcon.vue'
import SiteLogo from './SiteLogo.vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
    <div class="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 sm:px-6">
      <button
        type="button"
        class="-ms-2 inline-flex size-9 items-center justify-center rounded-md hover:bg-accent md:hidden"
        aria-label="Open navigation"
        @click="mobileNavOpen = true"
      >
        <Menu class="size-5" />
      </button>

      <RouterLink to="/" class="flex items-center gap-2 font-semibold tracking-tight">
        <SiteLogo class="size-6" />
        <span class="hidden sm:inline">{{ site.name }}</span>
      </RouterLink>

      <nav class="hidden items-center gap-5 text-sm md:flex">
        <RouterLink
          to="/docs"
          class="transition-colors hover:text-foreground"
          :class="route.path === '/docs' || route.path === '/docs/installation' ? 'text-foreground' : 'text-muted-foreground'"
        >
          Docs
        </RouterLink>
        <RouterLink
          to="/docs/components"
          class="transition-colors hover:text-foreground"
          :class="route.path.startsWith('/docs/components') ? 'text-foreground' : 'text-muted-foreground'"
        >
          Components
        </RouterLink>
        <a :href="site.sibling.url" class="text-muted-foreground transition-colors hover:text-foreground">
          {{ site.sibling.name }}
        </a>
      </nav>

      <div class="ms-auto flex items-center gap-1">
        <button
          type="button"
          class="me-1 inline-flex h-9 items-center gap-2 rounded-md border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:w-56 lg:w-64"
          @click="commandMenuOpen = true"
        >
          <Search class="size-4" />
          <span class="hidden sm:inline">Search components...</span>
          <kbd class="pointer-events-none ms-auto hidden h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
            {{ isMac ? '⌘' : 'Ctrl' }} K
          </kbd>
        </button>
        <a
          :href="site.repository"
          target="_blank"
          rel="noreferrer"
          class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="GitHub repository"
        >
          <GithubIcon class="size-4" />
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
