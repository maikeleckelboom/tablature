<script lang="ts" setup>
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

const toolbarStore = useToolbarMenuStore()
const documentStore = useDocumentStore()

function getHeaderClass(base: string, type: 'button' | 'label') {
  return base + ' hover:bg-surface-level-2 active:bg-surface-level-3 px-2 py-2 rounded'
}
</script>

<template>
  <ColumnLayout>
    <div class="grid h-full min-w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div class="scrollbar h-fit max-h-[90svh] max-w-full overflow-y-auto">
        <TreeList :list="documentStore.state" />
      </div>
      <div class="scrollbar h-fit max-h-[90svh] max-w-full overflow-y-auto">
        <TreeList
          :list="toolbarStore.state"
          :indent="8"
          :header-class="getHeaderClass"
          :exclude="['shortcuts']"
        />
      </div>
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
