<script generic="TItem extends TListItem" lang="ts" setup>
import type { ListItem as TListItem, ListItemWithChildren } from '~/types'

/**
 *  This component is a generic list component.
 *  The only thing this component should do is:
 *  1. Render a list of items recursively
 *  2. Provide slots for custom rendering
 */
interface SlotProps {
  item: TItem
  level: number
}

defineSlots<{
  /* encapsulates each item (including its children) */
  default: ({ item, level }: SlotProps) => any
  /* encapsulates each individual item */
  item: ({ item, level }: SlotProps) => any
  /* encapsulates the name within each item */
  'item.name': ({ item, level }: SlotProps) => any
  /* encapsulates the children of each item */
  children: ({
    item,
    level
  }: {
    item: TItem extends ListItemWithChildren ? TItem : never
    level: number
  }) => any
}>()

interface Props {
  list: TItem[]
  level?: number
}

const { list, level = 0 } = defineProps<Props>()

function isMenuItemWithChildren(
  item: TItem
): item is TItem extends ListItemWithChildren ? TItem : never {
  return (item as ListItemWithChildren).children !== undefined
}
</script>

<template>
  <menu>
    <li v-for="item in list" :key="item.name">
      <slot v-bind="{ item, level }">
        <slot name="item" v-bind="{ item, level }">
          <AbstractListItem :item="item" :level="level">
            <slot name="item.name" v-bind="{ item, level }">
              {{ item.name }}
            </slot>
          </AbstractListItem>
        </slot>
        <template v-if="isMenuItemWithChildren(item)">
          <slot name="children" :item="item" :level="level + 1">
            <AbstractList :level="level + 1" :list="<TItem[]>item.children">
              <template #item="{ item, level }">
                <slot name="item" v-bind="{ item, level }">
                  <AbstractListItem :item="item" :level="level">
                    <slot name="item.name" v-bind="{ item, level }">
                      {{ item.name }}
                    </slot>
                  </AbstractListItem>
                </slot>
              </template>
            </AbstractList>
          </slot>
        </template>
      </slot>
    </li>
  </menu>
</template>
