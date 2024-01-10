function useDynamicSchemeColors(
  options: {
    brightnessSuffix?: boolean
  } = {}
) {
  const { brightnessSuffix = false } = options ?? {}
  const { $dynamicScheme, $dynamicSchemes } = useNuxtApp()
  return computed(() =>
    colorsFromDynamicScheme(brightnessSuffix ? $dynamicSchemes.value : $dynamicScheme.value)
  )
}

export { useDynamicSchemeColors }
