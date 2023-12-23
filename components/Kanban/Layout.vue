<script lang="ts" setup>
import type { Board, ListItem } from '~/types'

const list = ref<ListItem[]>([
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Create Board',
    href: '/boards/create'
  }
])

const { data } = await useAsyncData<Board[]>('boards', () =>
  $fetch('http://127.0.0.1:8000/api/v1/kanban/boards')
)
const store = useBoardStore()

if (data.value) {
  list.value.push({
    name: 'Boards',
    href: '/boards',
    children: data.value.map((board) => ({
      name: board.title,
      href: `/boards/${board.id}`
    }))
  })
  store.setBoards(data.value)
}
</script>

<template>
  <TwoColumnLayout>
    <template #header>
      <slot name="header" />
    </template>
    <template #aside>
      <List :list="list" />
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </TwoColumnLayout>
</template>
