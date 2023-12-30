import type { NavigationListItem } from '~/modules/list/types'
import type { MenuItem } from '~/modules/menu/types'

const useNavigationStore = defineStore('navigation', () => {
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
          name: '/',
          href: '/modules'
        },
        {
          name: 'List',
          href: '/modules/lists'
        },
        {
          name: 'Menu',
          href: '/modules/menu'
        }
      ]
    },
    {
      name: 'Boards',
      open: false,
      children: [
        {
          name: 'Board 1',
          open: false,
          children: [
            {
              name: 'Show',
              href: '/boards/1'
            },
            {
              name: 'Column 1',
              open: false,
              children: [
                {
                  name: 'Card 1',
                  href: '/boards/1/1/1'
                },
                {
                  name: 'Card 2',
                  href: '/boards/1/1/2'
                },
                {
                  name: 'Card 3',
                  href: '/boards/1/1/3'
                }
              ]
            },
            {
              name: 'Column 2',
              open: false,
              children: [
                {
                  name: 'Card 1',
                  href: '/boards/1/1/1'
                },
                {
                  name: 'Card 2',
                  href: '/boards/1/1/2'
                },
                {
                  name: 'Card 3',
                  href: '/boards/1/1/3'
                }
              ]
            },
            {
              name: 'Column 3',
              open: false,
              children: [
                {
                  name: 'Card 1',
                  href: '/boards/1/1/1'
                },
                {
                  name: 'Card 2',
                  href: '/boards/1/1/2'
                },
                {
                  name: 'Card 3',
                  href: '/boards/1/1/3'
                }
              ]
            }
          ]
        },
        {
          name: 'Board 2',
          open: false,
          children: [
            {
              name: 'Show',
              href: '/boards/2'
            },
            {
              name: 'Column 1',
              open: false,
              children: [
                {
                  name: 'Card 1',
                  href: '/boards/1/1/1'
                },
                {
                  name: 'Card 2',
                  href: '/boards/1/1/2'
                },
                {
                  name: 'Card 3',
                  href: '/boards/1/1/3'
                }
              ]
            },
            {
              name: 'Column 2',
              open: false,
              children: [
                {
                  name: 'Card 1',
                  href: '/boards/1/1/1'
                },
                {
                  name: 'Card 2',
                  href: '/boards/1/1/2'
                },
                {
                  name: 'Card 3',
                  href: '/boards/1/1/3'
                }
              ]
            },
            {
              name: 'Column 3',
              open: false,
              children: [
                {
                  name: 'Card 1',
                  href: '/boards/1/1/1'
                },
                {
                  name: 'Card 2',
                  href: '/boards/1/1/2'
                },
                {
                  name: 'Card 3',
                  href: '/boards/1/1/3'
                }
              ]
            }
          ]
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

  const toolbarMenu = ref<MenuItem[]>([
    {
      name: 'Format',
      open: false,
      children: [
        {
          name: 'Text Styles',
          open: false,
          children: [
            { name: 'Bold', leadingIcon: 'ic:outline-format-bold', href: '#' },
            { name: 'Italic', leadingIcon: 'ic:outline-format-italic', href: '#' },
            { name: 'Underline', leadingIcon: 'ic:outline-format-underlined', href: '#' },
            { name: 'Strikethrough', leadingIcon: 'ic:outline-strikethrough-s', href: '#' },
            { name: 'Superscript', leadingIcon: 'ic:outline-superscript', href: '#' }
          ]
        },
        {
          name: 'Paragraph Styles',
          open: false,
          children: [
            { name: 'Align', leadingIcon: 'ic:outline-format-align-left', href: '#' },
            {
              name: 'Line Spacing',
              children: [
                { name: 'Single', href: '#' },
                { name: '1.15', href: '#' },
                { name: 'Double', href: '#' },
                { name: 'Custom: 1.2', href: '#' }
              ]
            },
            { name: 'Add Space Before Paragraph', leadingIcon: 'ic:keyboard-arrow-up', href: '#' },
            { name: 'Add Space After Paragraph', leadingIcon: 'ic:keyboard-arrow-down', href: '#' },
            { name: 'Custom Spacing...', leadingIcon: 'ic:outline-space-bar', href: '#' }
          ]
        },
        {
          name: 'List Options',
          open: false,
          children: [
            { name: 'Numbered Lists', leadingIcon: 'ic:format-list-numbered', href: '#' },
            { name: 'Bulleted Lists', leadingIcon: 'ic:format-list-bulleted', href: '#' },
            { name: 'List Options', leadingIcon: 'ic:format-list-bulleted', href: '#' },
            { name: 'Clear Formatting', leadingIcon: 'ic:format-clear', href: '#' }
          ]
        }
      ]
    },
    {
      name: 'Tools',

      open: false,
      children: [
        { name: 'Spelling & Grammar', leadingIcon: 'ic:spellcheck', href: '#' },
        { name: 'Word Count', leadingIcon: 'ic:outline-text-increase', href: '#' }
      ]
    },
    {
      name: 'Tables',
      open: false,
      children: [
        { name: 'Insert Table', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Delete Table', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Select Table', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Select Row', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Select Column', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Select Cell', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Merge Cells', leadingIcon: 'ic:call-merge', href: '#' },
        { name: 'Split Cells', leadingIcon: 'ic:call-split', href: '#' },
        { name: 'Resize Table', leadingIcon: 'ic:select-all', href: '#' },
        { name: 'Table Properties', leadingIcon: 'ic:select-all', href: '#' }
      ]
    },
    {
      name: 'Add-ons',
      open: false,
      children: [
        { name: 'Get Add-ons...', leadingIcon: 'ic:get-app', href: '#' },
        { name: 'Manage Add-ons...', leadingIcon: 'ic:settings', href: '#' }
      ]
    },
    {
      name: 'Help',
      open: false,
      children: [
        { name: 'Docs', leadingIcon: 'ic:outline-description', href: '#' },
        { name: 'Report an issue', leadingIcon: 'ic:report-problem', href: '#' },
        { name: 'Keyboard shortcuts', leadingIcon: 'ic:keyboard', href: '#' }
      ]
    }
  ])
  return {
    list,
    toolbarMenu
  }
})

export default useNavigationStore
