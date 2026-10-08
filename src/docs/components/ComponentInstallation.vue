<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { loadComponentFiles, renderCss, type ComponentMeta } from '../catalog'
import { installCommand, packageManagers, runCommand, site, type PackageManager } from '../site'
import CodeBlock from './CodeBlock.vue'
import TabList from './TabList.vue'

const props = defineProps<{ component: ComponentMeta }>()

const mode = ref<'CLI' | 'Manual' | 'npm'>('CLI')
const manager = ref<PackageManager>('pnpm')
const files = ref<{ path: string; code: string }[]>([])

watchEffect(async () => {
  files.value = await loadComponentFiles(props.component.name)
})

const cliCommand = computed(() =>
  runCommand(manager.value, `${site.cli} add ${site.registryUrl}/${props.component.name}.json`),
)
const dependencies = computed(() => ['clsx', 'tailwind-merge', ...(props.component.dependencies ?? [])])
const css = computed(() => renderCss(props.component))
const npmImport = computed(
  () => `import { ${props.component.exports.join(', ')} } from '${site.npmPackage}'`,
)
const npmCss = `@import "tailwindcss";
@import "${site.npmPackage}/theme.css";

/* Let Tailwind see the classes used inside the package */
@source "../node_modules/${site.npmPackage}/dist";`
</script>

<template>
  <div class="flex flex-col gap-3">
    <TabList v-model="mode" :tabs="['CLI', 'Manual', 'npm'] as const" label="Installation method" />

    <div v-if="mode === 'CLI'" class="rounded-xl border">
      <div class="flex items-center border-b px-2 py-1.5">
        <TabList v-model="manager" :tabs="packageManagers" label="Package manager" size="sm" />
      </div>
      <div class="[&>div]:rounded-none [&>div]:border-0">
        <CodeBlock :code="cliCommand" lang="bash" />
      </div>
    </div>

    <ol v-else-if="mode === 'Manual'" class="relative ms-3 flex flex-col gap-8 border-s ps-7 [counter-reset:step]">
      <li class="relative [counter-increment:step] before:absolute before:-start-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
        <h4 class="mb-3 font-medium">Install the following dependencies:</h4>
        <div class="rounded-xl border">
          <div class="flex items-center border-b px-2 py-1.5">
            <TabList v-model="manager" :tabs="packageManagers" label="Package manager" size="sm" />
          </div>
          <div class="[&>div]:rounded-none [&>div]:border-0">
            <CodeBlock :code="installCommand(manager, dependencies)" lang="bash" />
          </div>
        </div>
      </li>
      <li class="relative [counter-increment:step] before:absolute before:-start-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
        <h4 class="mb-3 font-medium">Make sure you have the <code class="rounded bg-muted px-1 py-0.5 font-mono text-sm">cn</code> helper:</h4>
        <CodeBlock
          filename="lib/utils.ts"
          lang="ts"
          :code="`import { type ClassValue, clsx } from 'clsx'\nimport { twMerge } from 'tailwind-merge'\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}`"
        />
      </li>
      <li class="relative [counter-increment:step] before:absolute before:-start-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
        <h4 class="mb-3 font-medium">Copy and paste the following code into your project:</h4>
        <div class="flex flex-col gap-3">
          <CodeBlock
            v-for="file in files"
            :key="file.path"
            :filename="file.path"
            :code="file.code"
            :lang="file.path.endsWith('.ts') ? 'ts' : 'vue'"
            collapsible
          />
        </div>
      </li>
      <li
        v-if="css"
        class="relative [counter-increment:step] before:absolute before:-start-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]"
      >
        <h4 class="mb-3 font-medium">Add the animation to your global CSS:</h4>
        <CodeBlock filename="assets/main.css" :code="css" lang="css" collapsible />
      </li>
      <li class="relative [counter-increment:step] before:absolute before:-start-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
        <h4 class="font-medium">Update the import paths to match your project setup.</h4>
      </li>
    </ol>

    <div v-else class="flex flex-col gap-3">
      <div class="rounded-xl border">
        <div class="flex items-center border-b px-2 py-1.5">
          <TabList v-model="manager" :tabs="packageManagers" label="Package manager" size="sm" />
        </div>
        <div class="[&>div]:rounded-none [&>div]:border-0">
          <CodeBlock :code="installCommand(manager, [site.npmPackage])" lang="bash" />
        </div>
      </div>
      <CodeBlock filename="assets/main.css" :code="npmCss" lang="css" />
      <CodeBlock :code="npmImport" lang="ts" />
    </div>
  </div>
</template>
