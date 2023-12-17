<script lang="ts" setup>
import type { Card as TCard, Column as TColumn } from '~/types'
import { useDraggable } from 'vue-draggable-plus'
import type { SortableEvent } from 'sortablejs'

const { column } = defineProps<{
  column: TColumn
}>()

const store = useBoardStore()

const { board } = storeToRefs(store)

const draggableOptions = {
  group: 'cards',
  animation: 300,
  dragClass: 'sortable-card-drag',
  ghostClass: 'sortable-card-ghost',
  chosenClass: 'sortable-card-chosen',
  fallbackClass: 'sortable-card-fallback',
  forceFallback: true,
  fallbackOnBody: true,
  removeCloneOnHide: false,
  dragoverBubble: true,
  onEnd() {
    store.updateCardsPosition()
    const payload = useCloneDeep(board.value.columns).map((column: TColumn) => ({
      id: column.id,
      cards: column.cards.map((card: TCard) => ({
        id: card.id,
        position: card.position
      }))
    }))
    store.reorderCardsCommit(payload)
  }
}

const cards = computed({
  get: () => column?.cards ?? [],
  set: (v: TCard[] | undefined) => {
    if (!v) return
    column.cards = v
  }
})

const containerRef = ref<HTMLElement>()

const draggable = useDraggable(containerRef, cards, draggableOptions)

const columnRef = ref<HTMLElement>()

function showMenu() {
  console.log('showMenu for column', column?.id)
}
</script>

<template>
  <div ref="columnRef" class="flex h-full flex-col justify-start overflow-clip px-1">
    <div
      data-handle="column"
      class="group grid h-[56px] grid-cols-[minmax(100px,280px),1fr] pb-2 pl-3 pt-2"
    >
      <h2 class="leading-tighter my-auto line-clamp-2 text-title-md">
        {{ column.title }}
      </h2>
      <div class="">
        <Button intent="icon" size="sm" @click="showMenu">
          <Icon class="h-4 w-4" name="ic:round-more-vert" />
        </Button>
      </div>
    </div>
    <div
      class="scrollbar flex h-full max-h-[calc(100svh-112px)] flex-col overflow-y-auto overflow-x-clip px-1.5 [scrollbar-gutter:stable]"
    >
      <div ref="containerRef" class="flex h-full flex-col gap-2">
        <KanbanCard
          v-for="card in column.cards"
          :key="card.id"
          :card="card"
          :column-id="column.id"
          class="flex-shrink-0"
        >
          <p class="line-clamp-3">{{ card.content }}</p>
          <template #footer>
            <Button intent="text" size="sm" @click="store.deleteCard(card.id)">
              <Icon class="h-4 w-4" name="ic:round-delete" />
            </Button>
          </template>
        </KanbanCard>
      </div>
    </div>
    <div class="h-[56px] flex-shrink-0"></div>
  </div>
</template>

<style>
.scrollbar {
  --track: rgb(var(--surface-rgb));
  --thumb: rgb(var(--surface-variant-rgb));
  --size: 4px;
  --radius: 4px;

  scrollbar-color: var(--thumb) var(--track);
  scrollbar-width: thin;

  &:hover {
    --thumb: rgb(var(--on-surface-variant-rgb));
  }

  &::-webkit-scrollbar {
    width: var(--size);
    height: var(--size);
  }

  &::-webkit-scrollbar-track {
    background: var(--track);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--thumb);
    border-radius: var(--radius);
    border: calc(var(--size) / 2) solid var(--track);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--thumb);
  }

  &::-webkit-scrollbar-corner {
    background: var(--track);
  }

  &::-webkit-scrollbar-thumb:vertical {
    border-radius: var(--radius);
  }

  &::-webkit-scrollbar-thumb:horizontal {
    border-radius: var(--radius);
  }
}

.sortable-card-fallback {
}

.sortable-card-chosen {
  @apply border-tertiary !opacity-100;
}

.sortable-card-ghost {
  @apply invisible rotate-0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  &::before {
    @apply visible rounded-[8px] bg-surface-container/50;
  }
}
</style>
