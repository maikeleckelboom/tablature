type ListItemBase = {
  name: string
}

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

type MaybeRecursiveListItem = ListItemBase & (NavigationListItemLink | NavigationListItemButton)

type NavigationListItemImpl = {}

type NavigationListItem = NavigationListItemImpl & MaybeRecursiveListItem

export type {
  NavigationListItem,
  NavigationListItemLink,
  NavigationListItemButton,
  MaybeRecursiveListItem
}
