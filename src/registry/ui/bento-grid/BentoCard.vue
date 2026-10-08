<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { ArrowRight } from '@lucide/vue'
import { cn } from '@/lib/utils'

export interface BentoCardProps {
  class?: HTMLAttributes['class']
  /** Card title. */
  name: string
  description: string
  /** Icon component, e.g. one from `@lucide/vue`. Use the `icon` slot for anything else. */
  icon?: Component
  /** Where the call-to-action link points. */
  href: string
  /** Call-to-action label. */
  cta: string
}

const props = defineProps<BentoCardProps>()
</script>

<template>
  <div
    :class="
      cn(
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
        // light styles
        'bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]',
        props.class,
      )
    "
  >
    <div>
      <slot name="background" />
    </div>
    <div class="p-4">
      <div
        class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-focus-within:-translate-y-10 lg:group-hover:-translate-y-10"
      >
        <slot name="icon">
          <component
            :is="props.icon"
            v-if="props.icon"
            class="size-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300"
            aria-hidden="true"
          />
        </slot>
        <h3 class="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{{ props.name }}</h3>
        <p class="max-w-lg text-neutral-400">{{ props.description }}</p>
      </div>

      <div
        class="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
      >
        <a
          :href="props.href"
          class="pointer-events-auto inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {{ props.cta }}
          <ArrowRight class="ms-2 size-4 rtl:rotate-180" aria-hidden="true" />
        </a>
      </div>
    </div>

    <div
      class="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
    >
      <a
        :href="props.href"
        class="pointer-events-auto inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        {{ props.cta }}
        <ArrowRight class="ms-2 size-4 rtl:rotate-180" aria-hidden="true" />
      </a>
    </div>

    <div
      class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 dark:group-hover:bg-neutral-800/10"
    />
  </div>
</template>
