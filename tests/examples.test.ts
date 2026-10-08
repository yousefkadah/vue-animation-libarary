import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Component } from 'vue'

/**
 * Smoke test: every example (and therefore every component) mounts, renders something,
 * and unmounts without throwing or triggering a Vue warning.
 * Run one component's examples with: npx vitest run -t "border-beam"
 */
const examples = import.meta.glob<Component>('../src/registry/examples/*.vue', { import: 'default' })
const metaSources = import.meta.glob<string>('../src/registry/ui/*/meta.json', {
  eager: true,
  query: '?raw',
  import: 'default',
})

type Meta = { name: string; examples: { name: string }[] }
const metas: Record<string, Meta> = {}
for (const [path, source] of Object.entries(metaSources)) {
  const slug = path.split('/').at(-2)!
  try {
    metas[path] = JSON.parse(source) as Meta
  } catch {
    metas[path] = { name: slug, examples: [{ name: `${slug} (meta.json is invalid JSON)` }] }
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('registry', () => {
  it('every example file is listed in a meta.json', () => {
    const listed = new Set(Object.values(metas).flatMap((meta) => meta.examples.map((example) => example.name)))
    const files = Object.keys(examples).map((path) => path.split('/').pop()!.replace('.vue', ''))
    expect(files.filter((file) => !listed.has(file))).toEqual([])
  })
})

for (const meta of Object.values(metas)) {
  describe(meta.name, () => {
    for (const example of meta.examples) {
      it(`${example.name} mounts without errors`, async () => {
        const warnings: string[] = []
        const errors: unknown[] = []
        const loader = examples[`../src/registry/examples/${example.name}.vue`]
        expect(loader, `missing example file ${example.name}.vue`).toBeTypeOf('function')
        const Example = await loader()
        const wrapper = mount(Example, {
          attachTo: document.body,
          global: {
            config: {
              warnHandler: (message) => warnings.push(message),
              errorHandler: (error) => errors.push(error),
            },
          },
        })
        await flushPromises()
        await new Promise((resolve) => setTimeout(resolve, 50))
        expect(errors).toEqual([])
        expect(warnings).toEqual([])
        expect(wrapper.html().length).toBeGreaterThan(0)
        wrapper.unmount()
      })
    }
  })
}
