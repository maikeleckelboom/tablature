type Timestamps = {
  created_at: string
  updated_at: string
}

type SavedFlag = {
  saved: boolean
}

type Board = {
  id: number
  user_id: number
  title: string
  columns: Column[]
} & Partial<Timestamps>

type Column = {
  id: number
  board_id: number
  title: string
  cards: Card[]
  position: number
} & Partial<Timestamps>

type Card = {
  id: number
  column_id: number
  position: number
  content: string
} & Partial<Timestamps>

type ColumnsReorderPayload = {
  id: number
  columns: Pick<Column, 'id' | 'position'>[]
}

type CardsReorderPayload = {
  id: number
  cards: Pick<Card, 'id' | 'position'>[]
}[]

type CreateCard = {
  content: string
  column_id: number
}

type CreateColumn = {
  title: string
  board_id: number
}

export type {
  Board,
  Column,
  Card,
  ColumnsReorderPayload,
  CardsReorderPayload,
  CreateCard,
  CreateColumn
}
