<script setup lang="ts">
import { ArrowRight, ChevronRight } from '@lucide/vue'
import { computed, defineAsyncComponent } from 'vue'
import { components, exampleNames, findComponent, loadExample } from '../catalog'
import CodeBlock from '../components/CodeBlock.vue'
import { runCommand, site } from '../site'

/** Live demos shown on the landing page, in order. Missing ones are skipped. */
const featuredExamples = [
  { example: 'globe-demo', span: 'md:col-span-2 md:row-span-2' },
  { example: 'animated-beam-multiple-outputs', span: 'md:col-span-2' },
  { example: 'border-beam-demo', span: '' },
  { example: 'shimmer-button-demo', span: '' },
  { example: 'animated-list-demo', span: 'md:row-span-2' },
  { example: 'number-ticker-demo', span: '' },
  { example: 'hyper-text-demo', span: '' },
  { example: 'dock-demo', span: 'md:col-span-2' },
  { example: 'marquee-demo', span: 'md:col-span-2' },
  { example: 'flickering-grid-demo', span: 'md:col-span-2' },
  { example: 'blur-fade-text', span: '' },
  { example: 'confetti-demo', span: '' },
]

const available = new Set(exampleNames())
const featured = computed(() =>
  featuredExamples
    .filter((entry) => available.has(entry.example))
    .map((entry) => {
      const slug = components.find((component) => component.examples.some((example) => example.name === entry.example))?.name ?? ''
      return {
        ...entry,
        component: findComponent(slug),
        view: defineAsyncComponent(() => loadExample(entry.example)),
      }
    }),
)

const heroMarquee = computed(() => components.slice(0, 24))
</script>

<template>
  <div class="relative overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_at_top,var(--color-brand)_0%,transparent_60%)] opacity-[0.12]" />
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] bg-[size:48px_48px] opacity-40" />

    <section class="mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:pt-28">
      <RouterLink
        to="/docs/components"
        class="group inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur transition-colors hover:bg-accent"
      >
        <span>✨</span>
        <span class="h-4 w-px bg-border" />
        <span class="bg-[linear-gradient(110deg,var(--color-muted-foreground)_35%,var(--color-foreground)_50%,var(--color-muted-foreground)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[home-shine_3s_linear_infinite]">
          {{ components.length }} components · v2 is here
        </span>
        <ChevronRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </RouterLink>

      <h1 class="mt-8 text-5xl leading-[1.05] font-semibold tracking-tighter text-balance sm:text-7xl">
        UI library for
        <span class="bg-linear-to-br from-foreground via-foreground/80 to-brand bg-clip-text text-transparent">Design Engineers</span>
        <span class="block text-3xl font-medium tracking-tight text-muted-foreground sm:text-5xl">who build with {{ site.framework }}</span>
      </h1>
      <p class="mt-6 max-w-2xl text-lg text-balance text-muted-foreground">
        {{ components.length }}+ free and open-source animated components built with {{ site.framework }}, TypeScript,
        Tailwind CSS and Motion. Copy them into your app with one command.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <RouterLink
          to="/docs/components"
          class="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        >
          Browse Components
          <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
        <RouterLink to="/docs/installation" class="inline-flex h-11 items-center justify-center rounded-lg border bg-background px-6 text-sm font-medium hover:bg-accent">
          Get Started
        </RouterLink>
      </div>
      <div class="mt-8 w-full max-w-xl text-start">
        <CodeBlock :code="runCommand('npm', `${site.cli} add ${site.registryUrl}/marquee.json`)" lang="bash" />
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        Using React? <a :href="site.sibling.url" class="font-medium text-foreground underline underline-offset-4">{{ site.sibling.name }}</a> has the same components.
      </p>
    </section>

    <section class="relative mx-auto max-w-6xl overflow-hidden px-4 pb-6">
      <div class="flex w-max gap-3 motion-safe:animate-[home-marquee_60s_linear_infinite] hover:[animation-play-state:paused]">
        <RouterLink
          v-for="(item, index) in [...heroMarquee, ...heroMarquee]"
          :key="`${item.name}-${index}`"
          :to="`/docs/components/${item.name}`"
          class="shrink-0 rounded-full border bg-background/70 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur hover:text-foreground"
        >
          {{ item.title }}
        </RouterLink>
      </div>
      <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background" />
      <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background" />
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16">
      <div class="mb-10 flex flex-col items-center gap-2 text-center">
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">Live, not screenshots</h2>
        <p class="max-w-xl text-muted-foreground">Every tile below is a real component running on this page.</p>
      </div>
      <div class="grid auto-rows-[260px] gap-4 md:grid-cols-4">
        <div
          v-for="tile in featured"
          :key="tile.example"
          :class="['group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-xl', tile.span]"
        >
          <div class="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4 [&>*]:max-h-full [&>*]:max-w-full">
            <component :is="tile.view" />
          </div>
          <RouterLink
            :to="`/docs/components/${tile.component?.name}`"
            class="flex items-center justify-between border-t bg-background/80 px-4 py-2.5 text-sm backdrop-blur"
          >
            <span class="font-medium">{{ tile.component?.title }}</span>
            <ArrowRight class="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-4 py-16 text-center">
      <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">Own the code</h2>
      <p class="mx-auto mt-3 max-w-2xl text-muted-foreground">
        Components are copied into your project, not hidden in node_modules. Tweak a duration, swap a colour,
        rewrite the whole thing — it's yours. Prefer a package? It's on npm too.
      </p>
      <div class="mt-8 grid gap-4 text-start sm:grid-cols-3">
        <div class="rounded-xl border bg-card p-5">
          <p class="font-medium">Copy &amp; paste</p>
          <p class="mt-1 text-sm text-muted-foreground">One CLI command adds the source, npm deps and keyframes.</p>
        </div>
        <div class="rounded-xl border bg-card p-5">
          <p class="font-medium">Typed props</p>
          <p class="mt-1 text-sm text-muted-foreground">Every prop documented with its type and default.</p>
        </div>
        <div class="rounded-xl border bg-card p-5">
          <p class="font-medium">Reduced motion</p>
          <p class="mt-1 text-sm text-muted-foreground">Looping animations respect prefers-reduced-motion.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@keyframes home-marquee {
  to {
    transform: translateX(-50%);
  }
}
@keyframes home-shine {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: -100% 0;
  }
}
</style>
