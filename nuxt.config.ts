// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
    "~/modules/theme/module.ts",
    "@nuxtjs/stylelint-module",
  ],
  tailwindcss: {
    viewer: true,
    configPath: '~/tailwind.config',
    exposeConfig: true
  },
  // image: {
  //   provider: 'sirv',
  //   sirv: {
  //     baseURL: 'https://exclave.sirv.com'
  //   }
  // },
  // viewport: {
  //   breakpoints: {
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     '2xl': 1536
  //   },
  //   defaultBreakpoints: {
  //     mobile: 'sm',
  //     tablet: 'md',
  //     desktop: 'lg'
  //   },
  //   fallbackBreakpoint: 'lg'
  // },
  stylelint: {
    lintOnStart: false,
    fix: true
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

})
