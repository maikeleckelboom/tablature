import { addComponentsDir, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'text-editor',
    configKey: 'text-editor',
    dependencies: {}
  },
  defaults: {},
  hooks: {},
  setup: async (options: ModuleOptions, nuxt) => {
    const { resolve } = createResolver(import.meta.url)
    extendPages((pages) => {
      pages.push({
        name: 'text-editor',
        path: '/modules/text-editor',
        file: resolve('./runtime/pages/text-editor.vue')
      })
    })
    await addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: true
    })
  }
})
