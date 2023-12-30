<script lang="ts" setup>
import type { Board as TBoard } from '~/types'
import useKanbanStore from '~/stores/useKanbanStore'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { apiUrl } = runtimeConfig.public
const { data, pending, error } = await useAsyncData<TBoard>('board', () =>
  $fetch(`${apiUrl}/kanban/boards/${(route as any).params.id ?? 1}`)
)

const store = useKanbanStore()

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
  <div v-else>
    <ColumnLayout>
      <KanbanBoard :board="data" />
    </ColumnLayout>
  </div>
</template>

<style scoped></style>
