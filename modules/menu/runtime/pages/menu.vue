<script lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

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

const selectedItemLabels = computed(() =>
  getRecursiveSelectedItems(store.state).map((item) => item.label)
)
</script>

<template>
  <ColumnLayout>
    <div class="flex flex-row items-start gap-4">
      <List :items="store.state" />
      <pre>{{ selectedItemLabels }}</pre>
      <!--      <div class="scrollbar h-[60vh] overflow-y-auto">-->
      <!--        <pre>{{ store }}</pre>-->
      <!--      </div>-->
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
