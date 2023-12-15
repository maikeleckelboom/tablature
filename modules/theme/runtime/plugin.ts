import {
  colorsFromSchemeContent,
  makeSchemeContents,
  propertiesFromContentColors
} from '~/modules/theme/runtime/utils/color'

export default defineNuxtPlugin((nuxt) => {
  const { sourceColor, isDark, contrastLevel } = useThemeConfig()

  const schemeContents = computed(() =>
    makeSchemeContents(sourceColor.value, isDark.value, contrastLevel.value, {
      brightnessSuffix: true
    })
  )

  const contentColors = computed(() => {
    if (!schemeContents.value) return
    return colorsFromSchemeContent(schemeContents.value)
  })

  const contentColorProperties = computed(() => {
    if (!contentColors.value) return
    return propertiesFromContentColors(contentColors.value)
  })

  const schemeContent = computed(() => {
    if (!schemeContents.value) return
    return schemeContents.value.get(isDark.value ? 'dark' : 'light')
  })

  const schemeContentText = computed(() =>
    textFromProperties(contentColorProperties.value, { lineBreak: false })
  )

  useHead({
    htmlAttrs: {
      class: computed(() => (isDark.value ? 'dark' : 'light'))
    },
    style: [
      {
        textContent: computed(() => `:root { ${schemeContentText.value} }`)
      }
    ]
  })

  nuxt.provide('schemeContent', schemeContent)
})
