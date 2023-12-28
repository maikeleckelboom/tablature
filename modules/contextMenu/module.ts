import { addComponentsDir, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'contextMenu',
    configKey: 'contextMenu',
    dependencies: {}
  },
  defaults: {},
  hooks: {},
  setup: async (options: ModuleOptions, nuxt) => {
    const { resolve } = createResolver(import.meta.url)
    extendPages((pages) => {
      pages.push({
        name: 'contextMenu',
        path: '/context-menu',
        file: resolve('./runtime/pages/context-menu.vue')
      })
    })
    await addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: true
    })
  }
})
