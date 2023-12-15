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

export type { StaticColor, ThemeModuleOptions }

type ButtonProps = {
  label?: string
  icon: string
  intent: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text' | 'icon'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  stretch: boolean
}

export type { ButtonProps }
