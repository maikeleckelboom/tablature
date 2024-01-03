type BaseMenuItem = {
  label?: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  divider?: boolean
  disabled?: boolean
  shortcut?: string
  onAction?: (args?: any) => void
  checked?: boolean
} & (
  | {
      selectable?: false
      multiple?: never
    }
  | {
      selectable: true
      multiple?: boolean
      children: MenuItem[]
      open?: boolean
    }
) &
  (
    | {
        children?: never
        open?: never
      }
    | {
        children: MenuItem[]
        open?: boolean
      }
  )

type ParentMenuItem<T = any> = BaseMenuItem & {
  children: T[]
}

type SelectableMenuItem<T = any> = ParentMenuItem<T> & {
  selectable: boolean
}

type MenuItem = BaseMenuItem | ParentMenuItem | SelectableMenuItem

export type { MenuItem }

function isParentMenuItem(item: MenuItem): item is ParentMenuItem<MenuItem> {
  return (item as ParentMenuItem<MenuItem>)?.children !== undefined
}

function isSelectableMenuItem(item: MenuItem): item is SelectableMenuItem<MenuItem> {
  return (item as SelectableMenuItem<MenuItem>)?.selectable !== undefined && isParentMenuItem(item)
}

export { isSelectableMenuItem, isParentMenuItem }
