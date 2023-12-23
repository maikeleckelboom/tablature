import type {
  Board,
  Card,
  CardsReorderUpsert,
  Column,
  ColumnsReorderUpsert,
  CardUpsert,
  ColumnUpsert
} from '~/types'

const useBoardStore = defineStore('board', () => {
  const boards = ref<Board[]>()
  const board = ref<Board>()

  const setBoard = (payload: Board) => {
    board.value = payload
  }

  const setBoards = (payload: Board[]) => {
    boards.value = payload
  }

  const updateColumnsPosition = () => {
    if (!board.value) return
    board.value?.columns.forEach((column, index) => {
      column.position = 1000 * (index + 1)
    })
  }

  const updateCardsPosition = () => {
    if (!board.value) return
    board.value?.columns.forEach((column) => {
      if (!column?.cards) return
      column.cards.forEach((card, index) => {
        card.position = 1000 * (index + 1)
      })
    })
  }

  const addColumn = (column: Column) => {
    board.value.columns = board.value.columns || []
    board.value.columns.push(column)
  }

  const addCard = (columnId: number, card: Card) => {
    const column = board.value?.columns.find((column) => column.id === columnId)
    column.cards = column.cards || []

    column.cards.push(card)
  }

  const removeColumn = (id: number) => {
    if (!board.value) return
    board.value.columns = board.value?.columns.filter((column) => column.id !== id) || []
  }

  const removeCard = (id: number) => {
    if (!board.value) return
    board.value?.columns.forEach((column) => {
      column.cards = column?.cards.filter((c) => c.id !== id) || []
    })
  }

  const reorderColumns = async (payload: ColumnsReorderUpsert) => {
    const runtimeConfig = useRuntimeConfig()
    await $fetch(`${runtimeConfig.public.apiUrl}/kanban/columns/reorder`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }

  const reorderCards = async (columns: CardsReorderUpsert) => {
    const runtimeConfig = useRuntimeConfig()
    await $fetch(`${runtimeConfig.public.apiUrl}/kanban/cards/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ columns })
    })
  }

  const createColumn = async (payload: ColumnUpsert) => {
    try {
      const runtimeConfig = useRuntimeConfig()
      const column = await $fetch<Column>(
        `${runtimeConfig.public.apiUrl}/kanban/${payload.board_id}/columns`,
        {
          method: 'POST',
          body: JSON.stringify(payload)
        }
      )
      addColumn(column)
      return column
    } catch (exception) {
      console.error('"create column" has thrown exception:', exception)
    }
  }
  const createCard = async (payload: CardUpsert) => {
    const runtimeConfig = useRuntimeConfig()
    return await $fetch<Card>(`${runtimeConfig.public.apiUrl}/kanban/${payload.column_id}/cards`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }

  const deleteCard = async (id: number) => {
    try {
      const runtimeConfig = useRuntimeConfig()
      await $fetch(`${runtimeConfig.public.apiUrl}/kanban/cards/${id}`, {
        method: 'DELETE'
      })
      removeCard(id)
    } catch (exception) {
      console.error('"delete card" has thrown exception:', exception)
    }
  }

  const deleteColumn = async (id: number) => {
    try {
      const runtimeConfig = useRuntimeConfig()
      await $fetch(`${runtimeConfig.public.apiUrl}/kanban/columns/${id}`, {
        method: 'DELETE'
      })
      removeColumn(id)
    } catch (exception) {
      console.error('"delete column" has thrown exception:', exception)
    }
  }

  return {
    board,
    boards,
    setBoard,
    setBoards,
    updateCardsPosition,
    updateColumnsPosition,
    reorderCards,
    reorderColumns,
    createColumn,
    createCard,
    addColumn,
    deleteCard,
    removeCard,
    deleteColumn
  }
})

export default useBoardStore
