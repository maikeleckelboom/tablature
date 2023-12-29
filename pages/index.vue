<script lang="ts" setup>
import type { AccordionItem } from '~/types'

const store = useListStore()
const items = ref<AccordionItem[]>([
  {
    name: 'item-1',
    title: 'Item 1',
    content: 'Content 1'
  },
  {
    name: 'item-2',
    title: 'Item 2',
    content: 'Content 2',
    open: true,
    children: [
      {
        name: 'item-2-1',
        title: 'Item 2.1',
        content: 'Content 2.1'
      },
      {
        name: 'item-2-2',
        title: 'Item 2.2',
        content: 'Content 2.2'
      }
    ]
  },
  {
    name: 'item-3',
    title: 'Item 3',
    content: 'Content 3',
    open: true,

    children: [
      {
        name: 'item-3-1',
        title: 'Item 3.1',
        content: 'Content 3.1'
      },
      {
        name: 'item-3-2',
        title: 'Item 3.2',
        content: 'Content 3.2',
        open: true,

        children: [
          {
            name: 'item-3-2-1',
            title: 'Item 3.2.1',
            content: 'Content 3.2.1'
          },
          {
            name: 'item-3-2-2',
            title: 'Item 3.2.2',
            content: 'Content 3.2.2'
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <div class="m-4 mx-auto w-full max-w-md">
    <NavigationList :list="store.navigationList" />
  </div>
</template>

<style scoped></style>
