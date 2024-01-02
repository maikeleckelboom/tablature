type MenuItemBase = {
  name: string
  label?: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  divider?: boolean
  disabled?: boolean

  children?: MenuItemBase[]
  open?: boolean
  href?: string
  fn?: (item: any) => void
}

type MenuItemWithHref = MenuItemBase & {
  href: string
  onClick?: never
  children?: never
  open?: never
}

type MenuItemWithOnClick = MenuItemBase & {
  onClick: (item: MenuItem) => void
  href?: never
  children?: never
  open?: never
}

type MenuItemWithChildren = MenuItemBase & {
  children: MenuItem[]
  open: boolean
  href?: never
  onClick?: never
}

type PlainMenuItem = MenuItemBase & {
  href?: never
  onClick?: never
  children?: never
  open?: never
}

type MenuItem = MenuItemBase

export type { MenuItem, MenuItemBase, MenuItemWithHref, MenuItemWithOnClick, MenuItemWithChildren }
