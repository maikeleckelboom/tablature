import type { NavigationListItem } from '~/modules/list/types'
import type { MenuItem } from '~/modules/menu/types'

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

  const toolbarMenu = ref<MenuItem[]>([
    {
      name: 'Format',
      open: false,
      children: [
        {
          name: 'Text Styles',
          open: false,
          children: [
            { name: 'Bold', leadingIcon: 'ic:outline-format-bold' },
            { name: 'Italic', leadingIcon: 'ic:outline-format-italic' },
            { name: 'Underline', leadingIcon: 'ic:outline-format-underlined' },
            { name: 'Strikethrough', leadingIcon: 'ic:outline-strikethrough-s' },
            { name: 'Superscript', leadingIcon: 'ic:outline-superscript' }
          ]
        },
        {
          name: 'Paragraph Styles',
          open: false,
          children: [
            { name: 'Align', leadingIcon: 'ic:outline-format-align-left' },
            {
              name: 'Line Spacing',
              open: false,
              children: [
                { name: 'Single' },
                { name: '1.15' },
                { name: 'Double' },
                { name: 'Custom: 1.2' }
              ]
            },
            { name: 'Add Space Before Paragraph', leadingIcon: 'ic:keyboard-arrow-up' },
            { name: 'Add Space After Paragraph', leadingIcon: 'ic:keyboard-arrow-down' },
            { name: 'Custom Spacing...', leadingIcon: 'ic:outline-space-bar' }
          ]
        },
        {
          name: 'List Options',
          open: false,
          children: [
            { name: 'Numbered Lists', leadingIcon: 'ic:format-list-numbered' },
            { name: 'Bulleted Lists', leadingIcon: 'ic:format-list-bulleted' },
            { name: 'List Options', leadingIcon: 'ic:format-list-bulleted' },
            { name: 'Clear Formatting', leadingIcon: 'ic:format-clear' }
          ]
        }
      ]
    },
    {
      name: 'Tools',

      open: false,
      children: [
        { name: 'Spelling & Grammar', leadingIcon: 'ic:spellcheck' },
        { name: 'Word Count', leadingIcon: 'ic:outline-text-increase' }
      ]
    },
    {
      name: 'Tables',
      open: false,
      children: [
        { name: 'Insert Table', leadingIcon: 'ic:select-all' },
        { name: 'Delete Table', leadingIcon: 'ic:select-all' },
        { name: 'Select Table', leadingIcon: 'ic:select-all' },
        { name: 'Select Row', leadingIcon: 'ic:select-all' },
        { name: 'Select Column', leadingIcon: 'ic:select-all' },
        { name: 'Select Cell', leadingIcon: 'ic:select-all' },
        { name: 'Merge Cells', leadingIcon: 'ic:call-merge' },
        { name: 'Split Cells', leadingIcon: 'ic:call-split' },
        { name: 'Resize Table', leadingIcon: 'ic:select-all' },
        { name: 'Table Properties', leadingIcon: 'ic:select-all' }
      ]
    },
    {
      name: 'Add-ons',
      open: false,
      children: [
        { name: 'Get Add-ons...', leadingIcon: 'ic:get-app' },
        { name: 'Manage Add-ons...', leadingIcon: 'ic:settings' }
      ]
    },
    {
      name: 'Help',
      open: false,
      children: [
        { name: 'Docs', leadingIcon: 'ic:outline-description' },
        { name: 'Report an issue', leadingIcon: 'ic:report-problem' },
        { name: 'Keyboard shortcuts', leadingIcon: 'ic:keyboard' }
      ]
    }
  ])

  return {
    list,
    toolbarMenu
  }
})

export default useNavigationStore
