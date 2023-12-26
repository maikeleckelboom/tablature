/**
 * Abstract List Item
 */
type ListItemBase = {
  name: string
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
 * Accordion List Item
 */
type NavigationListItem = AbstractListItem<
  ListItemBase &
    (
      | { href: string; children?: never; open?: never }
      | {
          href?: never
          children: NavigationListItem[]
          open: boolean
        }
    )
>

export type { NavigationListItem }
