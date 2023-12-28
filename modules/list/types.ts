/**
 * List Item
 */
type ListItemBase = {
  name: string
}

type ListItemWithChildren<T extends ListItemBase = ListItemBase> = T & {
  children: MaybeListItemWithChildren<T>[]
  open?: boolean
}

type ListItemWithoutChildren<T extends ListItemBase = ListItemBase> = T & {
  children?: never
  open?: never
}

type MaybeListItemWithChildren<T extends ListItemBase = ListItemBase> =
  | ListItemWithChildren<T>
  | ListItemWithoutChildren<T>

export type {
  ListItemBase,
  MaybeListItemWithChildren,
  ListItemWithChildren,
  ListItemWithoutChildren
}

/**
 * Navigation List Item (extends Abstract List Item)
 * can be either a link or a button with children
 */
type NavigationListItemLink = {
  href: string
  children?: never
  open?: never
}

type NavigationListItemButton = {
  href?: never
  children: NavigationListItem[]
  open: boolean
}

type NavigationListItem = MaybeListItemWithChildren<
  ListItemBase & (NavigationListItemLink | NavigationListItemButton)
>

export type { NavigationListItem, NavigationListItemLink }
