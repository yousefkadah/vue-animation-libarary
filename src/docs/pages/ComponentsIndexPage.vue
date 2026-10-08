<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { components, groupedComponents } from '../catalog'
import DocsPageHeader from '../components/DocsPageHeader.vue'
</script>

<template>
  <article class="py-8 lg:py-10 xl:pe-6">
    <DocsPageHeader
      title="Components"
      :description="`${components.length} animated components, ready to copy and paste.`"
      :crumbs="[{ title: 'Docs', to: '/docs' }, { title: 'Components' }]"
    />
    <section v-for="group in groupedComponents" :key="group.id" class="mt-10">
      <h2 :id="group.id" class="mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
        {{ group.title }}
        <span class="ms-1 text-sm font-normal text-muted-foreground">{{ group.items.length }}</span>
      </h2>
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="item in group.items"
          :key="item.name"
          :to="`/docs/components/${item.name}`"
          class="group flex flex-col gap-1.5 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
        >
          <span class="flex items-center justify-between font-medium">
            {{ item.title }}
            <ArrowRight class="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
          <span class="line-clamp-2 text-sm text-muted-foreground">{{ item.description }}</span>
        </RouterLink>
      </div>
    </section>
  </article>
</template>
