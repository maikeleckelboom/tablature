<script generic="TItem extends NavigationListItem" lang="ts" setup>
import type { NavigationListItem } from '~/modules/list/types'

const {
  item,
  level = 0,
  activeClass,
  exactActiveClass,
  triggerCallback = () => {}
} = defineProps<{
  item: TItem
  level?: number
  activeClass?: string
  exactActiveClass?: string
  triggerCallback?: (item: TItem) => void
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
  children({ item, level }: { item: TItem; level: number; labelledBy?: string }): any
}>()

const triggerLabel = computed<string | undefined>(() => {
  if (isRecursive(item)) {
    return `${decodeURIComponent(item.name.toLowerCase())}-${level}`
  }
})
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
        :id="triggerLabel"
        :aria-controls="`panel-${triggerLabel}`"
        :class="{
          [activeClass]: item?.children?.some((child) => child.href === $route.path)
        }"
        class="size-full"
        @click="triggerCallback(<TItem>item)"
      >
        <slot :item="<TItem>item" :level="level">
          {{ item.name }}
        </slot>
      </button>
    </template>
    <slot
      v-if="isRecursive(item)"
      :item="<TItem>item"
      :labelledBy="triggerLabel"
      :level="level"
      name="children"
    />
  </li>
</template>
