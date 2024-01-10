<script lang="ts" setup>
import { useDynamicSchemeColors } from '~/modules/theme/runtime/composables/useDynamicSchemeColors'
import { variantKeys } from '~/modules/theme/runtime/utils/color'
import type { TVariant } from '~/modules/theme/types'
import { hexFromArgb } from '@material/material-color-utilities'

const { $dynamicScheme } = useNuxtApp()

const dynamicSchemeColors = useDynamicSchemeColors()

const { variant, contrastLevel } = useThemeConfig()

const schemeVariantOptions = computed(() =>
  variantKeys.map((v) => ({
    value: v,
    text: v.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    active: v === variant.value
  }))
)

const setVariant = (v: TVariant) => {
  variant.value = v
}

type TreeItem = {
  label: string
  children?: TreeItem[]
  [key: string]: any
}

function groupByBaseColor(colors: Record<string, number>): Record<string, Record<string, number>> {
  return Object.entries(colors).reduce(
    (acc, [key, value]) => {
      const splitCamelCase = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .split('-')
      const removedOn = splitCamelCase.filter((item) => item !== 'on')
      const [baseColor] = removedOn
      const baseColorValue = acc[baseColor] || {}
      baseColorValue[key] = value
      acc[baseColor] = baseColorValue
      return acc
    },
    {} as Record<string, Record<string, number>>
  )
}

function colorsToTree(
  colors: Record<string, Record<string, number | Record<string, number>>>
): TreeItem[] {
  const tree: TreeItem[] = []
  for (const [key, value] of Object.entries(colors)) {
    const children: TreeItem[] = []
    for (const [k, v] of Object.entries(value)) {
      children.push({
        label: titleCase(k),
        value: v
      })
    }
    tree.push({
      label: titleCase(key),
      open: true,
      children
    })
  }
  return tree
}

const groupedColors = computed(() => {
  return groupByBaseColor(dynamicSchemeColors.value)
})

const tree = ref(colorsToTree(groupedColors.value))

watch(groupedColors, () => {
  tree.value = colorsToTree(groupedColors.value)
})
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
                :class="{ 'border-outline bg-surface-level-1': variant.active }"
                class="flex cursor-pointer items-center gap-x-2 rounded-full border-thin border-surface-container px-4 py-2 text-label-lg leading-none hover:border-outline-variant/50 hover:bg-surface-level-1"
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

      <div class="flex w-full max-w-md flex-col">
        <section class="mb-4 flex flex-col gap-4">
          <TreeList
            :list="tree"
            :indent="24"
            class="rounded bg-surface-container-lowest"
            :header-class="
              (classes, type) => {
                if (type === 'button') {
                  return (
                    classes +
                    ' hover:bg-surface-level-2 active:bg-surface-level-3 px-2 py-2 rounded'
                  )
                }
                return classes
              }
            "
          >
            <template #item="{ item }">
              <div class="flex items-center gap-3 py-1.5">
                <div
                  class="size-4 rounded-xl"
                  v-if="item.value"
                  :style="{ backgroundColor: hexFromArgb(item.value) }"
                />
                <div v-if="item.selected">
                  <Icon class="size-4" name="ic:round-check" />
                </div>
                {{ item.label }}
              </div>
            </template>
          </TreeList>
          <JsonViewer :data="dynamicSchemeColors" :deep="0" />
          <JsonViewer :data="$dynamicScheme" :deep="0" />
        </section>
        <section class="mb-4"></section>
      </div>
    </div>
  </ColumnLayout>
</template>
