<script lang="ts" setup>
import type { Board as TBoard } from '~/types'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { apiUrl } = runtimeConfig.public

const { data, pending, error } = await useAsyncData<TBoard>('board', () =>
  $fetch(`${apiUrl}/kanban/boards/${route.params.id}`)
)

const store = useBoardStore()

if (data.value) {
  store.setBoard(data.value)
}

const { board } = storeToRefs(store)
</script>

<template>
  <div v-if="pending">
    <span>Pending ⏰</span>
  </div>
  <div v-else-if="error">
    <span>Error ❌😱</span>
    <pre>{{ error }}</pre>
  </div>
  <KanbanBoard v-else-if="board" :board="board" />
</template>
