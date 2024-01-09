<script lang="ts" setup>
import { useDynamicSchemeColors } from '~/modules/theme/runtime/composables/useDynamicSchemeColors'
import { schemeVariants } from '~/modules/theme/runtime/utils/color'

const { $dynamicScheme } = useNuxtApp()

const dynamicSchemeColors = useDynamicSchemeColors()

const variantImages = computed(() =>
  schemeVariants.map((variant) => ({
    src: `/images/scheme-${variant}.png`,
    alt: variant
  }))
)

const describedSchemeVariants = computed(() =>
  schemeVariants.map((variant) => ({
    value: variant,
    text: variant.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }))
)

const themeConfig = useThemeConfig()

const setVariant = (v) => {
  themeConfig.schemeVariant.value = v
}
</script>

<template>
  <ColumnLayout>
    <div class="scrollbar grid grid-cols-[auto,1fr] overflow-y-auto">
      <div class="w-full max-w-md">
        <section class="mb-4">
          <ColorMode />
        </section>
        <section class="mb-4">
          <KeyColorPickers class="w-full flex-shrink-0" />
        </section>
        <section class="mb-4">
          <button
            v-for="variant in describedSchemeVariants"
            :key="variant.value"
            @click="setVariant(variant.value)"
          >
            {{ variant.text }}
          </button>
        </section>
      </div>
      <div class="max-w-full">
        <div class="flex">
          <section class="mb-4">
            <JsonViewer :data="dynamicSchemeColors" :virtual="false" />
          </section>
          <section class="mb-4">
            <JsonViewer :data="$dynamicScheme" />
          </section>
        </div>
      </div>
    </div>
  </ColumnLayout>
</template>
