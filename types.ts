type Timestamps = {
  created_at: string
  updated_at: string
}

type Board = {
  id: number
  user_id: number
  title: string
  columns: Column[]
} & Partial<Timestamps>

type BoardUpsert = {
  id?: number
  title: string
}

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

type ColumnsReorderUpsert = {
  id: number
  columns: Pick<Column, 'id' | 'position'>[]
}

type CardsReorderUpsert = {
  id: number
  cards: Pick<Card, 'id' | 'position'>[]
}[]

type CardUpsert = {
  content: string
  column_id: number
}

type ColumnUpsert = {
  title: string
  board_id: number
}

export type {
  Board,
  Column,
  Card,
  BoardUpsert,
  CardUpsert,
  ColumnUpsert,
  ColumnsReorderUpsert,
  CardsReorderUpsert
}

export type AccordionItem = {
  value: string
  title?: string
  content?: string
  children?: AccordionItem[]
  expanded?: boolean
}
