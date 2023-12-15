<script lang="ts" setup>
import type { ColorModeOption } from '~/modules/theme/types'
import ColorModeSheet from '~/modules/theme/runtime/components/ColorModeSheet.vue'

const props = defineProps<{
  modes: ColorModeOption[]
}>()

const lightMode = computed(() => props.modes.find((m) => m?.value === 'light'))
const darkMode = computed(() => props.modes.find((m) => m?.value === 'dark'))
const prefersDark = usePreferredDark()
</script>

<template>
  <div class="grid h-full grid-cols-2">
    <div class="relative bg-surface-light">
      <ColorModeSheet :class="{ 'scale-125': !prefersDark }" :mode="lightMode" />
    </div>
    <div class="relative bg-surface-dark">
      <ColorModeSheet :class="{ 'scale-125': prefersDark }" :mode="darkMode" />
    </div>
  </div>
</template>
