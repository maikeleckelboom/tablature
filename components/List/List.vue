<script generic="TItem extends TListItem" lang="ts" setup>
import type { ListItem as TListItem, ListItemLink, ListItemWithChildren } from '~/types'

interface Props {
  list: TItem[]
  selected?: TItem[]
  level?: number

  selectedClass?: string
  activeClass?: string
  exactActiveClass?: string
}

const {
  list,
  level = 0,
  selectedClass,
  activeClass,
  exactActiveClass,
  ...props
} = defineProps<Props>()

const selected = toRef(props, 'selected', [])

interface SlotProps {
  item: TItem
  level: number
}

const slots = defineSlots<{
  item: ({ item, level }: SlotProps) => any
  name: ({ item, level }: SlotProps) => any
}>()

function isMenuItemWithChildren(
  item: TItem
): item is TItem extends ListItemWithChildren ? TItem : never {
  return (item as ListItemWithChildren).children !== undefined
}

const select = (item: TItem, level: number) => {
  selected.value[level] = item
  selected.value.splice(level + 1)
}

const isSelected = (item: TItem, level: number) => {
  return selected.value[level] === item
}

const route = useRoute()

const isExactActive = (item: TItem) => {
  return route.path === (<ListItemLink>item).href
}

/**
 * twMerge: {
 *     [selectedClass]: isSelected(item, level),
 *         [activeClass]: isMenuItemWithChildren(item) && isSelected(item, level),
 *         [exactActiveClass]: isMenuItemWithChildren(item) && isExactActive(item)
 * }
 */

const mergedClasses = (item: TItem) => {
  if (!item) return {}
  const classes = {
    [selectedClass]: isSelected(item, level),
    [activeClass]: isMenuItemWithChildren(item) && isSelected(item, level),
    [exactActiveClass]: isMenuItemWithChildren(item) && isExactActive(item)
  }
  return classes
}
</script>

<template>
  <menu>
    <li v-for="item in list" :key="item.name">
      <slot name="item" v-bind="{ item, level }">
        <ListItem
          :active-class="activeClass"
          :exact-active-class="exactActiveClass"
          :item="item"
          :level="level"
          :selected-class="selectedClass"
        >
          <slot name="name" v-bind="{ item, level }">
            {{ item.name }}
          </slot>
        </ListItem>
      </slot>
      <List
        v-if="isMenuItemWithChildren(item)"
        :active-class="activeClass"
        :exact-active-class="exactActiveClass"
        :level="level + 1"
        :list="<TItem[]>item.children"
        :selected="selected"
        :selected-class="selectedClass"
      >
        <template #item="{ item, level }">
          <ListItem
            :active-class="activeClass"
            :exact-active-class="exactActiveClass"
            :item="item"
            :level="level"
            :selected-class="selectedClass"
          >
            <slot name="name" v-bind="{ item, level }">
              {{ item.name }}
            </slot>
          </ListItem>
        </template>
      </List>
    </li>
  </menu>
</template>

<style scoped>
menu li:has(.router-link-active) {
  @apply bg-secondary;
}
</style>
