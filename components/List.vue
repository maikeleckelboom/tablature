<script generic="T extends MenuItem" lang="ts" setup>
import { isRecursiveItem, type MenuItem } from '~/modules/menu/types'

const props = withDefaults(
  defineProps<{
    items: T[]
    level?: number
    indent?: number | false
    static?: boolean
  }>(),
  {
    items: () => [],
    level: 1,
    indent: 12,
    static: false
  }
)

function isDisabled(item: T): boolean {
  return false
}

function getIndent() {
  if (props.indent === false) {
    return 0
  }
  return props.indent * props.level
}

function onClick(item: T) {
  if (item?.onClick !== undefined) {
    item.onClick()
  }

  if (!isRecursiveItem(item)) {
    return
  }

  item.open = !item.open
}

function onSelect(item: T, option: T) {
  if (item.multiple) {
    option.selected = !option.selected
    return
  }

  item.children.map((opt) => {
    // noBlankSelection, or allowNoSelection
    if (!item.allowNoSelection) {
      opt.selected = opt === option
      return
    }
    opt.selected = opt === option ? !opt.selected : false
  })
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in props.items" :key="index">
      <slot :item="item" name="item">
        <button :disabled="isDisabled(item)" @click="onClick(item)">
          <template v-if="isRecursiveItem(item)">
            <Icon v-if="item.open" class="size-4" name="ic:round-indeterminate-check-box" />
            <Icon v-else class="size-4" name="ic:round-add-box" />
          </template>
          {{ item.label }}
        </button>
        <template v-if="isRecursiveItem(item)">
          <template v-if="item.selectable">
            <List
              v-if="props.static || item.open"
              :items="<T[]>item.children"
              :level="props.level + 1"
              :style="{ paddingLeft: `${getIndent()}px` }"
            >
              <template #item="{ item: option }">
                <div class="flex flex-row">
                  <div class="w-6">
                    <Icon v-if="option.selected" class="mr-2 size-4" name="ic:baseline-check" />
                  </div>
                  <button :disabled="isDisabled(option)" @click="onSelect(item, option)">
                    {{ option.label }}
                  </button>
                </div>
              </template>
            </List>
          </template>
          <template v-else>
            <List
              v-if="props.static || item.open"
              :items="<T[]>item.children"
              :level="props.level + 1"
              :style="{ paddingLeft: `${getIndent()}px` }"
            />
          </template>
        </template>
      </slot>
    </li>
  </ul>
</template>

<style scoped></style>
