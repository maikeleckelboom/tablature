/**
 * Abstract List Item
 */
type ListItemBase = {
  name: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
}

type RecursiveListItem<T extends ListItemBase = ListItemBase> = T & {
  children: AbstractListItem<T>[]
  open?: boolean
}

type NonRecursiveListItem<T extends ListItemBase = ListItemBase> = T & {
  children?: never
  open?: never
}

type AbstractListItem<T extends ListItemBase = ListItemBase> =
  | NonRecursiveListItem<T>
  | RecursiveListItem<T>

export type { AbstractListItem, ListItemBase, RecursiveListItem, NonRecursiveListItem }

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

type NavigationListItem = AbstractListItem<
  ListItemBase & (NavigationListItemLink | NavigationListItemButton)
>

export type { NavigationListItem, NavigationListItemLink, NavigationListItemButton }
