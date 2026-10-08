<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

defineProps<{ title: string; description?: string; crumbs?: { title: string; to?: string }[] }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <nav v-if="crumbs?.length" class="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <template v-for="(crumb, index) in crumbs" :key="crumb.title">
        <ChevronRight v-if="index > 0" class="size-3.5" />
        <RouterLink v-if="crumb.to" :to="crumb.to" class="hover:text-foreground">{{ crumb.title }}</RouterLink>
        <span v-else class="text-foreground">{{ crumb.title }}</span>
      </template>
    </nav>
    <h1 class="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl">{{ title }}</h1>
    <p v-if="description" class="text-lg text-balance text-muted-foreground">{{ description }}</p>
  </div>
</template>
