import type { MaybeRecursiveListItem, NavigationListItem } from '~/modules/list/types'

const useListStore = defineStore('lists', () => {
  const navigationList: NavigationListItem[] = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'About',
      href: '/about'
    },
    {
      name: 'Modules',
      open: false,
      children: [
        {
          name: 'List',
          href: '/modules/lists'
        },
        {
          name: 'Context Menu',
          href: '/modules/context-menu'
        }
      ]
    },
    {
      name: 'Deeply Nested List',
      open: false,
      children: [
        {
          name: 'Nested List Item 1',
          open: true,
          children: [
            {
              name: 'Nested List Item 1.1',
              open: true,
              children: [
                {
                  name: 'Nested List Item 1.1.1',
                  open: true,
                  children: [
                    {
                      name: 'Nested List Item 1.1.1.1',
                      href: '/modules/lists/nested-list-item-1-1-1-1'
                    },
                    {
                      name: 'Nested List Item 1.1.1.2',
                      href: '/modules/lists/nested-list-item-1-1-1-2'
                    },
                    {
                      name: 'Nested List Item 1.1.1.3',
                      href: '/modules/lists/nested-list-item-1-1-1-3'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'Lists',
      open: false,
      children: [
        {
          name: 'List 1',
          href: '/modules/lists/list-1'
        },
        {
          name: 'List 2',
          href: '/modules/lists/list-2'
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
    },
    {
      name: 'Boards',
      open: false,
      children: [
        {
          name: 'Board 1',
          href: '/boards/1'
        },
        {
          name: 'Board 2',
          href: '/boards/2'
        },
        {
          name: 'Board 3',
          href: '/boards/3'
        },
        {
          name: 'All',
          href: '/boards'
        }
      ]
    }
  ]

  return {
    navigationList
  }
})

export default useListStore
