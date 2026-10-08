<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { components } from '../catalog'
import DocsPageHeader from '../components/DocsPageHeader.vue'
import { site } from '../site'
</script>

<template>
  <article class="mx-auto max-w-3xl py-8 lg:py-10">
    <DocsPageHeader
      title="Introduction"
      :description="`${components.length}+ free and open-source animated components for ${site.framework}, built with Tailwind CSS and Motion.`"
      :crumbs="[{ title: 'Docs', to: '/docs' }, { title: 'Introduction' }]"
    />
    <div class="mt-8 flex flex-col gap-5 leading-7 text-foreground/90 [&_h2]:mt-6 [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight">
      <p>
        {{ site.name }} is a collection of polished, animated components you can drop into any {{ site.framework }} project.
        It brings the design-engineering style popularised by <a href="https://magicui.design" class="font-medium underline underline-offset-4" target="_blank" rel="noreferrer">Magic UI</a>
        to {{ site.framework }} — with the same component names and props, so ideas, docs and designs carry over.
      </p>
      <h2>Not a traditional component library</h2>
      <p>
        Like shadcn, the primary way to use it is to <strong>copy the source into your project</strong> — with the CLI or by hand —
        so you own the code and can change anything. Prefer a dependency? Every component is also published on npm as
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{{ site.npmPackage }}</code>.
      </p>
      <h2>Built on</h2>
      <ul class="ms-6 list-disc [&>li]:mt-2">
        <li><strong>{{ site.framework === 'Vue' ? 'Vue 3.5' : 'React 19' }}</strong> with TypeScript.</li>
        <li><strong>Tailwind CSS v4</strong> — every style is a utility class you can override with <code class="font-mono text-sm">class</code>.</li>
        <li><strong>{{ site.framework === 'Vue' ? 'motion-v' : 'Motion' }}</strong> for springs, gestures and scroll-linked animation.</li>
        <li><strong>The shadcn registry format</strong>, so <code class="font-mono text-sm">{{ site.cli }} add</code> installs a component, its dependencies and its keyframes in one step.</li>
      </ul>
      <h2>Also for {{ site.framework === 'Vue' ? 'React' : 'Vue' }}</h2>
      <p>
        The same catalogue is available as <a :href="site.sibling.url" class="font-medium underline underline-offset-4">{{ site.sibling.name }}</a>, with matching names and props.
      </p>
      <div class="mt-4 flex flex-wrap gap-3">
        <RouterLink to="/docs/installation" class="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Installation <ArrowRight class="size-4" />
        </RouterLink>
        <RouterLink to="/docs/components" class="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent">
          Browse components
        </RouterLink>
      </div>
    </div>
  </article>
</template>
