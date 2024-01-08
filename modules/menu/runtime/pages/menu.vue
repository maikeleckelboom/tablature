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

import VueJsonPretty from 'vue-json-pretty'
</script>

<template>
  <ColumnLayout>
    <div class="relative grid w-full grid-cols-1 gap-y-8 p-4 md:grid-cols-[1fr,1fr,1fr] md:p-0">
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
      <div class="scrollbar h-full overflow-y-auto">
        <h2>Output</h2>
        <ContextList :items="store.state" :indent="false" />
      </div>
      <div class="scrollbar h-full overflow-y-auto">
        <h2>Selected</h2>
        <pre>{{ selectedItems }}</pre>
      </div>
    </div>
  </ColumnLayout>
</template>

<style>
.custom-list {
  inline-size: clamp(12em, 100%, 24em);
  accent-color: rgb(var(--primary-rgb));

  li {
    position: relative;
  }

  .custom-list {
    width: 100%;
    padding-inline-start: 6px !important;

    &[role='group'] {
      li {
        padding-inline-start: 16px;

        button,
        label {
          display: flex;
          align-items: center;
          padding-block: 2px;
          padding-inline: 4px;
          background: rgb(var(--surface-rgb));
          column-gap: 4px;
        }

        &::before,
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        &::before {
          border-left: 1px solid rgb(var(--outline-variant-rgb));
          pointer-events: none;
        }

        &::after {
          background: rgb(var(--outline-variant-rgb));
          height: 1px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
        }

        &[aria-expanded='true'] {
          &::after {
            top: 12px;
          }
        }
      }
    }
  }

  .custom-list-item {
    button,
    label {
    }
  }
}
</style>
