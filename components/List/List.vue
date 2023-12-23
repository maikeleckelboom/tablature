<script generic="TItem extends ListItem" lang="ts" setup>
import type { ListItem, ListItemLink, ListItemWithChildren } from '~/types'

type ClassProps<TValue> = {
  link: TValue
  base: TValue
  selected: TValue
}

interface Props {
  list: TItem[]
  selected?: TItem
  level?: number
  classes?: ClassProps<string>
}

const {
  list,
  selected,
  level = 0,
  classes = {
    base: 'flex p-2',
    link: '',
    selected: 'bg-secondary-container text-on-secondary-container'
  }
} = defineProps<Props>()

interface SlotProps {
  item: TItem
  level: number
}

const slots = defineSlots<{
  item: ({ item, level }: SlotProps) => any
  name: ({ item, level }: SlotProps) => any
}>()

function isMenuItemWithChildren(
  item: TItem
): item is TItem extends ListItemWithChildren ? TItem : never {
  return (item as ListItemWithChildren).children !== undefined
}

function isMenuItem(item: TItem): item is TItem extends ListItem ? TItem : any {
  return !isMenuItemWithChildren(item)
}

function isMenuLink(item: TItem): item is TItem extends ListItemLink ? TItem : any {
  return (item as ListItemLink).href !== undefined
}

const router = useRouter()
const route = useRoute()

function selectedCheck(item: TItem) {
  if (isMenuLink(item)) {
    return router.resolve(item.href).href === route.fullPath
  }

  return false
}

function isSelected(item: TItem) {
  return selectedCheck(item) || item === selected
}
</script>

<template>
  <menu>
    <li v-for="(item, index) in list" :key="item.name">
      <slot name="item" v-bind="{ item, level }">
        <ListItem :item="item" :level="level" :classes="classes">
          <slot name="name" v-bind="{ item, level }">
            {{ item.name }}
          </slot>
        </ListItem>
        <!--        <NuxtLink
                  v-if="isMenuLink(item)"
                  :class="[classes.base, classes.link, isSelected(item) && classes.selected]"
                  :to="item.href"
                >
                  <slot name="name" v-bind="{ item, level }">
                    {{ item.name }}
                  </slot>
                </NuxtLink>
                <button
                  v-else-if="isMenuItem(item)"
                  :class="[classes.base, isSelected(item) && classes.selected]"
                >
                  <slot name="name" v-bind="{ item, level }">
                    {{ item.name }}
                  </slot>
                </button>-->
      </slot>
      <List
        v-if="isMenuItemWithChildren(item)"
        :level="level + 1"
        :list="<TItem[]>item.children"
        :class="[classes, 'pl-4']"
      >
        <template #item="{ item, level }">
          <ListItem :item="item" :level="level" :classes="classes">
            <slot name="name" v-bind="{ item, level }">
              {{ item.name }}
            </slot>
          </ListItem>
          <!--          <NuxtLink-->
          <!--            v-if="isMenuLink(item)"-->
          <!--            :class="[classes.item, classes.link, isSelected(item) && classes.selected]"-->
          <!--            :to="item.href"-->
          <!--          >-->
          <!--            <slot name="name" v-bind="{ item, level }">-->
          <!--              {{ item.name }}-->
          <!--            </slot>-->
          <!--          </NuxtLink>-->
          <!--          <button-->
          <!--            v-else-if="isMenuItem(item)"-->
          <!--            :class="[classes.item, isSelected(item) && classes.selected]"-->
          <!--          >-->
          <!--            <slot name="name" v-bind="{ item, level }">-->
          <!--              {{ item.name }}-->
          <!--            </slot>-->
          <!--          </button>-->
        </template>
      </List>
    </li>
  </menu>
</template>

<style scoped></style>
