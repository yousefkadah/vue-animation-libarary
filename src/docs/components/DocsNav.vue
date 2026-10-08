<script setup lang="ts">
import { useRoute } from 'vue-router'
import { groupedComponents } from '../catalog'

const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()

const gettingStarted = [
  { title: 'Introduction', to: '/docs' },
  { title: 'Installation', to: '/docs/installation' },
  { title: 'All components', to: '/docs/components' },
]

function linkClass(active: boolean) {
  return [
    'group flex h-8 w-full items-center rounded-md px-2 text-sm transition-colors',
    active ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
  ]
}
</script>

<template>
  <nav class="flex flex-col gap-6 pb-10" aria-label="Documentation">
    <div>
      <h4 class="mb-1 px-2 text-sm font-semibold">Getting Started</h4>
      <RouterLink
        v-for="item in gettingStarted"
        :key="item.to"
        :to="item.to"
        :class="linkClass(route.path === item.to)"
        @click="emit('navigate')"
      >
        {{ item.title }}
      </RouterLink>
    </div>
    <div v-for="group in groupedComponents" :key="group.id">
      <h4 class="mb-1 px-2 text-sm font-semibold">{{ group.title }}</h4>
      <RouterLink
        v-for="item in group.items"
        :key="item.name"
        :to="`/docs/components/${item.name}`"
        :class="linkClass(route.path === `/docs/components/${item.name}`)"
        @click="emit('navigate')"
      >
        {{ item.title }}
        <span
          v-if="item.isNew"
          class="ms-2 rounded-md bg-brand/15 px-1.5 py-0.5 text-[10px] leading-none font-medium text-brand"
        >
          New
        </span>
      </RouterLink>
    </div>
  </nav>
</template>
