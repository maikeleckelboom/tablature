import { addComponentsDir, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '',
    configKey: '',
    dependencies: {}
  },
  defaults: {},
  hooks: {},
  setup: async (options: ModuleOptions, nuxt) => {
    const { resolve } = createResolver(import.meta.url)
    extendPages((pages) => {
      // pages.push({
      //   name: '',
      //   path: '/modules/',
      //   file: resolve('./runtime/pages/Component.vue')
      // })
    })
    await addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: true
    })
  }
})
