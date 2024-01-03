import type { NavigationListItem } from '~/modules/list/types'

const useNavigationStore = defineStore('navigation-store', () => {
  const list = ref<NavigationListItem[]>([
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Modules',
      open: true,
      children: [
        {
          name: 'List',
          href: '/modules/lists'
        },
        {
          name: 'Menu',
          href: '/modules/menu'
        },
        {
          name: 'Theme',
          open: false,
          children: [
            {
              name: 'Colors',
              href: '/modules/theme/colors'
            },
            {
              name: 'Typography',
              href: '/modules/theme/typography'
            }
          ]
        }
      ]
    },
    {
      name: 'Boards',
      open: false,
      children: [
        {
          name: 'Board 1',
          href: '/boards/board-1'
        },
        {
          name: 'Board 2',
          href: '/boards/board-2'
        }
      ]
    },
    {
      name: 'Services',
      open: false,
      children: [
        {
          name: 'Web Development',
          href: '/services/web-development'
        },
        {
          name: 'Graphic Design',
          href: '/services/graphic-design'
        },
        {
          name: 'SEO',
          href: '/services/seo'
        },
        {
          name: 'Mobile App Development',
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
