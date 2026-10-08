<script setup lang="ts" generic="T extends string">
const props = defineProps<{ tabs: readonly T[]; label?: string; size?: 'sm' | 'md' }>()
const model = defineModel<T>({ required: true })
</script>

<template>
  <div role="tablist" :aria-label="props.label" class="flex items-center gap-1">
    <button
      v-for="tab in props.tabs"
      :key="tab"
      type="button"
      role="tab"
      :aria-selected="model === tab"
      :class="[
        'relative rounded-md font-medium transition-colors',
        props.size === 'sm' ? 'h-7 px-2.5 text-xs' : 'h-8 px-3 text-sm',
        model === tab ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground',
      ]"
      @click="model = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>
