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
  // If minSelections is set to 1, select the current option
  if (item.minSelections === 1) {
    option.selected = true
    return
  }
  // Otherwise, toggle the selection state of the current option
  option.selected = !option.selected
}

function handleSingleSelection(item: T, option: T) {
  const { children, minSelections } = item
  // Check if minSelections is not undefined and is greater than 0
  if (minSelections !== undefined && minSelections > 0) {
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

function getKey(item: T) {
  return slugify(item.label)
}

function getDisabled(item: T): boolean {
  return item.disabled || false
}

function getGroupName(item: T) {
  item.groupName ??= slugify(item.label)
  return item.groupName
}

const isAlwaysOpen = computed<boolean>(() => !!props.static)

const indentStyles = computed<Record<string, string>>(() => ({
  paddingLeft: `${getIndent()}px`
}))

const itemOpenIconName = 'ic:round-indeterminate-check-box'
const itemClosedIconName = 'ic:round-add-box'
const itemToggleIconClass = 'size-4'
const itemSelectableLabelClass =
  'flex flex-row items-center gap-x-2 size-full text-start cursor-pointer'

defineSlots<{
  default({ item }: { item: T }): any
}>()

type VueCSSRule =
  | string
  | Record<string, string | number | boolean>
  | Array<string | Record<string, string | number | boolean>>

function getListClass(): VueCSSRule {
  return 'custom-list'
}

function getListItemClass(item: T): VueCSSRule {
  return 'custom-list-item'
}
</script>

<template>
  <ul
    :class="getListClass()"
    :data-level="level"
    aria-labelledby=""
    :role="level === 1 ? 'tree' : 'group'"
  >
    <li
      v-for="item in items"
      :key="getKey(item)"
      :class="getListItemClass(item)"
      :aria-selected="item.selected"
      :role="isItemWithChildren(item) ? 'treeitem' : undefined"
      :aria-expanded="isItemWithChildren(item) ? item.open : undefined"
    >
      <slot :item="item">
        <!-- ContextListButton -->
        <button :disabled="getDisabled(item)" @click="onClick(item)" class="size-full text-start">
          <template v-if="isItemWithChildren(item)">
            <Icon v-if="item.open" :class="itemToggleIconClass" :name="itemOpenIconName" />
            <Icon v-else :class="itemToggleIconClass" :name="itemClosedIconName" />
          </template>
          <template v-if="item.leadingIcon">
            <Icon :class="itemToggleIconClass" :name="item.leadingIcon" />
          </template>
          <span class="label-text">{{ item.label }}</span>
          <template v-if="item.trailingIcon">
            <Icon :class="itemToggleIconClass" :name="item.trailingIcon" />
          </template>
          <template v-if="item.trailingText">
            <span>{{ item.trailingText }}</span>
          </template>
          <template v-if="item.shortcuts?.length">
            <!-- ContextListShortcuts -->
            <span class="text-sm">
              <span v-for="(shortcut, index) in item.shortcuts" :key="index">
                <kbd>{{ shortcut }}</kbd>
                <template v-if="index < item.shortcuts.length - 1">+</template>
              </span>
            </span>
          </template>
        </button>

        <template v-if="isItemWithChildren(item)">
          <template v-if="isSelectableItem(item)">
            <ContextList
              v-if="isAlwaysOpen || item.open"
              v-slot="{ item: option }"
              :items="<T[]>item.children"
              :indent="indent"
              :level="level + 1"
              :style="indentStyles"
            >
              <label :class="itemSelectableLabelClass" :for="getKey(option)">
                <input
                  :id="getKey(option)"
                  :checked="option.selected"
                  :disabled="getDisabled(option)"
                  :name="getGroupName(item)"
                  :type="getRadioOrCheckbox(item)"
                  @click="onSelect(item, option)"
                />
                <!-- duplicate -->
                <template v-if="option.leadingIcon">
                  <Icon :class="itemToggleIconClass" :name="option.leadingIcon" />
                </template>
                <span class="label-text">{{ option.label }}</span>
                <template v-if="option.trailingIcon">
                  <Icon :class="itemToggleIconClass" :name="option.trailingIcon" />
                </template>
                <template v-if="option.trailingText">
                  {{ option.trailingText }}
                </template>
                <template v-if="option.shortcuts?.length">
                  <span class="text-sm">
                    <span v-for="(shortcut, index) in option.shortcuts" :key="index">
                      <kbd>{{ shortcut }}</kbd>
                      <template v-if="index < option.shortcuts.length - 1">+</template>
                    </span>
                  </span>
                </template>
                <!-- end duplicate -->
              </label>
            </ContextList>
          </template>
          <template v-else>
            <ContextList
              v-if="isAlwaysOpen || item.open"
              :items="<T[]>item.children"
              :level="level + 1"
              :indent="indent"
              :style="indentStyles"
            />
          </template>
        </template>
      </slot>
    </li>
  </ul>
</template>

<style scoped></style>
