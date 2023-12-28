<script generic="TItem extends MaybeListItemWithChildren" lang="ts" setup>
import type { MaybeListItemWithChildren } from '~/modules/list/types'

const { list, level = 0 } = defineProps<{
  list: TItem[]
  level?: number
}>()

defineSlots<{
  default: (props?: { list: TItem[]; level: number }) => any
  item: (props?: { item: TItem; level: number; hasChildren: boolean }) => any
}>()

function isListItemWithChildren<T>(
  item: T
): item is T extends MaybeListItemWithChildren ? T : never {
  return (item as MaybeListItemWithChildren)?.children !== undefined
}
</script>

<template>
  <ul>
    <slot v-bind="{ list, level }">
      <template v-for="item in list" :key="item.name">
        <slot name="item" v-bind="{ item, level, hasChildren: isListItemWithChildren(item) }">
          <li>
            <RecursiveList
              v-if="isListItemWithChildren(item)"
              :level="level + 1"
              :list="<TItem[]>item.children"
            >
              <slot name="item" v-bind="{ item, level, hasChildren: isListItemWithChildren(item) }">
                <li>
                  {{ item }}
                </li>
              </slot>
            </RecursiveList>
          </li>
        </slot>
      </template>
    </slot>
  </ul>
</template>
