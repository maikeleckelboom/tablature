import { addComponentsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'dialog',
    configKey: 'dialog',
    dependencies: {}
  },
  defaults: {},
  hooks: {
    'pages:extend': (pages) => {
      pages.push({
        name: 'playground',
        path: '/app/dialog',
        file: resolve('./runtime/pages/playground.vue')
      })
    }
  },
  setup: async (options: ModuleOptions, nuxt) => {
    addPlugin({ src: resolve('./runtime/plugin') })
    await addComponentsDir({
      pathPrefix: false,
      path: resolve('./runtime/components')
    })
  }
})
