<script generic="TItem extends ListItem" lang="ts" setup>
import type { ListItem, ListItemLink } from '~/types'
import type { NuxtLinkProps } from '#app'

interface Props {
  item: TItem
  level?: number
}

const { item, level = 0 } = defineProps<Props>()

defineSlots<{
  default({ item, level }: { item: TItem; level: number }): any
}>()

function isMenuLink(item: TItem): item is TItem extends ListItemLink ? TItem : any {
  return (item as ListItemLink).href !== undefined
}

const itemComponent = shallowRef(isMenuLink(item) ? resolveComponent('NuxtLink') : 'button')

const linkAttrs = (item: ListItemLink): NuxtLinkProps => ({
  to: item.href
})

const itemComponentAttrs = computed(() => ({
  ...(isMenuLink(item) ? linkAttrs(item) : {})
}))
</script>

<template>
  <Component :is="itemComponent" v-bind="itemComponentAttrs">
    <slot :item="<TItem>item" :level="level" name="default">
      {{ item }}
    </slot>
  </Component>
</template>
