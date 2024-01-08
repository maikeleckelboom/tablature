<script lang="ts" setup>
import { hasChildren, type MenuItem } from '~/modules/menu/types'

withDefaults(
  defineProps<{
    item: MenuItem
    as?: string
    excludes?: ('select-box' | 'leading-icon' | 'trailing-icon' | 'trailing-text' | 'shortcuts')[]
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
  <Component :is="$props.as">
    <slot name="leading" />
    <template v-if="hasChildren(item)">
      <Icon v-if="item.open" :name="openIcon" class="size-4" />
      <Icon v-else :name="closeIcon" class="size-4" />
    </template>
    <template v-if="!excludes?.includes('leading-icon') && item.leadingIcon">
      <Icon :name="item.leadingIcon" class="size-4" />
    </template>
    <span class="label-text select-none">{{ item.label }}</span>
    <template v-if="!excludes?.includes('trailing-icon') && item.trailingIcon">
      <Icon :name="item.trailingIcon" class="size-4" />
    </template>
    <template v-if="!excludes?.includes('trailing-text') && item.trailingText">
      <span>{{ item.trailingText }}</span>
    </template>
    <template v-if="!excludes?.includes('shortcuts') && item.shortcuts?.length">
      <TreeListItemShortcuts :shortcuts="item.shortcuts" />
    </template>
    <slot name="trailing" />
  </Component>
</template>

<style scoped></style>
