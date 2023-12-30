<script generic="TItem extends MaybeRecursiveListItem" lang="ts" setup>
import type { MaybeRecursiveListItem } from '~/modules/list/types'

interface Props {
  list: TItem[]
  level?: number
  tag?: 'ul' | 'ol' | 'menu'
  titleValue?: (item: TItem) => string
  listClass?: (level: number) => string
  itemClass?: (item: TItem, level: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  tag: 'ul',
  listClass: () => '',
  itemClass: () => '',
  titleValue: (item: TItem) => item.name
})

defineSlots<{
  default: (props?: { item: TItem; level: number; isRecursive: boolean }) => any
}>()

function isRecursiveListItem<T>(item: T): item is T extends MaybeRecursiveListItem ? T : never {
  return (item as MaybeRecursiveListItem)?.children !== undefined
}

onMounted(() => {
  console.log('test')
})
</script>

<template>
  <Component :is="tag" :class="listClass(level)">
    <slot
      v-for="item in list"
      :key="item.name"
      v-bind="{ item, level, isRecursive: isRecursiveListItem(item) }"
    >
      <li :class="itemClass(item, level)">
        <span>{{ titleValue(item) }}</span>
        <RecursiveList
          v-if="isRecursiveListItem(item)"
          v-slot="{ item, level }"
          :level="level + 1"
          :list="<TItem[]>item.children"
          :list-class="() => listClass(level + 1)"
          :item-class="() => itemClass(item, level + 1)"
        >
          <slot v-bind="{ item, level, isRecursive: isRecursiveListItem(item) }">
            <li :class="itemClass(item, level)">
              <span>{{ titleValue(item) }}</span>
              <RecursiveList
                v-if="isRecursiveListItem(item)"
                v-slot="{ item, level }"
                :level="level + 1"
                :list="<TItem[]>item.children"
                :list-class="() => listClass(level + 1)"
                :item-class="() => itemClass(item, level + 1)"
              />
            </li>
          </slot>
        </RecursiveList>
      </li>
    </slot>
  </Component>
</template>
