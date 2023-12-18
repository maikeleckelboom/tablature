// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    viewTransition: true,
    typedPages: true,
    reactivityTransform: true
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
    viewer: true,
    configPath: '~/tailwind.config',
    exposeConfig: true
  },
  vueuse: {
    autoImports: true
  },
  image: {
    provider: 'sirv',
    sirv: {
      baseURL: 'https://exclave.sirv.com'
    }
  },
  appConfig: {
    theme: {
      isDark: true,
      contrastLevel: 0.3,
      sourceColor: '#047fcc'
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
  // stylelint: {
  //   lintOnStart: false,
  //   fix: true
  // },
  imports: {
    dirs: ['~/components', '~/components/Kanban', '~/utils']
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-viewport',
    'nuxt-lodash',
    '~/modules/theme/module.ts',
    '~/modules/dialog/module.ts'
  ]
})
