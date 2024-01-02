<script generic="T extends MenuItem" lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

const props = defineProps<{
  items: T[]
  static?: boolean
  unmount?: boolean
}>()

function hasStaticAttribute() {
  return props.static !== undefined
}

function hasUnmountAttribute() {
  return props.unmount !== undefined
}

const unmount = computed(() => {
  if (hasUnmountAttribute()) {
    return 'v-if'
  }

  return 'v-show'
})
</script>

<template>
  <MenuItem v-for="item in items" :key="item.name" :item="item">
    {{ item.name }}
    <template v-if="item?.children">
      <Menu :[unmount]="item.open" :items="<T[]>item.children" />
    </template>
  </MenuItem>
</template>

<style scoped></style>
