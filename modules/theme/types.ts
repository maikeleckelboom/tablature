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
