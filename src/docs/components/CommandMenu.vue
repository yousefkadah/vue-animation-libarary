<script setup lang="ts">
import { BookOpen, CornerDownLeft, FileCode2, Moon, Search, Sun } from '@lucide/vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { categories, components } from '../catalog'
import { commandMenuOpen, theme, toggleTheme } from '../state'

interface CommandItem {
  id: string
  title: string
  group: string
  keywords: string
  run: () => void
}

const router = useRouter()
const query = ref('')
const activeIndex = ref(0)
const input = ref<HTMLInputElement>()
const list = ref<HTMLElement>()

const items = computed<CommandItem[]>(() => [
  { id: 'intro', title: 'Introduction', group: 'Docs', keywords: 'docs getting started', run: () => router.push('/docs') },
  { id: 'install', title: 'Installation', group: 'Docs', keywords: 'setup tailwind cli npm', run: () => router.push('/docs/installation') },
  { id: 'all', title: 'All components', group: 'Docs', keywords: 'gallery index', run: () => router.push('/docs/components') },
  ...components.map((component) => ({
    id: component.name,
    title: component.title,
    group: categories.find((category) => category.id === component.category)?.title ?? 'Components',
    keywords: `${component.name} ${component.description}`,
    run: () => router.push(`/docs/components/${component.name}`),
  })),
  {
    id: 'theme',
    title: theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    group: 'Theme',
    keywords: 'dark light mode',
    run: toggleTheme,
  },
])

const filtered = computed(() => {
  const terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return items.value
  return items.value.filter((item) => {
    const haystack = `${item.title} ${item.keywords}`.toLowerCase()
    return terms.every((term) => haystack.includes(term))
  })
})

const grouped = computed(() => {
  const groups = new Map<string, { item: CommandItem; index: number }[]>()
  filtered.value.forEach((item, index) => {
    if (!groups.has(item.group)) groups.set(item.group, [])
    groups.get(item.group)!.push({ item, index })
  })
  return [...groups.entries()]
})

watch(query, () => (activeIndex.value = 0))
watch(commandMenuOpen, async (open) => {
  if (!open) return
  query.value = ''
  activeIndex.value = 0
  await nextTick()
  input.value?.focus()
})

function select(item: CommandItem | undefined) {
  if (!item) return
  commandMenuOpen.value = false
  item.run()
}

async function move(delta: number) {
  const count = filtered.value.length
  if (!count) return
  activeIndex.value = (activeIndex.value + delta + count) % count
  await nextTick()
  list.value?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
}

function onGlobalKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    commandMenuOpen.value = !commandMenuOpen.value
  } else if (event.key === '/' && !commandMenuOpen.value && !(event.target as HTMLElement)?.closest('input, textarea, [contenteditable]')) {
    event.preventDefault()
    commandMenuOpen.value = true
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))

function iconFor(item: CommandItem) {
  if (item.group === 'Docs') return BookOpen
  if (item.group === 'Theme') return theme.value === 'dark' ? Sun : Moon
  return FileCode2
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      leave-active-class="transition duration-100 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="commandMenuOpen"
        class="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-[2px]"
        @mousedown.self="commandMenuOpen = false"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search components"
          class="w-full max-w-xl overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
          @keydown.enter.prevent="select(filtered[activeIndex])"
          @keydown.esc.prevent="commandMenuOpen = false"
        >
          <div class="flex items-center gap-2 border-b px-4">
            <Search class="size-4 shrink-0 text-muted-foreground" />
            <input
              ref="input"
              v-model="query"
              type="text"
              placeholder="Search components..."
              class="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search"
            />
            <kbd class="rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
          </div>
          <div ref="list" class="max-h-[min(60vh,420px)] overflow-y-auto p-2">
            <p v-if="!filtered.length" class="py-10 text-center text-sm text-muted-foreground">No results for “{{ query }}”.</p>
            <div v-for="[group, entries] in grouped" :key="group" class="mb-2 last:mb-0">
              <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">{{ group }}</div>
              <button
                v-for="{ item, index } in entries"
                :key="item.id"
                type="button"
                :data-active="index === activeIndex"
                :class="[
                  'flex h-9 w-full items-center gap-2 rounded-md px-2 text-start text-sm',
                  index === activeIndex ? 'bg-accent text-accent-foreground' : '',
                ]"
                @mousemove="activeIndex = index"
                @click="select(item)"
              >
                <component :is="iconFor(item)" class="size-4 text-muted-foreground" />
                {{ item.title }}
                <CornerDownLeft v-if="index === activeIndex" class="ms-auto size-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
