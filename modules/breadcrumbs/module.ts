import { addComponent, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

interface ModuleOptions {}

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'breadcrumbs',
    configKey: 'breadcrumbs'
  },
  defaults: {},
  async setup(options: ModuleOptions, nuxt) {
    await addComponent({
      name: 'Breadcrumbs',
      filePath: resolve('./runtime/Breadcrumbs.vue')
    })
    addImportsDir(resolve('./runtime/composables'))
  }
})
