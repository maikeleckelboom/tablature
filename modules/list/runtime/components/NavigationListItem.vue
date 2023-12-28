<script generic="TItem extends NavigationListItem" lang="ts" setup>
import type { NavigationListItem } from '~/modules/list/types'

const {
  item,
  level = 0,
  activeClass,
  exactActiveClass,
  onTrigger = () => {}
} = defineProps<{
  item: TItem
  level?: number
  activeClass?: string
  exactActiveClass?: string
  trigger?: 'hover' | 'click'
  onTrigger?: (item: TItem) => void
}>()

function isLink<T>(item: T): item is T extends NavigationListItem ? T : never {
  return (item as NavigationListItem).href !== undefined
}

function isRecursive<T>(item: T): item is T extends NavigationListItem ? T : never {
  return (
    (item as NavigationListItem).open !== undefined &&
    (item as NavigationListItem).children !== undefined
  )
}

defineSlots<{
  default({ item, level }: { item: TItem; level: number }): any
  children({ item, level }: { item: TItem; level: number }): any
}>()
</script>

<template>
  <li :aria-expanded="isRecursive(item) ? item.open : undefined">
    <NuxtLink
      v-if="isLink(item)"
      :active-class="activeClass"
      :exact-active-class="exactActiveClass"
      :to="item.href"
    >
      <slot :item="<TItem>item" :level="level">
        {{ item.name }}
      </slot>
    </NuxtLink>
    <template v-if="isRecursive(item)">
      <button
        :class="{
          [activeClass]: item?.children?.some((child) => child.href === $route.path)
        }"
        class="size-full"
        @click="onTrigger(<TItem>item)"
      >
        <slot :item="<TItem>item" :level="level">
          {{ item.name }}
        </slot>
      </button>
    </template>
    <slot v-if="isRecursive(item)" :item="<TItem>item" :level="level" name="children" />
  </li>
</template>
