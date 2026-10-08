<script setup lang="ts">
import { ShineBorder } from '@/components/ui/shine-border'
</script>

<template>
  <div class="relative w-full max-w-[350px] overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
    <ShineBorder :shine-color="['#A07CFE', '#FE8FB5', '#FFBE7B']" />
    <div class="space-y-1.5 p-6">
      <h3 class="text-lg leading-none font-semibold">Login</h3>
      <p class="text-sm text-muted-foreground">Enter your credentials to access your account</p>
    </div>
    <form class="grid gap-4 px-6" @submit.prevent>
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
    <div class="p-6">
      <button class="h-9 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Sign In
      </button>
    </div>
  </div>
</template>
