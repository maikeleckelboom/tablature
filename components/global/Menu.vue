<script generic="T extends MenuItem" lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'
import type { Component } from 'vue'

const props = defineProps<{
  items: T[]
  as?: string | Component
}>()

function onClick(evt: Event, item: T) {
  if (item?.children) {
    item.open = !item.open
  }
}
</script>

<template>
  <Component :is="props.as ?? 'div'">
    <MenuItem v-for="item in props.items" :key="item.name" :item="item">
      <template v-if="item?.children">
        <MenuItems :items="item.children" />
      </template>
    </MenuItem>
  </Component>
</template>

<style scoped></style>
