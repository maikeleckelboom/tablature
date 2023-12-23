<script lang="ts" setup>
import type { Board, ListItem, ListItemWithChildren } from '~/types'

const menu = ref<ListItem[]>([
  {
    name: 'Home',
    href: '/'
  }
])

const { data } = await useAsyncData<Board[]>('boards', () =>
  $fetch('http://127.0.0.1:8000/api/v1/kanban/boards')
)
const store = useBoardStore()

if (data.value) {
  const menuBoards = {
    name: 'Boards',
    href: '/boards',
    children: data.value.map((board) => {
      return {
        name: board.title,
        href: `/boards/${board.id}`
      }
    })
  }
  menu.value.push(menuBoards)
  store.setBoards(data.value)
}
</script>

<template>
  <TwoColumnLayout>
    <template #header>
      <slot name="header" />
    </template>
    <template #aside>
      <List :list="menu">
        <template #name="{ item, level }">
          <span v-if="level > 0" class="mx-2 h-1 w-4 self-center rounded bg-primary-container" />
          <span>It tracks ! -> {{ item.name }}</span>
        </template>
      </List>
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </TwoColumnLayout>
</template>
