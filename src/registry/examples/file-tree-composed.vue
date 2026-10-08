<script setup lang="ts">
import { ChevronsDownUp } from '@lucide/vue'
import { CollapseButton, File, Folder, Tree, type TreeViewElement } from '@/components/ui/file-tree'

// Only used by CollapseButton to know which folders exist.
const elements: TreeViewElement[] = [
  {
    id: '1',
    name: 'my-app',
    children: [
      { id: '2', name: '.github', children: [{ id: '3', name: 'workflows', children: [{ id: '4', name: 'ci.yml' }] }] },
      {
        id: '5',
        name: 'src',
        children: [
          { id: '6', name: 'components', children: [{ id: '7', name: 'Dock.vue' }, { id: '8', name: 'Marquee.vue' }] },
          { id: '9', name: 'App.vue' },
        ],
      },
      { id: '10', name: 'package.json' },
    ],
  },
]
</script>

<template>
  <div class="relative flex h-[300px] w-full max-w-sm flex-col overflow-hidden rounded-lg border bg-background">
    <Tree class="p-2" initial-selected-id="7" :initial-expanded-items="['1', '5', '6']" :elements="elements">
      <Folder element="my-app" value="1">
        <Folder element=".github" value="2">
          <Folder element="workflows" value="3">
            <File value="4"><span>ci.yml</span></File>
          </Folder>
        </Folder>
        <Folder element="src" value="5">
          <Folder element="components" value="6">
            <File value="7"><span>Dock.vue</span></File>
            <File value="8"><span>Marquee.vue</span></File>
            <File value="locked" :is-selectable="false"><span>Secret.vue</span></File>
          </Folder>
          <File value="9"><span>App.vue</span></File>
        </Folder>
        <File value="10"><span>package.json</span></File>
      </Folder>
      <CollapseButton :elements="elements">
        <ChevronsDownUp class="size-4" />
      </CollapseButton>
    </Tree>
  </div>
</template>
