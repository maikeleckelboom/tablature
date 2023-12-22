<script lang="ts" setup>
import type { Card } from '~/types'

const { card } = defineProps<{
  card: Card
}>()

const cardRef = ref<HTMLElement>()
</script>

<template>
  <div
    ref="cardRef"
    class="relative flex cursor-move flex-col overflow-hidden rounded-[8px] border-2 border-surface-variant bg-surface pb-4"
  >
    <div class="size-full flex flex-col p-3">
      <slot />
    </div>
    <footer class="absolute inset-x-0 bottom-0">
      <slot name="footer" />
    </footer>
  </div>
</template>
