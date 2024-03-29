import {
  colorsFromDynamicScheme,
  makeDynamicScheme,
  propertiesFromColors
} from '~/modules/theme/runtime/utils/color'
import type { TVariant } from '~/modules/theme/types'

export default defineNuxtPlugin((nuxt) => {
  const { sourceColor, isDark, contrastLevel, variant } = useThemeConfig()

  const dynamicSchemes = computed(() =>
    makeDynamicScheme(
      sourceColor.value,
      isDark.value,
      contrastLevel.value,
      <TVariant>variant.value,
      {
        brightnessSuffix: true
      }
    )
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
    return propertiesFromColors(dynamicSchemesColors.value)
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
        textContent: computed(() => `:root {\n${schemeColorsText.value}\n}`)
      }
    ]
  })

  nuxt.provide('dynamicSchemes', dynamicSchemes)
  nuxt.provide('dynamicScheme', dynamicScheme)
})
