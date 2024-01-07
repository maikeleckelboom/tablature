<script generic="T extends MenuItem" lang="ts" setup>
import { isItemWithChildren, type MenuItem } from '~/modules/menu/types'

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
  return item.disabled || false
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

  if (!isItemWithChildren(item)) {
    return
  }

  item.open = !item.open
}

// Main function to handle selection
function onSelect(item: T, option: T) {
  // Check if the item allows multiple selections
  if (item.multiple) {
    // Call the handler for multiple selections
    handleMultipleSelection(item, option)
    return
  }
  // Call the handler for single selection
  handleSingleSelection(item, option)
}

// Handler for multiple selections
function handleMultipleSelection(item: T, option: T) {
  // If minSelections is set to 1, select the current option
  if (item.minSelections === 1) {
    option.selected = true
    return
  }
  // Otherwise, toggle the selection state of the current option
  option.selected = !option.selected
}

// Handler for single selection
function handleSingleSelection(item: T, option: T) {
  // Extract children and minSelections from the item
  const { children, minSelections } = item
  // Check if minSelections is a positive number
  if (Number(minSelections) && minSelections > 0) {
    // If true, select only the clicked option
    children.forEach((opt) => {
      opt.selected = opt === option
    })
    return
  }
  // Otherwise, toggle the selection state of the clicked option
  children.forEach((opt) => {
    opt.selected = opt === option ? !opt.selected : false
  })
}

function radioOrCheckbox(item: T) {
  if (item.multiple) {
    return 'checkbox'
  }
  return 'radio'
}

const itemOpenIcon = 'ic:round-indeterminate-check-box'
const itemClosedIcon = 'ic:round-add-box'

const shouldRender = computed<boolean>(() => !!props.static)
</script>

<template>
  <ul>
    <li v-for="(item, index) in props.items" :key="index">
      <slot :item="item">
        <button :disabled="isDisabled(item)" @click="onClick(item)">
          <template v-if="isItemWithChildren(item)">
            <Icon v-if="item.open" class="size-4" :name="itemOpenIcon" />
            <Icon v-else class="size-4" :name="itemClosedIcon" />
          </template>
          {{ item.label }}
        </button>
        <template v-if="isItemWithChildren(item)">
          <template v-if="item.selectable">
            <List
              v-if="shouldRender || item.open"
              :items="<T[]>item.children"
              :level="props.level + 1"
              :style="{ paddingLeft: `${getIndent() / 2}px` }"
            >
              <template #default="{ item: option }">
                <label :for="slugify(option.label)" class="flex flex-row gap-2">
                  <input
                    :id="slugify(option.label)"
                    :type="radioOrCheckbox(item)"
                    :disabled="isDisabled(option)"
                    :checked="option.selected"
                    @click="onSelect(item, option)"
                  />
                  <button :disabled="isDisabled(option)" @click="onSelect(item, option)">
                    {{ option.label }}
                  </button>
                </label>
              </template>
            </List>
          </template>
          <template v-else>
            <List
              v-if="shouldRender || item.open"
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
