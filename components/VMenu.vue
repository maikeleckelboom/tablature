<script generic="TItem extends MenuItem" lang="ts" setup>
import type { MenuItem, MenuItemLink, MenuItemWithChildren } from '~/types'

const { menu: data, selected } = defineProps<{
  menu: TItem[]
  selected?: TItem
}>()

function isMenuItemWithChildren(
  item: TItem
): item is TItem extends MenuItemWithChildren ? TItem : never {
  return (item as MenuItemWithChildren).children !== undefined
}

function isMenuItem(item: TItem): item is TItem extends MenuItem ? TItem : never {
  return !isMenuItemWithChildren(item)
}

function isMenuLink(item: TItem): item is TItem extends MenuItemLink ? TItem : never {
  return (item as MenuItemLink).href !== undefined
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

const baseClasses: string = 'flex p-2'
const selectedClass: string = 'bg-secondary-container text-on-secondary-container'
</script>

<template>
  <menu>
    <slot>
      <li v-for="item in data" :key="item.name">
        <slot :item="item" name="item">
          <NuxtLink
            v-if="isMenuLink(item)"
            :class="[baseClasses, isSelected(item) && selectedClass]"
            :to="item.href"
          >
            <slot name="name">
              {{ item.name }}
            </slot>
          </NuxtLink>
          <button
            v-else-if="isMenuItem(item)"
            :class="[baseClasses, isSelected(item) && selectedClass]"
          >
            <slot name="name">
              {{ item.name }}
            </slot>
          </button>
        </slot>
        <VMenu v-if="isMenuItemWithChildren(item)" :menu="<TItem[]>item.children" />
      </li>
    </slot>
  </menu>
</template>

<style scoped></style>
