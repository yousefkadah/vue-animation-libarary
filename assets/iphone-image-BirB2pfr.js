var e=`<script setup lang="ts">
import { Iphone } from '@/components/ui/iphone'
<\/script>

<template>
  <div class="flex items-end gap-6">
    <Iphone :width="180" src="https://picsum.photos/seed/iphone-left/900/1950" class="hidden sm:inline-block" />
    <Iphone
      :width="210"
      src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=900&auto=format&fit=crop"
    />
  </div>
</template>
`;export{e as default};