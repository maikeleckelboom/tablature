<script lang="ts" setup>
import { type ExcludeKeys, hasChildren, type MenuItem } from '~/modules/menu/types'

withDefaults(
  defineProps<{
    item: MenuItem
    as?: string
    exclude?: ExcludeKeys[]
    openIcon?: string
    closeIcon?: string
  }>(),
  {
    as: 'button',
    openIcon: 'ic:round-expand-more',
    closeIcon: 'ic:round-expand-less'
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
    <template v-if="!exclude?.includes('leading-icon') && item.leadingIcon">
      <Icon :name="item.leadingIcon" class="size-4" />
    </template>
    <span class="label-text select-none leading-none">{{ item.label }}</span>
    <template v-if="!exclude?.includes('trailing-icon') && item.trailingIcon">
      <Icon :name="item.trailingIcon" class="size-4" />
    </template>
    <template v-if="!exclude?.includes('trailing-text') && item.trailingText">
      <span>{{ item.trailingText }}</span>
    </template>
    <template v-if="!exclude?.includes('shortcuts') && item.shortcuts?.length">
      <TreeItemShortcuts :shortcuts="item.shortcuts" />
    </template>
    <slot name="trailing" />
  </Component>
</template>

<style scoped></style>
