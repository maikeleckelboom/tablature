<script lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

const store = useToolbarMenuStore()

/*const getRecursiveSelectedItems = (items: MenuItem[]): MenuItem[] => {
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
  return getRecursiveSelectedItems(store.state).map((item) => {
    const parent = findRecursive(store.state, (i) => i.children?.includes(item))
    return {
      key: parent.label,
      value: item.label
    }
  })
})*/

function getHeaderClass(classes: string, type: 'button' | 'label') {
  return classes + ' hover:bg-surface-level-2 active:bg-surface-level-3 px-2 py-2 rounded'
}

const documentStore = useDocumentStore()
</script>

<template>
  <ColumnLayout>
    <div class="relative grid gap-8 p-4 md:grid-cols-2 md:p-0">
      <div class="scrollbar h-full overflow-y-auto">
        <TreeList :items="documentStore.state" />
      </div>
      <div
        class="scrollbar h-fit max-h-[80svh] w-[300px] max-w-full overflow-y-auto rounded bg-surface-container-lowest p-2 text-label-lg"
      >
        <TreeList
          :items="store.state"
          :indent="8"
          :get-header-class="getHeaderClass"
          :exclude="['shortcuts']"
        />
      </div>
    </div>
  </ColumnLayout>
</template>

<style></style>
