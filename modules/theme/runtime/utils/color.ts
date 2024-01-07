import {
  argbFromHex,
  DynamicColor,
  Hct,
  MaterialDynamicColors,
  rgbaFromArgb,
  SchemeContent
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

function makeSchemeContents(
  sourceColor: Hct | string | number,
  isDark: boolean,
  contrastLevel: number,
  options?: {
    brightnessSuffix?: boolean
  }
) {
  const { brightnessSuffix = false } = options ?? {}
  const sourceColorHct = getColorAsHct(sourceColor)
  const schemes = new Map<'system' | 'light' | 'dark', SchemeContent>()
  schemes.set('system', new SchemeContent(sourceColorHct, isDark, contrastLevel))
  if (brightnessSuffix) {
    schemes.set('light', new SchemeContent(sourceColorHct, false, contrastLevel))
    schemes.set('dark', new SchemeContent(sourceColorHct, true, contrastLevel))
  }
  return schemes
}

function colorsFromSchemeContent(
  schemeContent: Map<'system' | 'light' | 'dark', SchemeContent> | SchemeContent,
  suffix?: string
): Record<string, number> {
  if (schemeContent instanceof Map) {
    return Array.from(schemeContent.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        ...colorsFromSchemeContent(value, key !== 'system' ? `${capitalize(key)}` : '')
      }),
      {}
    )
  }
  const schemeContentColors: Record<string, number> = {}
  for (const colorName of Object.getOwnPropertyNames(MaterialDynamicColors)) {
    const color = MaterialDynamicColors[colorName as keyof typeof MaterialDynamicColors]
    if (color instanceof DynamicColor) {
      const colorKey = suffix ? `${colorName}${suffix && suffix}` : colorName
      schemeContentColors[colorKey] = color.getArgb(schemeContent)
    }
  }
  return schemeContentColors
}

function propertiesFromContentColors(
  schemesContentsColors: Record<string, number>,
  options: {} = {}
) {
  return Object.keys(schemesContentsColors).reduce(
    (acc, key) => {
      const { r, g, b } = rgbaFromArgb(schemesContentsColors[key])
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
  makeSchemeContents,
  colorsFromSchemeContent,
  textFromProperties,
  propertiesFromContentColors,
  repeatingLinearGradient
}
