<script generic="T extends MenuItem" lang="ts" setup>
import { hasChildren, isSelectable, type MenuItem } from '~/modules/menu/types'

const baseHeaderClass = 'size-full text-start flex items-center gap-x-2 cursor-pointer'

const props = withDefaults(
  defineProps<{
    items: T[]
    level?: number
    indent?: number | false
    static?: boolean
    excludes?: ('select-box' | 'leading-icon' | 'trailing-icon' | 'trailing-text' | 'shortcuts')[]
    getHeaderClass?(classes: string, type: 'button' | 'label'): string
  }>(),
  {
    items: () => [],
    level: 1,
    indent: 12,
    static: false,
    getHeaderClass: () => baseHeaderClass
  }
)

function onClick(item: T) {
  if (item?.onClick !== undefined) {
    item.onClick()
  }

  if (!hasChildren(item)) {
    return
  }

  item.open = !item.open
}

function onSelect(item: T, option: T) {
  if (item.multiple) {
    handleMultipleSelection(item, option)
    return
  }
  handleSingleSelection(item, option)
}

function handleMultipleSelection(item: T, option: T) {
  if (item.minSelections === 1) {
    option.selected = true
    return
  }
  option.selected = !option.selected
}

function handleSingleSelection(item: T, option: T) {
  const { children, minSelections } = item
  // Check if minSelections is defined and greater than 0
  if (minSelections !== undefined && minSelections > 0) {
    // ... select only the clicked option
    children.forEach((opt) => {
      opt.selected = opt === option
    })
    return
  }
  // Toggle selection state of clicked option
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
  <ul
    :class="getListClass()"
    :data-level="level"
    :role="level === 1 ? 'tree' : 'group'"
    class="tree-list"
    :style="{
      '--transition-delay': `${50}ms`,
      '--transition-duration': `${300}ms`
    }"
  >
    <li
      v-for="item in items"
      :key="getName(item)"
      :aria-expanded="hasChildren(item) ? item.open : undefined"
      :aria-selected="item.selected"
      :class="getListItemClass(item)"
      role="treeitem"
    >
      <slot :item="item">
        <TreeListItemHeader
          :class="getHeaderClass(baseHeaderClass, 'button')"
          :disabled="getDisabled(item)"
          :excludes="excludes"
          :item="item"
          as="button"
          @click="onClick(item)"
        />
        <template v-if="hasChildren(item)">
          <template v-if="isSelectable(item)">
            <Transition name="tree-list" :duration="500">
              <TreeList
                v-show="isAlwaysOpen || item.open"
                v-slot="{ item: option }"
                :excludes="excludes"
                :indent="indent"
                :items="<T[]>item.children"
                :level="level + 1"
                :style="indentStyles"
              >
                <TreeListItemHeader
                  :class="getHeaderClass(baseHeaderClass, 'label')"
                  :for="getName(option)"
                  :excludes="excludes"
                  :item="option"
                  as="label"
                >
                  <template #leading>
                    <input
                      :id="getName(option)"
                      :aria-hidden="excludes?.includes('select-box')"
                      :checked="option.selected"
                      :class="excludes?.includes('select-box') ? 'sr-only' : ''"
                      :disabled="getDisabled(option)"
                      :name="getName(item)"
                      :type="getRadioOrCheckbox(item)"
                      @click="onSelect(item, option)"
                    />
                  </template>
                </TreeListItemHeader>
              </TreeList>
            </Transition>
          </template>
          <template v-else>
            <Transition name="tree-list" :duration="500">
              <TreeList
                v-show="isAlwaysOpen || item.open"
                :get-header-class="getHeaderClass"
                :excludes="excludes"
                :indent="indent"
                :items="<T[]>item.children"
                :level="level + 1"
                :style="indentStyles"
              />
            </Transition>
          </template>
        </template>
      </slot>
    </li>
  </ul>
</template>

<style>
.tree-list {
  --transition-delay: var(--transition-delay, 100ms);
  --transition-duration: var(--transition-duration, 400ms);

  li {
    transform: translateX(0px);
    transition-duration: var(--transition-duration);
    transition-property: grid-template-rows;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    display: grid;
    grid-template-rows: auto 0fr;

    place-content: start;

    &[aria-expanded] {
      min-block-size: 100%;
      min-height: 0;

      > * + ul {
        overflow: hidden;
        min-inline-size: 100%;
      }
    }

    &[aria-expanded='true'] {
      grid-template-rows: auto 1fr;
    }

    &[aria-expanded='false'] {
      transition-timing-function: ease-in-out;
      transition-delay: var(--transition-delay);
    }
  }

  .tree-list-enter-active *,
  .tree-list-leave-active * {
    transition-duration: var(--transition-duration);
    transition-property: transform, opacity;
  }

  .tree-list-enter-from *,
  .tree-list-leave-to * {
    opacity: 0;
    transform-origin: right center;
    transform: translateY(8px) scaleX(0.9);
  }

  .tree-list-enter-active * {
    transition-delay: calc(var(--transition-delay) * 2);
  }
}
</style>
