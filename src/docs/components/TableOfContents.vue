<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{ items: { id: string; title: string; depth?: number }[] }>()
const active = ref<string>()
let observer: IntersectionObserver | undefined

function observe() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length) active.value = visible[0].target.id
    },
    { rootMargin: '0px 0px -70% 0px' },
  )
  for (const item of props.items) {
    const element = document.getElementById(item.id)
    if (element) observer.observe(element)
  }
}

onMounted(() => requestAnimationFrame(observe))
watch(() => props.items, () => requestAnimationFrame(observe))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav class="flex flex-col gap-2 text-sm" aria-label="On this page">
    <p class="font-medium">On This Page</p>
    <RouterLink
      v-for="item in props.items"
      :key="item.id"
      :to="{ hash: `#${item.id}` }"
      :class="[
        'transition-colors hover:text-foreground',
        (item.depth ?? 2) > 2 ? 'ps-3' : '',
        active === item.id ? 'font-medium text-foreground' : 'text-muted-foreground',
      ]"
    >
      {{ item.title }}
    </RouterLink>
  </nav>
</template>
