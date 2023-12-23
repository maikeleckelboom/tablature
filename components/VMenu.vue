<script generic="TItem extends ListItem" lang="ts" setup>
import type { ListItem, ListItemLink, ListItemWithChildren } from '~/types'

type ClassProps<TValue> = {
  item: TValue
  selected: TValue
  link: TValue
  linkActive: TValue
  linkExactActive: TValue
}

interface Props {
  menu: TItem[]
  selected?: TItem
  level?: number
  classes?: ClassProps<string>
}

const {
  menu: list,
  selected,
  level = 0,
  classes = {
    item: 'flex p-2',
    selected: 'bg-secondary-container text-on-secondary-container',
    link: 'flex-1',
    linkActive: 'bg-secondary-container text-on-secondary-container',
    linkExactActive: 'bg-secondary-container text-on-secondary-container'
  }
} = defineProps<Props>()

interface SlotProps {
  item: TItem
  level: number
  index: number
}

const slots = defineSlots<{
  item: ({ item, level, index }: SlotProps) => any
  name: ({ item, level, index }: SlotProps) => any
}>()

function isMenuItemWithChildren(
  item: TItem
): item is TItem extends ListItemWithChildren ? TItem : never {
  return (item as ListItemWithChildren).children !== undefined
}

function isMenuItem(item: TItem): item is TItem extends ListItem ? TItem : never {
  return !isMenuItemWithChildren(item)
}

function isMenuLink(item: TItem): item is TItem extends ListItemLink ? TItem : never {
  return (item as ListItemLink).href !== undefined
}

const router = useRouter()
const route = useRoute()

const selectedCheck = (item: TItem) => {
  if (isMenuLink(item)) {
    return router.resolve(item.href).href === route.fullPath
  }

  return false
}

function isSelected(item: TItem) {
  return selectedCheck(item) || item === selected
}
</script>

<template>
  <menu>
    <li v-for="(item, index) in list" :key="item.name">
      <slot name="item" v-bind="{ item, level, index }">
        <NuxtLink
          v-if="isMenuLink(item)"
          :class="[classes.item, classes.link, isSelected(item) && classes.selected]"
          :to="item.href"
        >
          <slot name="name" v-bind="{ item, level, index }">
            {{ item.name }}
          </slot>
        </NuxtLink>
        <button
          v-else-if="isMenuItem(item)"
          :class="[classes.item, isSelected(item) && classes.selected]"
        >
          <slot name="name" v-bind="{ item, level, index }">
            {{ item.name }}
          </slot>
        </button>
      </slot>
      <VMenu
        v-if="isMenuItemWithChildren(item)"
        :level="level + 1"
        :menu="<TItem[]>item.children"
        class="pl-4"
      />
    </li>
  </menu>
</template>

<style scoped></style>
