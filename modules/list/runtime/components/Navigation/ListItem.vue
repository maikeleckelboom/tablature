<script generic="TItem extends NavigationListItem" lang="ts" setup>
import type { NavigationListItem } from '~/modules/list/types'
import { NuxtLink } from '#components'

const { item: listItem, level = 0 } = defineProps<{
  item: TItem
  level?: number
}>()

function isLink<T>(item: T): item is T extends NavigationListItem ? T : never {
  return (item as NavigationListItem).href !== undefined
}

function isButton<T>(item: T): item is T extends NavigationListItem ? T : never {
  return (
    (item as NavigationListItem).open !== undefined &&
    (item as NavigationListItem).children !== undefined
  )
}

defineSlots<{
  default({ item, level }: { item: TItem; level: number }): any
  tail({ item, level }: { item: TItem; level: number }): any
}>()
</script>

<template>
  <AbstractListItem
    v-slot="{ item, level }"
    :aria-expanded="isButton(item) ? item.open : undefined"
    :item="<TItem>listItem"
    :level="level"
  >
    <NuxtLink v-if="isLink(item)" :to="item.href">
      <slot :item="<TItem>item" :level="level">
        {{ item.name }}
      </slot>
    </NuxtLink>
    <template v-if="isButton(item)">
      <button @click="item.open = !item.open">
        <slot :item="<TItem>item" :level="level">
          {{ item.name }}
        </slot>
      </button>
      <slot :item="<TItem>item" :level="level" name="tail" />
    </template>
  </AbstractListItem>
</template>
