<script setup lang="ts">
import type { ApiDoc } from '../catalog'

const props = defineProps<{ api: ApiDoc[] }>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <section v-for="entry in props.api" :key="entry.name" class="flex flex-col gap-3">
      <h3 v-if="props.api.length > 1" class="font-mono text-base font-semibold">{{ entry.name }}</h3>
      <div v-if="entry.props.length" class="overflow-x-auto rounded-xl border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b bg-muted/40 text-start">
              <th class="px-4 py-2.5 text-start font-medium">Prop</th>
              <th class="px-4 py-2.5 text-start font-medium">Type</th>
              <th class="px-4 py-2.5 text-start font-medium">Default</th>
              <th class="px-4 py-2.5 text-start font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in entry.props" :key="prop.name" class="border-b last:border-0">
              <td class="px-4 py-2.5 align-top">
                <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap">{{ prop.name }}<span v-if="prop.required" class="text-destructive">*</span></code>
              </td>
              <td class="px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">{{ prop.type }}</td>
              <td class="px-4 py-2.5 align-top font-mono text-xs whitespace-nowrap text-muted-foreground">{{ prop.default ?? '—' }}</td>
              <td class="px-4 py-2.5 align-top text-muted-foreground">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="entry.slots?.length" class="overflow-x-auto rounded-xl border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b bg-muted/40">
              <th class="w-48 px-4 py-2.5 text-start font-medium">Slot</th>
              <th class="px-4 py-2.5 text-start font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in entry.slots" :key="slot.name" class="border-b last:border-0">
              <td class="px-4 py-2.5"><code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">#{{ slot.name }}</code></td>
              <td class="px-4 py-2.5 text-muted-foreground">{{ slot.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="entry.emits?.length" class="overflow-x-auto rounded-xl border">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b bg-muted/40">
              <th class="w-48 px-4 py-2.5 text-start font-medium">Event</th>
              <th class="px-4 py-2.5 text-start font-medium">Payload</th>
              <th class="px-4 py-2.5 text-start font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emit in entry.emits" :key="emit.name" class="border-b last:border-0">
              <td class="px-4 py-2.5"><code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">@{{ emit.name }}</code></td>
              <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ emit.payload ?? '—' }}</td>
              <td class="px-4 py-2.5 text-muted-foreground">{{ emit.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
