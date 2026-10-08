var e=`<script setup lang="ts">
import { Tree, type TreeViewElement } from '@/components/ui/file-tree'

const elements: TreeViewElement[] = [
  {
    id: 'src',
    type: 'folder',
    name: 'src',
    children: [
      {
        id: 'lib',
        type: 'folder',
        name: 'lib',
        children: [{ id: 'utils', name: 'utils.ts' }],
      },
      {
        id: 'pages',
        type: 'folder',
        name: 'pages',
        children: [
          { id: 'index', name: 'Index.vue' },
          { id: 'about', name: 'About.vue' },
        ],
      },
      {
        id: 'components',
        type: 'folder',
        name: 'components',
        children: [
          { id: 'header', name: 'SiteHeader.vue' },
          {
            id: 'ui',
            type: 'folder',
            name: 'ui',
            children: [{ id: 'button', name: 'Button.vue' }],
          },
          { id: 'footer', name: 'SiteFooter.vue' },
        ],
      },
      { id: 'app', name: 'App.vue' },
      { id: 'main', name: 'main.ts' },
    ],
  },
]
<\/script>

<template>
  <div class="relative flex h-[300px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
    <Tree
      class="overflow-hidden rounded-md bg-background p-2"
      initial-selected-id="button"
      :initial-expanded-items="['src', 'pages', 'components', 'ui', 'lib']"
      :elements="elements"
    />
  </div>
</template>
`;export{e as default};