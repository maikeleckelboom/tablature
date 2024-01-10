import {
  argbFromHex,
  DynamicColor,
  DynamicScheme,
  Hct,
  MaterialDynamicColors,
  rgbaFromArgb,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeVibrant
} from '@material/material-color-utilities'
import { capitalize } from 'vue'

function getColorAsHct(color: Hct | string | number): Hct {
  if (typeof color === 'number') {
    return Hct.fromInt(color)
  } else if (typeof color === 'string') {
    return Hct.fromInt(argbFromHex(color))
  }
  return color
}

const schemeVariantsMap = {
  content: SchemeContent,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  vibrant: SchemeVibrant
  // fruit_salad: SchemeFruitSalad,
  // rainbow: SchemeRainbow,
} as const

const schemeVariants = Object.keys(schemeVariantsMap) as (keyof typeof schemeVariantsMap)[]

function makeDynamicScheme(
  sourceColor: Hct | string | number,
  isDark: boolean,
  contrastLevel: number,
  variant: string,
  options?: {
    brightnessSuffix?: boolean
  }
) {
  const { brightnessSuffix = false } = options ?? {}
  const Scheme = schemeVariantsMap[variant]
  if (!Scheme) {
    throw new Error(`Invalid scheme variant ${variant}`)
  }
  const sourceColorHct = getColorAsHct(sourceColor)
  const schemes = new Map<'system' | 'light' | 'dark', DynamicScheme>()
  schemes.set('system', new Scheme(sourceColorHct, isDark, contrastLevel))
  if (brightnessSuffix) {
    schemes.set('light', new Scheme(sourceColorHct, false, contrastLevel))
    schemes.set('dark', new Scheme(sourceColorHct, true, contrastLevel))
  }
  return schemes
}

function colorsFromDynamicScheme(
  dynamicScheme: Map<'system' | 'light' | 'dark', DynamicScheme> | DynamicScheme,
  suffix?: string
): Record<string, number> {
  if (dynamicScheme instanceof Map) {
    return Array.from(dynamicScheme.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...colorsFromDynamicScheme(value, key !== 'system' ? `${capitalize(key)}` : '')
      }),
      {}
    )
  }
  const schemeContentColors: Record<string, number> = {}
  for (const colorName of Object.getOwnPropertyNames(MaterialDynamicColors)) {
    const color = MaterialDynamicColors[colorName as keyof typeof MaterialDynamicColors]
    if (color instanceof DynamicColor) {
      const colorKey = suffix ? `${colorName}${suffix && suffix}` : colorName
      schemeContentColors[colorKey] = color.getArgb(dynamicScheme)
    }
  }
  return schemeContentColors
}

function propertiesFromColors(schemeColors: Record<string, number>, options: {} = {}) {
  return Object.keys(schemeColors).reduce(
    (acc, key) => {
      const { r, g, b } = rgbaFromArgb(schemeColors[key])
      const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
      const normalizedKey = kebabKey.replace(/-palette-[a-z]+-color/, '')
      acc[`--${normalizedKey}-rgb`] = `${r} ${g} ${b}`
      return acc
    },
    {} as Record<string, string>
  )
}

function textFromProperties(
  properties: Record<string, string>[] | Record<string, string>,
  options?: {
    lineBreak?: boolean
  }
): string {
  if (Array.isArray(properties)) {
    return properties.map((property) => textFromProperties(property)).join('')
  }
  return Object.entries(properties)
    .map(([name, value]) => {
      return `${name}: ${value};`
    })
    .join(options?.lineBreak ? '\n' : '')
}

const repeatingLinearGradient = (() => {
  const { primary, secondary, tertiary } = {
    primary: 'rgb(var(--primary-rgb))',
    secondary: 'rgb(var(--secondary-rgb))',
    tertiary: 'rgb(var(--tertiary-rgb))'
  }
  return `repeating-linear-gradient(to right,${primary} 0%,${secondary} 50%,${tertiary} 100%)`
})()

export {
  getColorAsHct,
  makeDynamicScheme,
  colorsFromDynamicScheme,
  propertiesFromColors,
  textFromProperties,
  repeatingLinearGradient,
  schemeVariants
}
