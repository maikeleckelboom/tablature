type MenuItemBase = {
  label?: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  divider?: boolean
  disabled?: boolean
}

type MenuItemWithHref = MenuItemBase & {
  href: string
  onClick?: never
  children?: never
  open?: never
}

type MenuItemWithOnClick = MenuItemBase & {
  onClick: (item: any) => void
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
type MenuItem = { name: string } & (
  | MenuItemWithHref
  | MenuItemWithOnClick
  | MenuItemWithChildren
  | (MenuItemBase & { href?: never; onClick?: never; children?: never; open?: never })
)

export type { MenuItem }
