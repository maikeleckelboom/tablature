<script generic="TItem extends ListItem" lang="ts" setup>
import type { ListItem, ListItemLink, ListItemWithChildren } from '~/types'

const {
  item,
  selected,
  level = 0,
  classes = {
    base: '',
    link: '',
    selected: ''
  }
} = defineProps<{
  item: TItem
  selected?: boolean
  level?: number
  classes?: {
    base: string
    link: string
    selected: string
  }
}>()

function isMenuItemWithChildren(
  item: TItem
): item is TItem extends ListItemWithChildren ? TItem : never {
  return (item as ListItemWithChildren).children !== undefined
}

function isMenuLink(item: TItem): item is TItem extends ListItemLink ? TItem : any {
  return (item as ListItemLink).href !== undefined
}

const itemComponent = shallowRef(isMenuLink(item) ? resolveComponent('NuxtLink') : 'button')

const itemComponentAttrs = computed(() => (isMenuLink(item) ? { to: item.href } : {}))

const slots = defineSlots<{
  default({ item, level }: { item: TItem; level: number }): any
}>()
</script>

<template>
  <Component
    :is="itemComponent"
    :class="[classes.base, selected && classes.selected]"
    v-bind="itemComponentAttrs"
  >
    <slot :item="<TItem>item" :level="level">
      {{ item }}
    </slot>
  </Component>
</template>

<style scoped></style>
