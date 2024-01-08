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

function isDisabled(item: T): boolean {
  return item.disabled || false
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

function getInputName(item: T) {
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
const itemSelectableLabelClass = 'flex flex-row gap-2'

defineSlots<{
  default({ item }: { item: T }): any
}>()

function getKey(item: T) {
  return slugify(item.label)
}

const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate<{ item: MenuItem }>()
</script>

<template>
  <ul>
    <li v-for="item in items" :key="getKey(item)">
      <slot :item="item">
        <button :disabled="isDisabled(item)" @click="onClick(item)">
          <template v-if="isItemWithChildren(item)">
            <Icon v-if="item.open" :class="itemToggleIconClass" :name="itemOpenIconName" />
            <Icon v-else :class="itemToggleIconClass" :name="itemClosedIconName" />
          </template>
          <!-- duplicate -->
          <template v-if="item.leadingIcon">
            <Icon :class="itemToggleIconClass" :name="item.leadingIcon" />
          </template>
          {{ item.label }}
          <template v-if="item.trailingIcon">
            <Icon :class="itemToggleIconClass" :name="item.trailingIcon" />
          </template>
          <template v-if="item.trailingText">
            <span>{{ item.trailingText }}</span>
          </template>
          <template v-if="item.shortcuts?.length">
            <span class="text-sm">
              <span v-for="(shortcut, index) in item.shortcuts" :key="index">
                <kbd>{{ shortcut }}</kbd>
                <template v-if="index < item.shortcuts.length - 1">+</template>
              </span>
            </span>
          </template>
          <!-- end duplicate -->
        </button>
        <template v-if="isItemWithChildren(item)">
          <template v-if="isSelectableItem(item)">
            <List
              v-if="isAlwaysOpen || item.open"
              v-slot="{ item: option }"
              :items="item.children"
              :level="level + 1"
              :style="indentStyles"
            >
              <label :class="itemSelectableLabelClass" :for="getKey(option)">
                <input
                  :id="getKey(option)"
                  :checked="option.selected"
                  :disabled="isDisabled(option)"
                  :name="getInputName(item)"
                  :type="getRadioOrCheckbox(item)"
                  @click="onSelect(item, option)"
                />
                <!-- duplicate -->
                <template v-if="option.leadingIcon">
                  <Icon :class="itemToggleIconClass" :name="option.leadingIcon" />
                </template>
                <button :disabled="isDisabled(option)" @click="onSelect(item, option)">
                  {{ option.label }}
                </button>
                {{ option.label }}
                <template v-if="option.trailingIcon">
                  <Icon :class="itemToggleIconClass" :name="option.trailingIcon" />
                </template>
                <template v-if="option.trailingText">
                  <span>{{ option.trailingText }}</span>
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
            </List>
          </template>
          <template v-else>
            <List
              v-if="isAlwaysOpen || item.open"
              :items="item.children"
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
