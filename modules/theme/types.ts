type StaticColor = {
  name: string
  value: string
  blend?: boolean
}

interface ThemeModuleOptions {
  isDark?: boolean
  sourceColor?: string
  contrastLevel?: number
  staticColors?: StaticColor[]
}

type ColorModeOption = {
  label: string
  value: string
  selected: boolean
}

export type { StaticColor, ThemeModuleOptions, ColorModeOption }

type ButtonProps = {
  label?: string
  icon: string
  intent: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text' | 'icon'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  stretch: boolean
}

export type { ButtonProps }
