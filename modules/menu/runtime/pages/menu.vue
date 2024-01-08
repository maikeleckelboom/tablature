<script lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'
import ContextList from '~/components/TreeList.vue'

const store = useToolbarMenuStore()

const getRecursiveSelectedItems = (items: MenuItem[]): MenuItem[] => {
  return items.reduce((acc, item) => {
    if (item.selected) {
      acc.push(item)
    }
    if (item.children) {
      acc.push(...getRecursiveSelectedItems(item.children))
    }
    return acc
  }, [] as MenuItem[])
}

const selectedItems = computed(() => {
  return getRecursiveSelectedItems(store.state)
    .map((item) => {
      const parent = findRecursive(store.state, (i) => i.children?.includes(item))
      return {
        label: parent.label,
        value: item.label
      }
    })
    .reduce(
      (acc, item) => {
        if (!acc[item.label]) {
          acc[item.label] = []
        }
        acc[item.label].push(item.value)
        return acc
      },
      {} as Record<string, string[]>
    )
})

import VueJsonPretty from 'vue-json-pretty'
</script>

<template>
  <ColumnLayout>
    <div
      class="relative grid w-full grid-cols-1 gap-x-12 gap-y-8 p-4 md:grid-cols-[auto,1fr,1fr] md:p-0"
    >
      <div class="scrollbar h-full overflow-y-auto">
        <h2>Input</h2>
        <VueJsonPretty
          :highlight-selected-node="false"
          :data="store.state"
          :show-line-number="false"
          :show-double-quotes="false"
          :deep="1"
          :virtual="false"
        />
      </div>
      <div class="scrollbar h-full overflow-y-auto text-label-lg">
        <h2>Output</h2>
        <!-- li[aria-expanded] > * + div -->
        <TreeList :items="store.state" :indent="false" />
      </div>
      <div class="scrollbar h-full overflow-y-auto">
        <h2>Selected</h2>
        <pre>{{ selectedItems }}</pre>
      </div>
    </div>
  </ColumnLayout>
</template>

<style></style>
