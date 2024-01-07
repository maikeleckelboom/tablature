type BaseProps = {
  label: string
  leadingIcon?: string
  trailingIcon?: string
  trailingText?: string
  shortcuts?: string
  disabled?: boolean
  divider?: boolean
  onClick?: () => void
  onSelect?: () => void
  children?: any[]
  open?: boolean
  selectable?: boolean
  allowNoSelection?: boolean
  // replace allowNoSelection with minSelections (also change store)
  // minSelections?: number

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

function isRecursiveItem(item: MenuItem): item is MenuItem & { children: MenuItem[] } {
  return item.children !== undefined && item.children.length > 0
}

export { isRecursiveItem }
