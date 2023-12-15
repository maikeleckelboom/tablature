<script lang="ts" setup>
import type { ColorModeOption } from '~/modules/theme/types'

const { mode } = defineProps<{
  mode: ColorModeOption | undefined
}>()
</script>

<template>
  <div
    v-if="mode"
    :class="{
      'border-outline-variant-light bg-surface-container-highest-light text-on-surface-light':
        mode.value === 'light',
      'border-outline-variant-dark bg-surface-container-high-dark text-on-surface-dark':
        mode.value === 'dark'
    }"
    class="rounded-tr-0 absolute bottom-0 right-0 h-3/4 w-5/6 rounded-tl-lg border border-b-0 px-2 py-1 md:px-2 md:py-1.5"
  >
    <p :class="mode.value === 'light' ? 'font-extrabold' : 'font-bold'" class="text-body-lg">Aa</p>
  </div>
</template>
