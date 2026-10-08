var e=`<script setup lang="ts">
import { MagicCard } from '@/components/ui/magic-card'
<\/script>

<template>
  <div class="w-full max-w-sm rounded-xl">
    <!-- The spotlight colour is a CSS variable, so it can differ between light and dark mode. -->
    <MagicCard gradient-color="var(--spotlight)" class="[--spotlight:#D9D9D955] dark:[--spotlight:#262626]">
      <div class="space-y-1.5 border-b p-4">
        <h3 class="leading-none font-semibold">Login</h3>
        <p class="text-sm text-muted-foreground">Enter your credentials to access your account</p>
      </div>
      <form class="grid gap-4 p-4" @submit.prevent>
        <label class="grid gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            placeholder="name@example.com"
            class="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </label>
        <label class="grid gap-2 text-sm font-medium">
          Password
          <input
            type="password"
            class="h-9 rounded-md border bg-transparent px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </label>
      </form>
      <div class="border-t p-4">
        <button class="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Sign In
        </button>
      </div>
    </MagicCard>
  </div>
</template>
`;export{e as default};