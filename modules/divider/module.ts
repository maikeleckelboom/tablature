import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'divider',
    configKey: 'divider',
    dependencies: {}
  },
  defaults: {},
  hooks: {},
  setup: async (options: ModuleOptions, nuxt) => {
    const { resolve } = createResolver(import.meta.url)

    await addComponent({
      name: 'Divider',
      filePath: resolve('./runtime/Divider.vue')
    })
  }
})
