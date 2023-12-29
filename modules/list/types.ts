/**
 * List Item
 */
type ListItemBase = {
  name: string
}

type RecursiveListItem<T extends ListItemBase = ListItemBase> = T & {
  children: MaybeRecursiveListItem<T>[]
  open?: boolean
}

type NonRecursiveListItem<T extends ListItemBase = ListItemBase> = T & {
  children?: never
  open?: never
}

type MaybeRecursiveListItem<T extends ListItemBase = ListItemBase> =
  | RecursiveListItem<T>
  | NonRecursiveListItem<T>

export type { ListItemBase, MaybeRecursiveListItem }

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

type NavigationListItem = MaybeRecursiveListItem<
  ListItemBase & (NavigationListItemLink | NavigationListItemButton)
>

export type { NavigationListItem, NavigationListItemLink }
