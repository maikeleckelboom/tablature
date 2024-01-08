type BaseProps = {
  label: string
  name?: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  shortcuts?: string[]
  disabled?: boolean
  onClick?: () => void

  divider?: boolean

  children?: BaseProps[]
  open?: boolean
  selectable?: boolean
  minSelections?: number
  multiple?: boolean
  selected?: boolean
}

type OptionProps = BaseProps & {
  selected?: boolean
}

type BaseWithOptionProps = BaseProps & {
  options?: OptionProps[]
}

type RecursiveItem = BaseWithOptionProps & {
  children: MenuItem[]
}

type MaybeRecursiveItem = BaseWithOptionProps | RecursiveItem

type RecursiveItemWithOption = BaseWithOptionProps & {
  children: MenuItem[]
  open?: boolean
}

type MaybeRecursiveItemWithOption = BaseWithOptionProps | RecursiveItemWithOption

type MenuItem = BaseProps & (MaybeRecursiveItem | MaybeRecursiveItemWithOption)

export type { MenuItem }

function isItemWithChildren(item: MenuItem): item is MenuItem & { children: MenuItem[] } {
  return item.children !== undefined && item.children.length > 0
}

function isSelectableItem(item: MenuItem): item is MenuItem & { selectable: boolean } {
  return item.selectable === true
}

export { isItemWithChildren, isSelectableItem }
