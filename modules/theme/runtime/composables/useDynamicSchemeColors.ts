/**
 function keyOmitPaletteKeyColor(argbColors: Record<string, number>) {
 return Object.keys(argbColors).reduce(
 (acc, key) => {
 const token = key.replace(/PaletteKeyColor/g, '')
 acc[token] = argbColors[key]
 return acc
 },
 {} as Record<string, number>
 )
 }
 */

function useDynamicSchemeColors() {
  const { $dynamicScheme } = useNuxtApp()
  return computed(() => colorsFromDynamicScheme($dynamicScheme.value))
}

export { useDynamicSchemeColors }
