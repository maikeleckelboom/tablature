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
          open: false,
          children: [
            {
              name: 'Nested List Item 1.1',
              open: false,
              children: [
                {
                  name: 'Nested List Item 1.1.1',
                  open: false,
                  children: [
                    {
                      name: 'Nested List Item 1.1.1.1',
                      href: '/lists/nested-list-item-1-1-1-1'
                    },
                    {
                      name: 'Nested List Item 1.1.1.2',
                      href: '/lists/nested-list-item-1-1-1-2'
                    },
                    {
                      name: 'Nested List Item 1.1.1.3',
                      href: '/lists/nested-list-item-1-1-1-3'
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
          href: '/lists/list-1'
        },
        {
          name: 'List 2',
          href: '/lists/list-2'
        },
        {
          name: 'List 3',
          href: '/lists/list-3'
        },
        {
          name: 'All',
          href: '/lists'
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
      name: 'Portfolio',
      open: false,
      children: [
        {
          name: 'Projects 1',
          href: '/portfolio/project-1'
        },
        {
          name: 'Projects 2',
          href: '/portfolio/project-2'
        },
        {
          name: 'Projects 3',
          href: '/portfolio/project-3'
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
    },

    {
      name: 'Blog',
      href: '/blog'
    },
    {
      name: 'Contact Us',
      href: '/contact'
    },
    {
      name: 'Testimonials',
      href: '/testimonials'
    }
  ]

  return {
    navigationList
  }
})

export default useListStore
