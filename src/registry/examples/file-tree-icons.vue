<script setup lang="ts">
import { ref } from 'vue'
import { FileCode2, FileJson, FolderClosed, FolderGit2 } from '@lucide/vue'
import { File, Folder, Tree } from '@/components/ui/file-tree'

const selected = ref('app')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <div class="h-[260px] overflow-hidden rounded-lg border bg-background">
      <Tree
        class="p-2"
        initial-selected-id="app"
        :initial-expanded-items="['root', 'src']"
        :open-icon="FolderGit2"
        :close-icon="FolderClosed"
        :indicator="false"
        @select="selected = $event"
      >
        <Folder element="vue-magic-ui" value="root">
          <Folder element="src" value="src">
            <File value="app" :file-icon="FileCode2"><span>App.vue</span></File>
            <File value="main" :file-icon="FileCode2"><span>main.ts</span></File>
          </Folder>
          <Folder element="public" value="public">
            <File value="favicon"><span>favicon.svg</span></File>
          </Folder>
          <File value="package" :file-icon="FileJson"><span>package.json</span></File>
          <File value="tsconfig" :file-icon="FileJson"><span>tsconfig.json</span></File>
        </Folder>
      </Tree>
    </div>
    <p class="text-center text-xs text-muted-foreground">
      Selected: <code class="rounded bg-muted px-1 py-0.5 font-mono">{{ selected }}</code>
    </p>
  </div>
</template>
