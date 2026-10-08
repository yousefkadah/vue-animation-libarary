<script setup lang="ts">
import { isFolderElement, type TreeViewElement } from './context'
import File from './File.vue'
import Folder from './Folder.vue'

/** Renders `Tree`'s `elements` data as nested `Folder` / `File` components. Internal. */
defineProps<{ elements: TreeViewElement[] }>()
</script>

<template>
  <template v-for="element in elements" :key="element.id">
    <Folder
      v-if="isFolderElement(element)"
      :value="element.id"
      :element="element.name"
      :is-selectable="element.isSelectable"
    >
      <TreeElements v-if="element.children" :elements="element.children" />
    </Folder>
    <File v-else :value="element.id" :is-selectable="element.isSelectable">
      <span>{{ element.name }}</span>
    </File>
  </template>
</template>
