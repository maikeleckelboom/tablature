import type { NavigationListItem } from '~/modules/list/types'

const useNavigationStore = defineStore('navigation-store', () => {
  const list = ref<NavigationListItem[]>([
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Modules',
      open: true,
      children: [
        {
          label: 'List',
          href: '/modules/lists'
        },
        {
          label: 'Menu',
          href: '/modules/menu'
        },
        {
          label: 'Floating',
          href: '/floating'
        },
        {
          label: 'Theme',
          open: false,
          children: [
            {
              label: 'Colors',
              href: '/modules/theme/colors'
            },
            {
              label: 'Typography',
              href: '/modules/theme/typography'
            }
          ]
        }
      ]
    },
    {
      label: 'Boards',
      open: false,
      children: [
        {
          label: 'Board 1',
          href: '/boards/board-1'
        },
        {
          label: 'Board 2',
          href: '/boards/board-2'
        }
      ]
    },
    {
      label: 'Services',
      open: false,
      children: [
        {
          label: 'Web Development',
          href: '/services/web-development'
        },
        {
          label: 'Graphic Design',
          href: '/services/graphic-design'
        },
        {
          label: 'SEO',
          href: '/services/seo'
        },
        {
          label: 'Mobile App Development',
          href: '/services/mobile-app-development'
        }
      ]
    }
  ])

  return {
    list
  }
})

export default useNavigationStore
