<script lang="ts" setup>
import type { Board as TBoard } from '~/types'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { data, pending, error } = await useAsyncData<TBoard>('board', () =>
  $fetch(`${runtimeConfig.public.apiUrl}/kanban/boards/${route.params.id}`)
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
  <div v-else class="grid grid-flow-col overflow-clip">
    <Sidebar />
    <div class="overflow-x-auto">
      <KanbanBoard v-if="board" :board="board" />
    </div>
  </div>
</template>

<style scoped></style>
