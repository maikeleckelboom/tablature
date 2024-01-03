<script generic="T extends MenuItem" lang="ts" setup>
import { isParentMenuItem, isSelectableMenuItem, type MenuItem } from '~/modules/menu/types'

const props = withDefaults(
  defineProps<{
    items: T[]
    level?: number
    indent?: number | false
  }>(),
  {
    items: () => [],
    level: 1,
    indent: 12
  }
)

function isDisabled(item: T) {
  if (item?.onAction !== undefined) {
    return false
  }

  return item?.disabled
}

function getIndent() {
  if (props.indent === false) {
    return 0
  }
  return props.indent * props.level
}

function getClick(item: T) {
  if (isDisabled(item)) {
    return
  }

  if (item?.onAction !== undefined) {
    item.onAction(item)
  }

  if (isParentMenuItem(item)) {
    item.open = !item.open
  }

  const index = props.items.indexOf(item)
  const parentItem = props.items[props.level + 1]?.children[Math.max(0, index - 1)]

  console.log('item', item)

  if (isSelectableMenuItem(parentItem)) {
    item.checked = !item.checked
  }
  // This is the code that is executed when a menu item is clicked.
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in props.items" :key="index">
      <button :disabled="isDisabled(item)" @click="getClick(item)">
        <template v-if="isParentMenuItem(item)">
          <Icon v-if="item.open" class="size-4" name="ic:round-indeterminate-check-box" />
          <Icon v-else class="size-4" name="ic:round-add-box" />
        </template>
        {{ item.label }}
        <Icon v-if="item.checked" class="ml-1.5 size-4" name="ic:baseline-check" />
        <template v-if="item.shortcut && false">
          <kbd class="font-mono text-body-sm text-on-surface-variant">
            {{ item.shortcut }}
          </kbd>
        </template>
      </button>
      <template v-if="isParentMenuItem(item)">
        <List
          v-if="item.open"
          :indent="props.indent"
          :items="<T[]>item.children"
          :level="props.level + 1"
          :style="{
            paddingLeft: `${getIndent()}px`
          }"
        />
      </template>
    </li>
  </ul>
</template>

<style scoped></style>
