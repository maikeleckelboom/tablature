type BaseListItem = {
  label: string
}

interface BaseProps extends BaseListItem {
  name?: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  shortcuts?: string[]
  disabled?: boolean
  onClick?: () => void

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

type ExcludeKeys = 'selection' | 'leading-icon' | 'trailing-icon' | 'trailing-text' | 'shortcuts'

export type { MenuItem, ExcludeKeys, BaseListItem }

function hasChildren(item: MenuItem): item is MenuItem & { children: MenuItem[] } {
  return item.children !== undefined && item.children.length > 0
}

function isSelectable(item: MenuItem): item is MenuItem & { selectable: boolean } {
  return item.selectable === true
}

export { isSelectable, hasChildren }
