<script generic="T extends MenuItem" lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'
import type { Component } from 'vue'

const props = defineProps<{
  item: T
  as?: string | Component
}>()

const slots = defineSlots<{
  default: (props: { open: boolean; disabled: boolean; close: () => void }) => any
}>()

const emit = defineEmits<{
  close: [item: T]
}>()

const resolvedAsComponent = computed(() => {
  if (props.as) {
    return props.as
  }

  return 'div'
})

function closeEvent() {
  emit('close', props.item)
}

function isDisabled() {
  return props.item.disabled
}

function onClick(evt: Event) {
  if (isDisabled()) {
    return
  }

  closeEvent()
}

function isOpen() {
  return props.item.open
}
</script>

<template>
  <Component :is="resolvedAsComponent" @click="onClick">
    <slot :close="closeEvent" :disabled="isDisabled()" :open="isOpen()" />
  </Component>
</template>

<style scoped></style>
