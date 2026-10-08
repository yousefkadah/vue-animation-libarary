<script setup lang="ts">
import { RotateCcw } from '@lucide/vue'
import { defineAsyncComponent, onErrorCaptured, ref, shallowRef, watch } from 'vue'
import { loadExample, loadExampleSource } from '../catalog'
import CodeBlock from './CodeBlock.vue'
import TabList from './TabList.vue'

const props = withDefaults(defineProps<{ name: string; minHeight?: string }>(), { minHeight: '350px' })

const tab = ref<'Preview' | 'Code'>('Preview')
const replayKey = ref(0)
const source = ref('')
const error = ref<string | null>(null)
const Example = shallowRef(defineAsyncComponent(() => loadExample(props.name)))

watch(
  () => props.name,
  (name) => {
    Example.value = defineAsyncComponent(() => loadExample(name))
    source.value = ''
    error.value = null
  },
)

watch(
  tab,
  async (value) => {
    if (value === 'Code' && !source.value) source.value = await loadExampleSource(props.name)
  },
  { immediate: true },
)

onErrorCaptured((caught) => {
  error.value = caught instanceof Error ? caught.message : String(caught)
  return false
})
</script>

<template>
  <div class="group/preview relative my-4 flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <TabList v-model="tab" :tabs="['Preview', 'Code'] as const" label="Preview mode" />
    </div>
    <div v-show="tab === 'Preview'" class="relative overflow-hidden rounded-xl border bg-background">
      <button
        type="button"
        class="absolute end-3 top-3 z-20 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Replay animation"
        title="Replay"
        @click="replayKey++"
      >
        <RotateCcw class="size-4" />
      </button>
      <div class="flex w-full items-center justify-center p-6 sm:p-10" :style="{ minHeight: props.minHeight }">
        <p v-if="error" class="text-sm text-destructive">Preview failed: {{ error }}</p>
        <Suspense v-else>
          <component :is="Example" :key="replayKey" />
          <template #fallback>
            <div class="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
          </template>
        </Suspense>
      </div>
    </div>
    <div v-if="tab === 'Code'">
      <CodeBlock v-if="source" :code="source" lang="vue" collapsible />
      <div v-else class="h-40 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  </div>
</template>
