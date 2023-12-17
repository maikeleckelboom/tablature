import type {
  Board,
  Card,
  CardsReorderPayload,
  Column,
  ColumnsReorderPayload,
  CreateCard,
  CreateColumn
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
    if (!Array.isArray(board.value?.columns)) return
    board.value.columns.forEach((column, index) => {
      column.position = 1000 * (index + 1)
    })
  }

  const reorderColumnsCommit = async (payload: ColumnsReorderPayload) => {
    const { apiUrl } = useRuntimeConfig().public
    await $fetch(`${apiUrl}/kanban/columns/reorder`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }

  const updateCardsPosition = () => {
    if (!Array.isArray(board.value?.columns)) return
    board.value.columns.forEach((column) => {
      column.cards.forEach((card, index) => {
        card.position = 1000 * (index + 1)
      })
    })
  }

  const reorderCardsCommit = async (columns: CardsReorderPayload) => {
    const { apiUrl } = useRuntimeConfig().public
    await $fetch(`${apiUrl}/kanban/cards/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ columns })
    })
  }

  const createColumn = async (boardId: number, payload: CreateColumn) => {
    const { apiUrl } = useRuntimeConfig().public
    try {
      const column = await $fetch(`${apiUrl}/kanban/boards/${boardId}/columns`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      return <Column>column
    } catch (error) {
      console.error('"create column" has thrown:', error)
    }
  }

  const addColumn = (column: Column) => {
    if (!board.value?.columns) return
    board.value.columns.push(column)
  }

  const addCardToColumn = (columnId: number, card: Card) => {
    const column = board.value?.columns.find((column) => column.id === columnId)
    if (!column) return
    column.cards.push(card)
  }

  const createCard = async (columnId: number, payload: CreateCard) => {
    const { apiUrl } = useRuntimeConfig().public
    const card = await $fetch(`${apiUrl}/kanban/boards/columns/${columnId}/cards`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    return card as Card
  }

  const deleteCard = async (cardId: number) => {
    const { apiUrl } = useRuntimeConfig().public
    await $fetch(`${apiUrl}/kanban/boards/cards/${cardId}`, {
      method: 'DELETE'
    })
  }

  const deleteColumn = async (id: number) => {
    const { apiUrl } = useRuntimeConfig().public
    await $fetch(`${apiUrl}/kanban/boards/columns/${id}`, {
      method: 'DELETE'
    })
  }

  const removeCard = (card: Card) => {
    if (!Array.isArray(board.value?.columns)) return
    board.value.columns.forEach((column) => {
      column.cards = column.cards.filter((c) => c.id !== card.id)
    })
  }

  const removeColumn = (columnId: number) => {
    if (!Array.isArray(board.value?.columns)) return
    board.value.columns = board.value.columns.filter((column) => column.id !== columnId)
  }

  const fetchBoards = async () => {
    const { apiUrl } = useRuntimeConfig().public
    const boards = await $fetch(`${apiUrl}/kanban/boards`)
    if (!boards) return
    setBoards(boards as Board[])
    return boards as Board[]
  }

  return {
    board,
    boards,
    setBoard,
    setBoards,
    updateCardsPosition,
    updateColumnsPosition,
    reorderCardsCommit,
    reorderColumnsCommit,
    createColumn,
    createCard,
    addCardToColumn,
    addColumn,
    deleteCard,
    removeCard,
    deleteColumn,
    fetchBoards
  }
})

export default useBoardStore
