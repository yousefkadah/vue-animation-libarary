<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { highlight, type CodeLanguage } from '../highlight'
import CopyButton from './CopyButton.vue'

const props = withDefaults(
  defineProps<{
    code: string
    lang?: CodeLanguage
    filename?: string
    /** Collapse code taller than ~20 lines behind an "Expand" button. */
    collapsible?: boolean
  }>(),
  { lang: 'vue', collapsible: false },
)

const html = ref('')
const expanded = ref(false)
const isLong = computed(() => props.collapsible && props.code.split('\n').length > 20)

watchEffect(async () => {
  const code = props.code
  const lang = props.lang
  html.value = ''
  const rendered = await highlight(code, lang)
  if (code === props.code && lang === props.lang) html.value = rendered
})
</script>

<template>
  <div class="group/code relative overflow-hidden rounded-xl border bg-muted/30 dark:bg-muted/20">
    <div v-if="props.filename" class="flex h-10 items-center border-b px-4 font-mono text-xs text-muted-foreground">
      {{ props.filename }}
    </div>
    <CopyButton :value="props.code" :class="['absolute end-2 z-10', props.filename ? 'top-1.5' : 'top-2']" />
    <div
      :class="[
        'overflow-auto text-[13px] leading-relaxed [&_pre]:min-w-full [&_pre]:w-max [&_pre]:p-4',
        isLong && !expanded ? 'max-h-80' : 'max-h-[640px]',
      ]"
    >
      <div v-if="html" v-html="html" />
      <pre v-else class="p-4 font-mono text-muted-foreground"><code>{{ props.code }}</code></pre>
    </div>
    <div
      v-if="isLong && !expanded"
      class="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-linear-to-t from-background/95 to-transparent pb-4"
    >
      <button
        type="button"
        class="rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-accent"
        @click="expanded = true"
      >
        Expand
      </button>
    </div>
  </div>
</template>

<style>
.shiki {
  font-family: var(--font-mono);
}
</style>
