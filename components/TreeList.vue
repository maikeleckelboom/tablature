<script generic="T extends MenuItem" lang="ts" setup>
import { isItemWithChildren, isSelectableItem, type MenuItem } from '~/modules/menu/types'

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

function onClick(item: T) {
  if (item?.onClick !== undefined) {
    item.onClick()
  }

  if (!isItemWithChildren(item)) {
    return
  }

  item.open = !item.open
}

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

function handleMultipleSelection(item: T, option: T) {
  if (item.minSelections === 1) {
    // Select the current option
    option.selected = true
    return
  }
  // Toggle the selection state of the current option
  option.selected = !option.selected
}

function handleSingleSelection(item: T, option: T) {
  const { children, minSelections } = item
  // Check if minSelections is not undefined and is greater than 0
  if (minSelections !== undefined && minSelections > 0) {
    // Select only the clicked option
    children.forEach((opt) => {
      opt.selected = opt === option
    })
    return
  }
  // Toggle the selection state of the clicked option
  children.forEach((opt) => {
    opt.selected = opt === option ? !opt.selected : false
  })
}

function getRadioOrCheckbox(item: T) {
  if (item.multiple) {
    return 'checkbox'
  }
  return 'radio'
}

function getIndent() {
  if (props.indent === false) {
    return 0
  }
  return props.indent * props.level
}

function getDisabled(item: T): boolean {
  return item.disabled || false
}

function getName(item: T): string {
  return item.name || (item.name = slugify(item.label))
}

const isAlwaysOpen = computed<boolean>(() => !!props.static)

const indentStyles = computed<Record<string, string>>(() => {
  if (props.indent === false) {
    return {}
  }
  return {
    paddingLeft: `${getIndent()}px`
  }
})

const triggerClass = 'flex flex-row items-center gap-x-2 size-full text-start cursor-pointer'
const triggerLabelClass = triggerClass + ''
const triggerButtonClass = triggerClass + ''

defineSlots<{
  default({ item }: { item: T }): any
}>()

function getListClass(): string {
  return 'tree-list'
}

function getListItemClass(item: T): string {
  return 'tree-list-item'
}
</script>

<template>
  <ul :class="getListClass()" :data-level="level" :role="level === 1 ? 'tree' : 'group'">
    <li
      v-for="item in items"
      :key="getName(item)"
      :aria-expanded="isItemWithChildren(item) ? item.open : undefined"
      :aria-selected="item.selected"
      :class="getListItemClass(item)"
      role="treeitem"
    >
      <slot :item="item">
        <TreeListItemNode
          :disabled="getDisabled(item)"
          :item="item"
          @click="onClick(item)"
          :class="triggerButtonClass"
        />
        <template v-if="isItemWithChildren(item)">
          <template v-if="isSelectableItem(item)">
            <TreeList
              v-if="isAlwaysOpen || item.open"
              v-slot="{ item: option }"
              :indent="indent"
              :items="<T[]>item.children"
              :level="level + 1"
              :style="indentStyles"
            >
              <TreeListItemNode
                :class="triggerLabelClass"
                :for="getName(option)"
                :item="option"
                as="label"
              >
                <template #leading>
                  <input
                    :id="getName(option)"
                    :checked="option.selected"
                    :disabled="getDisabled(option)"
                    :name="getName(item)"
                    :type="getRadioOrCheckbox(item)"
                    @click="onSelect(item, option)"
                  />
                </template>
              </TreeListItemNode>
            </TreeList>
          </template>
          <!-- Nested Group -->
          <template v-else>
            <TreeList
              v-if="isAlwaysOpen || item.open"
              :indent="indent"
              :items="<T[]>item.children"
              :level="level + 1"
              :style="indentStyles"
            />
          </template>
        </template>
      </slot>
    </li>
  </ul>
</template>

<style scoped></style>
