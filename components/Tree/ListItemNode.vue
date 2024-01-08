<script lang="ts" setup>
import { isItemWithChildren, type MenuItem } from '~/modules/menu/types'

withDefaults(
  defineProps<{
    item: MenuItem
    as?: string
    openIcon?: string
    closeIcon?: string
  }>(),
  {
    as: 'button',
    openIcon: 'ic:round-indeterminate-check-box',
    closeIcon: 'ic:round-add-box'
  }
)

defineSlots<{
  leading: () => any
  trailing: () => any
}>()
</script>

<template>
  <Component :is="$props.as" class="size-full text-start">
    <slot name="leading" />
    <template v-if="isItemWithChildren(item)">
      <Icon v-if="item.open" :name="openIcon" class="size-4" />
      <Icon v-else :name="closeIcon" class="size-4" />
    </template>
    <template v-if="item.leadingIcon">
      <Icon :name="item.leadingIcon" class="size-4" />
    </template>
    <span class="label-text">{{ item.label }}</span>
    <template v-if="item.trailingIcon">
      <Icon :name="item.trailingIcon" class="size-4" />
    </template>
    <template v-if="item.trailingText">
      <span>{{ item.trailingText }}</span>
    </template>
    <template v-if="item.shortcuts?.length">
      <TreeListItemShortcuts :shortcuts="item.shortcuts" />
    </template>
    <slot name="trailing" />
  </Component>
</template>

<style scoped></style>
