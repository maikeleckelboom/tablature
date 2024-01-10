<script lang="ts" setup>
import type { ColorModeOption } from '~/modules/theme/types'
import SystemBoxSheet from '~/modules/theme/runtime/components/SystemBoxSheet.vue'
import ColorModeSheet from '~/modules/theme/runtime/components/ColorModeSheet.vue'

const { isDark } = useThemeConfig()

const modes = reactive<ColorModeOption[]>([
  { label: 'Light', value: 'light', selected: !isDark.value },
  { label: 'Dark', value: 'dark', selected: isDark.value }
])

const onClick = (mode: ColorModeOption) => {
  isDark.value = mode.value === 'dark'
  modes.forEach((m) => {
    m.selected = m.value === mode.value
  })
}

const isActiveBoxStyles = (mode: ColorModeOption) => ({
  'border-primary': mode.selected,
  'border-outline-variant': !mode.selected,
  'bg-surface-light border-outline-variant-light': mode.value === 'light',
  'bg-surface-dark border-outline-variant-dark': mode.value === 'dark'
})
</script>

<template>
  <div class="flex flex-row gap-4">
    <div v-for="mode in modes" :key="mode.value" @click="onClick(mode)">
      <div
        :class="isActiveBoxStyles(mode)"
        class="relative aspect-video min-h-14 overflow-hidden rounded-lg border-2"
      >
        <SystemBoxSheet v-if="mode.value === 'system'" :modes="modes" />
        <ColorModeSheet v-else :mode="mode" />
      </div>
      <div
        :class="mode.selected ? 'text-primary' : 'text-on-surface'"
        class="flex items-center justify-start px-2 py-2"
      >
        <Icon v-if="mode.selected" class="mr-1 h-3.5 w-3.5 md:h-4 md:w-4" name="ic:round-check" />
        <span class="text-label-md font-semibold">{{ mode.label }}</span>
      </div>
    </div>
  </div>
</template>
