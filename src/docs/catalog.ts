import type { Component } from 'vue'

export interface PropDoc {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface ApiDoc {
  name: string
  props: PropDoc[]
  slots?: { name: string; description: string }[]
  emits?: { name: string; payload?: string; description: string }[]
}

export interface ExampleDoc {
  name: string
  title: string
  description?: string
}

export interface ComponentMeta {
  name: string
  title: string
  description: string
  category: CategoryId
  exports: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  cssVars?: { theme?: Record<string, string> }
  css?: Record<string, unknown>
  usage?: string
  examples: ExampleDoc[]
  api?: ApiDoc[]
  credit?: string
  isNew?: boolean
}

export const categories = [
  { id: 'components', title: 'Components' },
  { id: 'special-effects', title: 'Special Effects' },
  { id: 'animations', title: 'Animations' },
  { id: 'text-animations', title: 'Text Animations' },
  { id: 'buttons', title: 'Buttons' },
  { id: 'backgrounds', title: 'Backgrounds' },
  { id: 'device-mocks', title: 'Device Mocks' },
] as const

export type CategoryId = (typeof categories)[number]['id']

const metaModules = import.meta.glob<ComponentMeta>('../registry/ui/*/meta.json', {
  eager: true,
  import: 'default',
})

export const components: ComponentMeta[] = Object.values(metaModules).sort((a, b) =>
  a.title.localeCompare(b.title),
)

/** Components in sidebar order: grouped by category, alphabetical inside each group. */
export const orderedComponents: ComponentMeta[] = categories.flatMap((category) =>
  components.filter((component) => component.category === category.id),
)

export const groupedComponents = categories
  .map((category) => ({
    ...category,
    items: components.filter((component) => component.category === category.id),
  }))
  .filter((group) => group.items.length > 0)

export function findComponent(slug: string): ComponentMeta | undefined {
  return components.find((component) => component.name === slug)
}

export function neighbours(slug: string) {
  const index = orderedComponents.findIndex((component) => component.name === slug)
  return {
    previous: index > 0 ? orderedComponents[index - 1] : undefined,
    next: index >= 0 && index < orderedComponents.length - 1 ? orderedComponents[index + 1] : undefined,
  }
}

const exampleModules = import.meta.glob<Component>('../registry/examples/*.vue', { import: 'default' })
const exampleSources = import.meta.glob<string>('../registry/examples/*.vue', {
  query: '?raw',
  import: 'default',
})
const componentSources = import.meta.glob<string>('../registry/ui/*/*.{vue,ts}', {
  query: '?raw',
  import: 'default',
})

export function loadExample(name: string): Promise<Component> {
  const loader = exampleModules[`../registry/examples/${name}.vue`]
  if (!loader) return Promise.reject(new Error(`Unknown example "${name}"`))
  return loader()
}

export function loadExampleSource(name: string): Promise<string> {
  const loader = exampleSources[`../registry/examples/${name}.vue`]
  return loader ? loader() : Promise.resolve('')
}

/** Every source file of a component, in install order (components first, barrel last). */
export async function loadComponentFiles(slug: string): Promise<{ path: string; code: string }[]> {
  const prefix = `../registry/ui/${slug}/`
  const entries = Object.entries(componentSources).filter(([path]) => path.startsWith(prefix))
  const files = await Promise.all(
    entries.map(async ([path, loader]) => ({ path: `components/ui/${slug}/${path.slice(prefix.length)}`, code: await loader() })),
  )
  return files.sort((a, b) => Number(a.path.endsWith('index.ts')) - Number(b.path.endsWith('index.ts')) || a.path.localeCompare(b.path))
}

export function exampleNames(): string[] {
  return Object.keys(exampleModules).map((path) => path.replace('../registry/examples/', '').replace('.vue', ''))
}

/** Renders the meta.css object back into CSS text for the manual-install instructions. */
export function renderCss(meta: ComponentMeta): string {
  const lines: string[] = []
  const theme = meta.cssVars?.theme
  if (theme && Object.keys(theme).length) {
    lines.push('@theme inline {')
    for (const [key, value] of Object.entries(theme)) lines.push(`  --${key}: ${value};`)
    lines.push('}')
  }
  const render = (selector: string, body: unknown, depth: number) => {
    const pad = '  '.repeat(depth)
    if (typeof body === 'string') {
      lines.push(`${pad}${selector}: ${body};`)
      return
    }
    lines.push(`${pad}${selector} {`)
    for (const [key, value] of Object.entries(body as Record<string, unknown>)) render(key, value, depth + 1)
    lines.push(`${pad}}`)
  }
  for (const [selector, body] of Object.entries(meta.css ?? {})) {
    if (lines.length) lines.push('')
    render(selector, body, 0)
  }
  return lines.join('\n')
}
