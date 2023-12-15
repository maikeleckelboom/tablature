import { addComponentsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ThemeModuleOptions } from '~/modules/theme/types'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule<ThemeModuleOptions>({
  meta: {
    name: 'theme',
    configKey: 'theme',
    dependencies: {
      '@material/material-color-utilities': '^0.2.7',
      '@tailwindcss/container-queries': '^0.1.1',
      tailwindcss: '^6.9.4'
    }
  },
  defaults: {
    isDark: false,
    contrastLevel: 0.3,
    sourceColor: '#47814a',
    staticColors: []
  },
  hooks: {
    'imports:dirs'(dirs) {
      dirs.push(resolve('./runtime/composables'), resolve('./runtime/utils'))
    },
    'pages:extend'(pages) {
      pages.push(
        {
          name: 'schemes',
          path: '/_app/scheme',
          file: resolve('./runtime/pages/schemes.vue')
        },
        {
          name: 'quantize',
          path: '/_app/quantize',
          file: resolve('./runtime/pages/quantize.vue')
        }
      )
    }
  },
  setup: async (options: ThemeModuleOptions, nuxt) => {
    nuxt.options.appConfig.theme = defu(nuxt.options.appConfig?.theme || {}, options)
    // nuxt.options.css.push(resolve('./runtime/css/motion.css'))
    await addComponentsDir({
      pathPrefix: false,
      path: resolve('./runtime/components')
    })
    addPlugin({ src: resolve('./runtime/plugin.ts') })
  }
})
