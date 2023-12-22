<script lang="ts" setup>
import type { Card as TCard, Column as TColumn } from '~/types'
import { useDraggable } from 'vue-draggable-plus'
import type { SortableOptions } from 'sortablejs'

const { column } = defineProps<{
  column: TColumn
}>()

const store = useBoardStore()

const { board } = storeToRefs(store)

const cards = computed({
  get: () => column?.cards ?? [],
  set: (v: TCard[] | undefined) => {
    if (!v) return
    column.cards = v
  }
})

const containerRef = ref<HTMLElement>()

const draggableOptions: SortableOptions = {
  group: 'cards',
  filter: '.d-ignore',
  animation: 300,
  dragClass: 'sortable-card-drag',
  ghostClass: 'sortable-card-ghost',
  chosenClass: 'sortable-card-chosen',
  fallbackClass: 'sortable-card-fallback',
  forceFallback: true,
  fallbackOnBody: true,
  removeCloneOnHide: false,
  dragoverBubble: true,
  onMove({ related }) {
    return !related.classList.contains('d-ignore')
  },
  onEnd() {
    store.updateCardsPosition()
    const payload = useCloneDeep(board.value.columns).map((column: TColumn) => ({
      id: column.id,
      cards:
        column.cards?.map((card: TCard) => ({
          id: card.id,
          position: card.position
        })) ?? []
    }))
    store.reorderCards(payload)
  }
}

const draggable = useDraggable(containerRef, cards, draggableOptions)

const columnRef = ref<HTMLElement>()

async function showMenu() {}

async function onDeleteColumn() {
  await store.deleteColumn(column.id)
}

const onDeleteCard = async (card: TCard) => {
  try {
    await store.deleteCard(card.id)
  } catch (exception: unknown) {
    console.error(exception)
  }
}
</script>

<template>
  <div ref="columnRef" class="flex h-full w-[260px] flex-col justify-start overflow-clip px-2">
    <div
      class="group grid h-[56px] grid-cols-[minmax(100px,280px),1fr] pb-2 pl-3 pt-2"
      data-handle="column"
    >
      <h2 class="leading-tighter my-auto line-clamp-2 text-title-md">
        {{ column.title }}
      </h2>
      <div class="flex justify-end">
        <!--        <Button-->
        <!--          intent="icon"-->
        <!--          size="sm"-->
        <!--          @click="onDeleteColumn"-->
        <!--          class="invisible group-hover:visible"-->
        <!--        >-->
        <!--          <Icon class="h-2 w-2" name="ic:outline-delete" />-->
        <!--        </Button>-->
        <Button intent="icon" size="sm" @click="showMenu">
          <Icon class="h-2 w-2" name="ic:outline-more-vert" />
        </Button>
      </div>
    </div>
    <div
      class="scrollbar flex h-full w-full flex-col overflow-y-auto overflow-x-clip px-1.5 [scrollbar-gutter:stable]"
    >
      <div ref="containerRef" class="flex h-full flex-col gap-2">
        <KanbanCard
          v-for="card in column.cards"
          :key="card.id"
          :card="card"
          :column-id="column.id"
          class="group flex-shrink-0"
        >
          <p class="line-clamp-3">{{ card.content }}</p>
          <template #footer>
            <Button
              intent="icon"
              size="sm"
              @click.stop.prevent="onDeleteCard(card)"
              class="d-ignore absolute bottom-0 right-0 m-2 ml-auto opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Icon class="h-2 w-2" name="ic:outline-delete" />
            </Button>
          </template>
        </KanbanCard>
      </div>
      <!--      <KanbanCardCreate :column-id="column.id" />-->
    </div>
  </div>
</template>

<style>
.sortable-card-fallback {
}

.sortable-card-chosen {
  @apply border-tertiary !opacity-100;
}

.sortable-card-ghost {
  @apply invisible rotate-0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
  }

  &::before {
    @apply visible rounded-[8px] bg-surface-container/50;
  }
}
</style>
