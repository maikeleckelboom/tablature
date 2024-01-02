<script generic="T extends MenuItem" lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'
import type { Component } from 'vue'

const props = defineProps<{
  item: T
  as?: string | Component
}>()

const slots = defineSlots<{
  default: (props: { open: boolean }) => any
}>()

const resolvedAsComponent = computed(() => {
  if (props.as) {
    return props.as
  }

  return 'div'
})
</script>

<template>
  <Component :is="resolvedAsComponent">
    <slot :open="props.item.open" />
  </Component>
</template>

<style scoped></style>
