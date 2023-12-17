<script lang="ts" setup>
import type { Board } from '~/types'
import { useDraggable } from 'vue-draggable-plus'

const { board } = defineProps<{
  board: Board
}>()

const store = useBoardStore()

const draggableOptions = {
  group: 'columns',
  handle: '[data-handle="column"]',
  dragClass: 'sortable-column-drag',
  ghostClass: 'sortable-column-ghost',
  chosenClass: 'sortable-column-chosen',
  fallbackClass: 'sortable-column-fallback',
  animation: 280,
  forceFallback: false,
  removeCloneOnHide: false,
  onEnd() {
    store.updateColumnsPosition()
    const columns = useCloneDeep(board.columns).map((column) => ({
      id: column.id,
      position: column.position
    }))
    store.reorderColumnsCommit({
      id: board.id,
      columns
    })
  }
}

const columns = computed({
  get: () => board.columns,
  set: (v) => {
    if (!v || !board) return
    board.columns = v
  }
})

const columnsContainer = ref<HTMLElement>()

const d = useDraggable(columnsContainer, columns, draggableOptions)
</script>

<template>
  <div class="mx-auto flex h-screen flex-col overflow-clip">
    <div
      ref="columnsContainer"
      class="grid h-full grid-cols-2 even:bg-surface-level-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <KanbanColumn v-for="column in columns" :key="column.id" :column="column" />
    </div>
  </div>
</template>
