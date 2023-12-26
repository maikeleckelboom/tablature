import { addComponentsDir, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'list',
    configKey: 'list',
    dependencies: {}
  },
  defaults: {},
  hooks: {},
  setup: async (options: ModuleOptions, nuxt) => {
    const { resolve } = createResolver(import.meta.url)
    extendPages((pages) => {
      pages.push({
        name: 'List',
        path: '/lists/:id',
        file: resolve('./runtime/pages/[id].vue')
      })
      pages.push({
        name: 'Lists',
        path: '/lists',
        file: resolve('./runtime/pages/lists.vue')
      })
    })
    await addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: true
    })
  }
})
