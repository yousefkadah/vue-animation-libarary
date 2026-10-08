<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import DocsPageHeader from '../components/DocsPageHeader.vue'
import TabList from '../components/TabList.vue'
import { installCommand, packageManagers, runCommand, site, type PackageManager } from '../site'

const manager = ref<PackageManager>('pnpm')
const registriesJson = JSON.stringify({ registries: { '@magic': `${site.registryUrl}/{name}.json` } }, null, 2)
const npmCss = `@import "tailwindcss";
@import "${site.npmPackage}/theme.css";

/* Let Tailwind see the classes used inside the package */
@source "../node_modules/${site.npmPackage}/dist";`
</script>

<template>
  <article class="mx-auto max-w-3xl py-8 lg:py-10">
    <DocsPageHeader
      title="Installation"
      description="Add components with the CLI, by copy-paste, or from npm."
      :crumbs="[{ title: 'Docs', to: '/docs' }, { title: 'Installation' }]"
    />
    <div class="mt-6 flex justify-end">
      <TabList v-model="manager" :tabs="packageManagers" label="Package manager" size="sm" />
    </div>
    <div class="mt-4 flex flex-col gap-4 leading-7 [&_h2]:mt-8 [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-4 [&_h3]:font-semibold">
      <h2 id="cli">1. Set up {{ site.cli.replace('@latest', '') }}</h2>
      <p>
        Components rely on Tailwind CSS v4 and the <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">cn</code> helper. If your project
        doesn't use {{ site.cli.replace('@latest', '') }} yet, initialise it once:
      </p>
      <CodeBlock :code="runCommand(manager, `${site.cli} init`)" lang="bash" />

      <h3>Add a component</h3>
      <p>Each component page has its own command. It copies the source into <code class="font-mono text-sm">components/ui</code>, installs npm dependencies and adds any keyframes to your CSS.</p>
      <CodeBlock :code="runCommand(manager, `${site.cli} add ${site.registryUrl}/marquee.json`)" lang="bash" />

      <h3>Use a namespace (optional)</h3>
      <p>Register the registry once in <code class="font-mono text-sm">components.json</code> and add components by name:</p>
      <CodeBlock
        lang="json"
        filename="components.json"
        :code="registriesJson"
      />
      <CodeBlock :code="runCommand(manager, `${site.cli} add @magic/marquee`)" lang="bash" />

      <h2 id="npm">2. Or install from npm</h2>
      <CodeBlock :code="installCommand(manager, [site.npmPackage])" lang="bash" />
      <p>Import the animation theme and let Tailwind scan the package:</p>
      <CodeBlock :code="npmCss" lang="css" filename="assets/main.css" />
      <p>Components use the shadcn colour tokens (<code class="font-mono text-sm">background</code>, <code class="font-mono text-sm">foreground</code>, <code class="font-mono text-sm">muted</code>, <code class="font-mono text-sm">border</code>, <code class="font-mono text-sm">primary</code>…). Any shadcn theme provides them.</p>

      <h2 id="ai">3. AI assistants</h2>
      <p>
        A machine-readable index of every component lives at
        <a :href="`${site.registryUrl.replace('/r', '')}/llms.txt`" class="font-medium underline underline-offset-4">llms.txt</a>.
      </p>
    </div>
  </article>
</template>
