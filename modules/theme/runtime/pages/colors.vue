<script lang="ts" setup>
import { useDynamicSchemeColors } from '~/modules/theme/runtime/composables/useDynamicSchemeColors'
import { schemeVariants } from '~/modules/theme/runtime/utils/color'
import type { Variant } from '~/modules/theme/types'

const { $dynamicScheme } = useNuxtApp()

const dynamicSchemeColors = useDynamicSchemeColors()

const schemeVariantOptions = computed(() =>
  schemeVariants.map((variant) => ({
    value: variant,
    text: variant.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    active: variant === themeConfig.variant.value
  }))
)

const themeConfig = useThemeConfig()

const setVariant = (v: Variant) => {
  themeConfig.variant.value = v
}

const testValue = ref<number>(0)

const { contrastLevel } = useThemeConfig()
</script>

<template>
  <ColumnLayout>
    <div class="scrollbar grid gap-8 overflow-y-auto p-4 sm:grid-cols-[auto,1fr]">
      <div class="w-full max-w-md">
        <section class="mb-4 flex flex-col gap-4"></section>
        <section class="mb-4 flex flex-col gap-4">
          <fieldset class="rounded-md border-thin border-outline/80 p-4">
            <legend>Source Color</legend>
            <KeyColorPickers class="w-full flex-shrink-0" />
          </fieldset>
          <fieldset class="rounded-md border-thin border-outline/80 p-4">
            <legend>Variant</legend>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="variant in schemeVariantOptions"
                :key="variant.value"
                :aria-pressed="variant.active"
                :class="{ 'border-outline-variant/60 bg-surface-level-1': variant.active }"
                class="flex cursor-pointer items-center gap-x-2 rounded-full border-thin border-transparent px-4 py-2 text-label-lg leading-none hover:border-outline-variant/50 hover:bg-surface-level-1"
                @click="setVariant(variant.value)"
              >
                <Icon v-if="variant.active" class="mr-1 size-4" name="ic:round-check" />
                {{ variant.text }}
              </button>
            </div>
          </fieldset>
          <fieldset class="rounded-md border-thin border-outline/80 p-4">
            <legend>Contrast Level</legend>
            <InputSlider v-model="contrastLevel" max="1" min="0" step="0.1" />
          </fieldset>
          <fieldset class="rounded-md border-thin border-outline/80 p-4">
            <legend>Color Mode</legend>
            <ColorMode />
          </fieldset>
        </section>
      </div>

      <div class="max-w-full">
        <div class="flex">
          <section class="mb-4 flex flex-col gap-4">
            <JsonViewer :data="dynamicSchemeColors" :deep="0" />
            <JsonViewer :data="$dynamicScheme" :deep="0" />
          </section>
          <section class="mb-4"></section>
        </div>
      </div>
    </div>
  </ColumnLayout>
</template>
