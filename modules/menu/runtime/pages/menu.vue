<script lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'
import ContextList from '~/components/ContextList.vue'

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
</script>

<template>
  <ColumnLayout>
    <div class="relative grid w-full grid-cols-[auto,auto,auto]">
      <div class="scrollbar h-full overflow-y-auto">
        <ContextList :items="store.state" />
      </div>
      <div class="scrollbar h-full overflow-y-auto">
        <pre>{{ store.state }}</pre>
      </div>
      <div class="scrollbar h-full overflow-y-auto">
        <pre>{{ selectedItems }}</pre>
      </div>
    </div>
  </ColumnLayout>
</template>

<style>
.custom-list {
  inline-size: clamp(12em, 100%, 24em);
  accent-color: rgb(var(--primary-rgb));

  .custom-list {
    width: 100%;
  }

  .custom-list-item {
    button,
    label {
      display: flex;
      align-items: center;
      padding: 4px;
      gap: 8px;
    }
  }
}
</style>
