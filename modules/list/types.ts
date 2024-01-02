import type { MenuItem } from '~/modules/menu/types'

/**
 * List Item
 */
type ListItemBase = {
  name: string
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

type MaybeRecursiveListItem = ListItemBase & (NavigationListItemLink | NavigationListItemButton)

type NavigationListItemImpl = {}

type NavigationListItem = NavigationListItemImpl & MaybeRecursiveListItem

export type {
  NavigationListItem,
  NavigationListItemLink,
  NavigationListItemButton,
  MaybeRecursiveListItem
}

type NavigationCollapsible = (
  | {
      open?: never
      children?: MenuItem[]
    }
  | {
      open: boolean
      children: MenuItem[]
    }
) &
  (
    | {
        href: string
      }
    | {
        href?: never
      }
  )

export type { NavigationCollapsible }

// Try 2:
type ItemWithChildren = {
  children: NavigationListItem[]
  open: boolean
}

type ItemWithoutChildren = {
  children?: never
  open?: never
}

type MaybeItemWithChildren = ItemWithChildren | ItemWithoutChildren

export type { ItemWithChildren, ItemWithoutChildren, MaybeItemWithChildren }
