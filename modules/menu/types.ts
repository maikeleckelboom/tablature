type MenuItemBase = {
  name: string
  label?: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  divider?: boolean
}

type MenuItem = MenuItemBase &
  (
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

export type { MenuItem, MenuItemBase }
