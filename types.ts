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

type IconContext = {
  prefixIcon: string
  suffixIcon: string
  suffixText: string
}
type Name = {
  name: string
}

type Title = {
  title: string
}

type MaybeTitle = Partial<Title>

type NameAndMaybeTitle = Name & MaybeTitle

type IconProps = {
  prefixIcon: string
  suffixIcon: string
  suffixText: string
}

type ListItemBaseProps = NameAndMaybeTitle & Partial<IconProps>

type ListItemLink = ListItemBaseProps & {
  href: string
}

type ListItemType = ListItemBaseProps | ListItemLink

type ListItemWithChildren = ListItemType & {
  open: boolean
  children: (ListItemType | ListItemWithChildren)[]
}

type ListItem = ListItemBaseProps | ListItemWithChildren | ListItemLink

export type { ListItem, ListItemWithChildren, ListItemLink }
