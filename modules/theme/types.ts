import {
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeVibrant
} from '@material/material-color-utilities'

const SCHEME_VARIANTS = {
  content: SchemeContent,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant
  // fruit_salad: SchemeFruitSalad,
  // rainbow: SchemeRainbow,
} as const

type TVariant = keyof typeof SCHEME_VARIANTS

type StaticColor = {
  name: string
  value: string
  blend?: boolean
}

interface ThemeModuleOptions {
  isDark?: boolean
  sourceColor?: string
  contrastLevel?: number
  variant?: TVariant
  staticColors?: StaticColor[]
}

type ColorModeOption = {
  label: string
  value: string
  selected: boolean
}

export type { TVariant, StaticColor, ThemeModuleOptions, ColorModeOption }
export { SCHEME_VARIANTS }
