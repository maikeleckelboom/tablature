<script lang="ts" setup>
import type { Card } from '~/types'

const store = useBoardStore()

const { board } = storeToRefs(store)

const { card } = defineProps<{
  card: Card
}>()

const cardRef = ref<HTMLElement>()
</script>

<template>
  <div
    ref="cardRef"
    class="relative cursor-move grid-cols-[1fr,auto] overflow-hidden rounded-[8px] border-2 border-surface-variant bg-surface"
  >
    <div class="col-span-full p-3">
      <slot />
    </div>
    <footer class="col-span-full min-h-[38px] border-outline-variant/30">
      <slot name="footer" />
    </footer>
  </div>
</template>
