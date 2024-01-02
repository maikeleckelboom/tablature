<script generic="T extends MenuItem" lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

const props = withDefaults(
  defineProps<{
    items: T[]
    level?: number
    indent?: number | false
  }>(),
  {
    level: 1,
    indent: 12
  }
)

function isDisabled(item: T) {
  if (item?.onClick !== undefined) {
    return false
  }
  return item?.disabled || !item?.children?.length
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
  if (item?.onClick) {
    item.onClick(item)
    return
  }

  item.open = !item.open
}
</script>

<template>
  <ul>
    <li v-for="item in props.items" :key="item.name">
      <button @click="getClick(item)" :disabled="isDisabled(item)">
        <template v-if="item?.children">
          <Icon v-if="item.open" class="size-4" name="ic:round-indeterminate-check-box" />
          <Icon v-else class="size-4" name="ic:round-add-box" />
        </template>
        {{ item.name }}
      </button>
      <template v-if="item?.children">
        <List
          v-if="item.open"
          :items="<T[]>item.children"
          :level="props.level + 1"
          :indent="props.indent"
          :style="{
            paddingLeft: `${getIndent()}px`
          }"
        />
      </template>
    </li>
  </ul>
</template>

<style scoped></style>
