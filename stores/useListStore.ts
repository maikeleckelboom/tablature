import type { AbstractListItem, NavigationListItem } from '~/modules/list/types'

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
                      name: 'Nested List Item',
                      href: '/nested-list-item'
                    },
                    {
                      name: 'Nested List Item',
                      href: '/nested-list-item'
                    },
                    {
                      name: 'Nested List Item',
                      href: '/nested-list-item'
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

  const abstractList: AbstractListItem[] = [
    {
      name: 'Home'
    },
    {
      name: 'About Us'
    },
    {
      name: 'Services',
      children: [
        {
          name: 'Web Development'
        },
        {
          name: 'Graphic Design'
        },
        {
          name: 'SEO'
        },
        {
          name: 'Mobile App Development'
        }
      ]
    },
    {
      name: 'Portfolio',
      children: [
        {
          name: 'Projects 1'
        },
        {
          name: 'Projects 2'
        },
        {
          name: 'Projects 3'
        }
      ]
    },
    {
      name: 'Blog'
    },
    {
      name: 'Contact Us'
    },
    {
      name: 'Testimonials'
    }
  ]

  return {
    abstractList,
    navigationList
  }
})

export default useListStore
