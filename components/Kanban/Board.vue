<script lang="ts" setup>
import type { Board } from '~/types'
import { useDraggable } from 'vue-draggable-plus'
import type { SortableOptions } from 'sortablejs'

const { board } = defineProps<{
  board: Board
}>()

const store = useBoardStore()

const draggableOptions: SortableOptions = {
  group: 'columns',
  handle: '[data-handle="column"]',
  filter: '.draggable-ignore',
  dragClass: 'sortable-column-drag',
  ghostClass: 'sortable-column-ghost',
  chosenClass: 'sortable-column-chosen',
  fallbackClass: 'sortable-column-fallback',
  animation: 300,
  forceFallback: false,
  removeCloneOnHide: false,
  onMove({ related }) {
    return !related.classList.contains('draggable-ignore')
  },
  onEnd() {
    store.updateColumnsPosition()
    const columns = useCloneDeep(board.columns).map((column) => ({
      id: column.id,
      position: column.position
    }))
    store.reorderColumns({ id: board.id, columns })
  }
}

const columns = computed({
  get: () => board.columns,
  set: (v) => {
    board.columns = v
  }
})

const container = ref<HTMLElement>()

const draggable = useDraggable(container, columns, draggableOptions)

const addList = () => {
  store.createColumn({ title: 'New list', board_id: board.id })
}
</script>

<template>
  <div class="flex h-full justify-start">
    <div ref="container" class="flex h-full">
      <KanbanColumn v-for="column in columns" :key="column.id" :column="column" />
    </div>
    <div class="p-3 [min-inline-size:max-content]">
      <Button intent="tonal" @click="addList"> Create a new list</Button>
    </div>
  </div>
</template>
