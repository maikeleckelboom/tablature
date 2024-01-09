import {
  colorsFromDynamicScheme,
  makeDynamicScheme,
  propertiesFromSchemeColors
} from '~/modules/theme/runtime/utils/color'

export default defineNuxtPlugin((nuxt) => {
  const { sourceColor, isDark, contrastLevel, schemeVariant } = useThemeConfig()

  const dynamicSchemes = computed(() =>
    makeDynamicScheme(sourceColor.value, isDark.value, contrastLevel.value, schemeVariant.value, {
      brightnessSuffix: true
    })
  )

  const dynamicScheme = computed(() => {
    if (!dynamicSchemes.value) return
    return dynamicSchemes.value.get(isDark.value ? 'dark' : 'light')
  })

  const dynamicSchemesColors = computed(() => {
    if (!dynamicSchemes.value) return
    return colorsFromDynamicScheme(dynamicSchemes.value)
  })

  const schemeColorProperties = computed(() => {
    if (!dynamicSchemes.value) return
    return propertiesFromSchemeColors(dynamicSchemesColors.value)
  })

  const schemeColorsText = computed(() =>
    schemeColorProperties.value
      ? textFromProperties(schemeColorProperties.value, { lineBreak: false })
      : ''
  )

  useHead({
    htmlAttrs: {
      class: computed(() => (isDark.value ? 'dark' : 'light'))
    },
    style: [
      {
        textContent: computed(() => `:root { ${schemeColorsText.value} }`)
      }
    ]
  })

  nuxt.provide('dynamicScheme', dynamicScheme)
})
