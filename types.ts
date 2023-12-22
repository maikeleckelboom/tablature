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

type ColumnsReorderRequest = {
  id: number
  columns: Pick<Column, 'id' | 'position'>[]
}

type CardsReorderRequest = {
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
  ColumnsReorderRequest,
  CardsReorderRequest,
  CreateCard,
  CreateColumn
}

type MenuItemBase = {
  name: string
  label?: string
  icon?: string
  iconPosition?: 'before' | 'after'
}

type MenuItemWithChildren = MenuItemBase & {
  open: boolean
  children: MenuItemBase[]
}

type MenuItemLink = MenuItemBase & {
  href: string
}

type MenuItem = MenuItemBase | MenuItemWithChildren | MenuItemLink

type HoverState = {
  isHovered: boolean
}

type ActiveState = {
  isActive: boolean
}

export type { MenuItem, MenuItemWithChildren, MenuItemLink }
