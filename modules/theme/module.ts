import { addComponentsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ThemeModuleOptions } from '~/modules/theme/types'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule<ThemeModuleOptions>({
  meta: {
    name: 'theme',
    configKey: 'theme',
    dependencies: {
      tailwindcss: '^6.9.4',
      '@material/material-color-utilities': '^0.2.7'
    }
  },
  defaults: {
    isDark: false,
    contrastLevel: 0.3,
    variant: 'content',
    sourceColor: '#0092fa',
    staticColors: []
  },
  hooks: {
    'imports:dirs'(dirs) {
      dirs.push(resolve('./runtime/composables'), resolve('./runtime/utils'))
    },
    'pages:extend'(pages) {
      pages.push({
        name: 'Theme',
        path: '/modules/theme',
        file: resolve('./runtime/pages/index.vue')
      })
      pages.push({
        name: 'Colors',
        path: '/modules/theme/colors',
        file: resolve('./runtime/pages/colors.vue')
      })
      pages.push({
        name: 'Typography',
        path: '/modules/theme/typography',
        file: resolve('./runtime/pages/typography.vue')
      })
    }
  },
  setup: async (options: ThemeModuleOptions, nuxt) => {
    nuxt.options.appConfig.theme = defu(nuxt.options.appConfig?.theme || {}, options)
    await addComponentsDir({
      pathPrefix: false,
      path: resolve('./runtime/components')
    })
    addPlugin({ src: resolve('./runtime/plugin.ts') })
  }
})
