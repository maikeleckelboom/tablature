<script generic="TItem extends ListItem" lang="ts" setup>
import type { ListItem, ListItemLink } from '~/types'
import type { NuxtLinkProps } from '#app'
import type { RouteRecordRaw } from 'vue-router'
import { NuxtLink } from '#components'
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'

const {
  item,
  selectedName,
  level = 0,
  activeClass,
  exactActiveClass,
  selectedClass
} = defineProps<{
  item: TItem
  level?: number
  selectedName?: string

  selectedClass?: string
  activeClass?: string
  exactActiveClass?: string
}>()

function isMenuLink(item: TItem): item is TItem extends ListItemLink ? TItem : any {
  return (item as ListItemLink).href !== undefined
}

const itemComponent = shallowRef(isMenuLink(item) ? resolveComponent('NuxtLink') : 'button')

const slots = defineSlots<{
  default({ item, level }: { item: TItem; level: number }): any
}>()

const linkAttrs = (item: ListItemLink): NuxtLinkProps => ({
  to: item.href,
  exactActiveClass: 'bg-error-container',
  activeClass: 'bg-primary-container'
})

const itemComponentAttrs = computed(() => ({
  ...(isMenuLink(item) ? linkAttrs(item) : {})
}))

/**

 const route = useRoute()

 const isActive = computed(() => {
 if (isMenuLink(item)) {
 return route.path.startsWith(item.href)
 }
 return false
 })

 const isExactActive = computed(() => {
 if (isMenuLink(item)) {
 return route.path === item.href
 }
 return false
 })

 const isSelected = computed(() => {
 if (selectedName) {
 return selectedName === item.name
 }
 return false
 })
 **/
</script>

<template>
  <Component :is="itemComponent" v-bind="itemComponentAttrs">
    <slot :item="<TItem>item" :level="level">
      {{ item }}
    </slot>
  </Component>
</template>
