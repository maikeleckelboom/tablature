<script generic="T extends MenuItem" lang="ts" setup>
import { type ExcludeKeys, hasChildren, isSelectable, type MenuItem } from '~/modules/menu/types'

defineSlots<{
  default({ item }: { item: T }): any
  item({ item }: { item: T }): any
}>()

const baseHeaderClass = 'size-full text-start flex items-center gap-x-2 p-1.5 select-none'

const props = withDefaults(
  defineProps<{
    list: T[]
    level?: number
    indent?: number | false
    static?: boolean
    exclude?: ExcludeKeys[]
    headerClass?(base: string, type: 'button' | 'label'): string
    transitionName?: string
    transitionDuration?: number
  }>(),
  {
    list: () => [],
    level: 1,
    indent: 12,
    static: false,
    headerClass: () => baseHeaderClass,
    transitionName: 'tree-list',
    transitionDuration: 320
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
  if (minSelections !== undefined && minSelections > 0) {
    children.forEach((opt) => {
      opt.selected = opt === option
    })
    return
  }
  children.forEach((opt) => {
    opt.selected = opt === option ? !opt.selected : false
  })
}

function getRadioOrCheckbox(item: T) {
  if (item.multiple) {
    return 'checkbox'
  }
  return 'checkbox'
  // return 'radio'
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

function getListClass(): string {
  return 'tree-list'
}

function getListItemClass(item: T): string {
  return 'tree-list-item'
}

const transitionDelay = computed<number>(() => interpolate(props.transitionDuration))
const transitionTotalDuration = computed<number>(
  () => props.transitionDuration + transitionDelay.value
)

const transitionStyles = computed<Record<string, string>>(() => ({
  '--transition-delay': `${transitionDelay.value}ms`,
  '--transition-duration': `${props.transitionDuration}ms`
}))
</script>

<template>
  <ul
    :class="getListClass()"
    :data-level="level"
    :role="level === 1 ? 'tree' : 'group'"
    :style="transitionStyles"
    class="tree-list"
  >
    <li
      v-for="item in list"
      :key="getName(item)"
      :aria-expanded="hasChildren(item) ? item.open : undefined"
      :aria-selected="item.selected"
      :class="getListItemClass(item)"
      role="treeitem"
    >
      <slot :item="item">
        <TreeItemHeader
          :class="headerClass(baseHeaderClass, 'button')"
          :disabled="getDisabled(item)"
          :exclude="exclude"
          :item="item"
          as="button"
          @click="onClick(item)"
        >
          <slot name="item" :item="item" />
        </TreeItemHeader>
        <template v-if="hasChildren(item)">
          <template v-if="isSelectable(item)">
            <Transition :duration="transitionTotalDuration" :name="transitionName">
              <TreeList
                v-show="isAlwaysOpen || item.open"
                v-slot="{ item: option }"
                :exclude="exclude"
                :indent="indent"
                :list="<T[]>item.children"
                :level="level + 1"
                :style="indentStyles"
              >
                <TreeItemHeader
                  :class="headerClass(baseHeaderClass, 'label')"
                  :exclude="exclude"
                  :for="getName(option)"
                  :item="option"
                  as="label"
                >
                  <template #leading>
                    <input
                      :id="getName(option)"
                      :aria-hidden="exclude?.includes('selection')"
                      :checked="option.selected"
                      :class="exclude?.includes('selection') ? 'sr-only' : ''"
                      :disabled="getDisabled(option)"
                      :name="getName(item)"
                      :type="getRadioOrCheckbox(item)"
                      @click="onSelect(item, option)"
                    />
                  </template>
                  <slot name="item" :item="option" />
                </TreeItemHeader>
              </TreeList>
            </Transition>
          </template>
          <template v-else>
            <Transition :duration="transitionTotalDuration" :name="transitionName">
              <TreeList
                v-show="isAlwaysOpen || item.open"
                :exclude="exclude"
                :header-class="headerClass"
                :indent="indent"
                :list="<T[]>item.children"
                :level="level + 1"
                :style="indentStyles"
                v-slot="{ item }"
              >
                <slot name="item" :item="item" />
              </TreeList>
            </Transition>
          </template>
        </template>
      </slot>
    </li>
  </ul>
</template>

<style>
.tree-list {
  width: 100%;

  li {
    transition-property: grid-template-rows;
    transition-duration: var(--transition-duration);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    display: grid;
    grid-template-rows: auto 0fr;
    grid-template-columns: 1fr;
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
      transition-delay: calc(var(--transition-delay) * 0.4);
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
    transform: translateY(-8px);
    transform-origin: top;
  }

  .tree-list-enter-active * {
    transition-delay: calc(var(--transition-delay) * 0.2);
  }
}
</style>
