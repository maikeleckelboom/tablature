export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    viewTransition: true
  },
  css: ['~/assets/css/vue-json-pretty.css'],
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },
  typescript: {
    typeCheck: true,
    strict: false
  },
  runtimeConfig: {
    public: {
      apiUrl: 'http://127.0.0.1:8000/api/v1'
    }
  },
  tailwindcss: {
    viewer: false,
    configPath: '~/tailwind.config',
    exposeConfig: true
  },
  vueuse: {
    autoImports: true
  },
  appConfig: {
    theme: {
      isDark: false,
      contrastLevel: 0.4,
      sourceColor: '#00fa7d'
    },
    nuxtIcon: {
      size: '24px'
    }
  },
  viewport: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },
    defaultBreakpoints: {
      mobile: 'sm',
      tablet: 'md',
      desktop: 'lg'
    },
    fallbackBreakpoint: 'lg'
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  imports: {
    dirs: [
      '~/utils',
      '~/stores/useKanbanStore',
      '~/stores/useNavigationStore',
      '~/stores/useListStore',
      '~/stores/useDocumentStore'
    ],
    presets: []
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-viewport',
    'nuxt-typed-router',
    'nuxt-lodash',
    'floating-vue/nuxt',
    '~/modules/theme/module.ts',
    '~/modules/dialog/module.ts',
    '~/modules/breadcrumbs/module.ts',
    '~/modules/menu/module.ts',
    '~/modules/list/module.ts',
    '~/modules/text-editor/module.ts'
  ]
})
