var e=`<script setup lang="ts">
import { BorderBeam } from '@/components/ui/border-beam'
<\/script>

<template>
  <div class="relative w-[350px] overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
    <div class="space-y-1.5 p-6">
      <h3 class="text-lg font-semibold">Login</h3>
      <p class="text-sm text-muted-foreground">Enter your credentials to access your account.</p>
    </div>
    <form class="grid gap-4 px-6" @submit.prevent>
      <label class="grid gap-2 text-sm font-medium">
        Email
        <input type="email" placeholder="you@example.com" class="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50" />
      </label>
      <label class="grid gap-2 text-sm font-medium">
        Password
        <input type="password" placeholder="Enter your password" class="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50" />
      </label>
    </form>
    <div class="flex justify-between p-6">
      <button class="h-9 rounded-md border px-4 text-sm font-medium hover:bg-accent">Register</button>
      <button class="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Login</button>
    </div>
    <BorderBeam :duration="8" :size="100" />
  </div>
</template>
`;export{e as default};