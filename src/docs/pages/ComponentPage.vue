<script setup lang="ts">
import { ChevronLeft, ChevronRight, ExternalLink } from '@lucide/vue'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { categories, findComponent, neighbours } from '../catalog'
import CodeBlock from '../components/CodeBlock.vue'
import ComponentInstallation from '../components/ComponentInstallation.vue'
import ComponentPreview from '../components/ComponentPreview.vue'
import DocsPageHeader from '../components/DocsPageHeader.vue'
import PropsTable from '../components/PropsTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { site } from '../site'
import NotFoundPage from './NotFoundPage.vue'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const component = computed(() => findComponent(slug.value))
const siblings = computed(() => neighbours(slug.value))
const category = computed(() => categories.find((entry) => entry.id === component.value?.category))
const extraExamples = computed(() => component.value?.examples.slice(1) ?? [])

const toc = computed(() => {
  if (!component.value) return []
  return [
    { id: 'installation', title: 'Installation' },
    ...(component.value.usage ? [{ id: 'usage', title: 'Usage' }] : []),
    ...(extraExamples.value.length
      ? [
          { id: 'examples', title: 'Examples' },
          ...extraExamples.value.map((example) => ({ id: example.name, title: example.title, depth: 3 })),
        ]
      : []),
    ...(component.value.api?.length ? [{ id: 'props', title: 'Props' }] : []),
    ...(component.value.credit ? [{ id: 'credits', title: 'Credits' }] : []),
  ]
})

watchEffect(() => {
  document.title = component.value ? `${component.value.title} — ${site.name}` : site.name
})
</script>

<template>
  <NotFoundPage v-if="!component" />
  <div v-else class="flex gap-10 py-8 lg:py-10">
    <article :key="component.name" class="min-w-0 flex-1">
      <DocsPageHeader
        :title="component.title"
        :description="component.description"
        :crumbs="[{ title: 'Docs', to: '/docs' }, { title: 'Components', to: '/docs/components' }, { title: component.title }]"
      />
      <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span class="rounded-md border px-2 py-0.5 text-muted-foreground">{{ category?.title }}</span>
        <a
          :href="`${site.registryUrl}/${component.name}.json`"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-muted-foreground hover:text-foreground"
        >
          Registry JSON <ExternalLink class="size-3" />
        </a>
      </div>

      <ComponentPreview :name="component.examples[0].name" />

      <h2 id="installation" class="mt-12 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Installation</h2>
      <ComponentInstallation :component="component" />

      <template v-if="component.usage">
        <h2 id="usage" class="mt-12 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Usage</h2>
        <CodeBlock :code="component.usage" lang="vue" />
      </template>

      <template v-if="extraExamples.length">
        <h2 id="examples" class="mt-12 mb-2 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Examples</h2>
        <section v-for="example in extraExamples" :key="example.name" class="mt-8">
          <h3 :id="example.name" class="scroll-m-20 text-lg font-semibold tracking-tight">{{ example.title }}</h3>
          <p v-if="example.description" class="mt-1 text-sm text-muted-foreground">{{ example.description }}</p>
          <ComponentPreview :name="example.name" />
        </section>
      </template>

      <template v-if="component.api?.length">
        <h2 id="props" class="mt-12 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Props</h2>
        <PropsTable :api="component.api" />
      </template>

      <template v-if="component.credit">
        <h2 id="credits" class="mt-12 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">Credits</h2>
        <p class="text-muted-foreground">{{ component.credit }}</p>
      </template>

      <nav class="mt-16 flex items-center justify-between gap-4 border-t pt-6" aria-label="Pagination">
        <RouterLink
          v-if="siblings.previous"
          :to="`/docs/components/${siblings.previous.name}`"
          class="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium hover:bg-accent"
        >
          <ChevronLeft class="size-4" /> {{ siblings.previous.title }}
        </RouterLink>
        <span v-else />
        <RouterLink
          v-if="siblings.next"
          :to="`/docs/components/${siblings.next.name}`"
          class="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium hover:bg-accent"
        >
          {{ siblings.next.title }} <ChevronRight class="size-4" />
        </RouterLink>
      </nav>
    </article>
    <aside class="sticky top-20 hidden h-fit w-52 shrink-0 xl:block">
      <TableOfContents :items="toc" />
    </aside>
  </div>
</template>
