<script generic="TItem extends AbstractListItem" lang="ts" setup>
/**
 *  - It should not contain any state.
 *  - It should not contain any business logic.
 *  - It should not contain any routing logic.
 *  - It should not contain any selection logic.
 *  - It should not contain any styling logic.
 *  - It should not contain any logic that is specific to a certain type of list.
 */

import type { AbstractListItem, RecursiveListItem } from '~/modules/list/types'

defineSlots<{
  default: (props?: { list: TItem[]; level: number }) => any
  item: (props?: { item: TItem; level: number; isRecursive: boolean }) => any
}>()

interface Props {
  list: TItem[]
  level?: number
}

const { list, level = 0 } = defineProps<Props>()

function isRecursiveListItem<T>(item: T): item is T extends RecursiveListItem ? T : never {
  return (item as RecursiveListItem).children !== undefined
}
</script>

<template>
  <ul class="list">
    <slot :level="level" v-bind="{ list, level }">
      <template v-for="item in list" :key="item.name">
        <slot name="item" v-bind="{ item, isRecursive: isRecursiveListItem(item), level }">
          <AbstractListItem :item="item" :level="level">
            <template v-if="isRecursiveListItem(item)">
              <AbstractList :level="level + 1" :list="<TItem[]>item.children">
                <slot name="item" v-bind="{ item, isRecursive: isRecursiveListItem(item), level }">
                  <AbstractListItem :item="item" :level="level">
                    {{ item.name }}
                  </AbstractListItem>
                </slot>
              </AbstractList>
            </template>
          </AbstractListItem>
        </slot>
      </template>
    </slot>
  </ul>
</template>
