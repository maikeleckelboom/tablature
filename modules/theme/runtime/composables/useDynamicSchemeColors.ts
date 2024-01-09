/*
import { hexFromArgb } from '@material/material-color-utilities'
function normalizeFromArgb(argbColors: Record<string, number>) {
  return Object.keys(argbColors).reduce(
    (acc, key) => {
      const token = key.replace(/PaletteKeyColor/g, '')
      acc[token] = hexFromArgb(argbColors[key])
      return acc
    },
    {} as Record<string, string>
  )
}
*/

function useDynamicSchemeColors() {
  const { $dynamicScheme } = useNuxtApp()
  return computed(() => colorsFromDynamicScheme($dynamicScheme.value))
}

export { useDynamicSchemeColors }
