import type { MenuItem } from '~/modules/menu/types'

/**
 *      Menu
 *      MenuGroup
 *      MenuItem
 */
const useToolbarMenuStore = defineStore('toolbar-menu-store', () => {
  const state = ref<MenuItem[]>([
    {
      label: 'Format',
      children: [
        {
          label: 'Text Styles',
          selectable: true,
          children: [
            {
              label: 'Bold',
              leadingIcon: 'ic:outline-format-bold',
              shortcut: 'Ctrl+B'
            },
            {
              label: 'Italic',
              leadingIcon: 'ic:outline-format-italic',
              shortcut: 'Ctrl+I'
            },
            {
              label: 'Underline',
              leadingIcon: 'ic:outline-format-underlined',
              checked: true
            },
            {
              label: 'Strikethrough',
              leadingIcon: 'ic:outline-strikethrough-s'
            },
            {
              label: 'Superscript',
              leadingIcon: 'ic:outline-superscript'
            }
          ]
        },
        {
          label: 'Paragraph Styles',
          children: [
            { label: 'Align', leadingIcon: 'ic:outline-format-align-left' },
            {
              label: 'Line Spacing',
              children: [
                { label: 'Single' },
                { label: '1.15' },
                { label: 'Double' },
                { label: 'Custom: 1.2' }
              ]
            },
            { label: 'Add Space Before Paragraph', leadingIcon: 'ic:keyboard-arrow-up' },
            { label: 'Add Space After Paragraph', leadingIcon: 'ic:keyboard-arrow-down' },
            { label: 'Custom Spacing...', leadingIcon: 'ic:outline-space-bar' }
          ]
        },
        {
          label: 'List Options',
          children: [
            { label: 'Numbered Lists', leadingIcon: 'ic:format-list-numbered' },
            { label: 'Bulleted Lists', leadingIcon: 'ic:format-list-bulleted' },
            { label: 'List Options', leadingIcon: 'ic:format-list-bulleted' },
            { label: 'Clear Formatting', leadingIcon: 'ic:format-clear' }
          ]
        }
      ]
    },
    {
      label: 'Tools',
      children: [
        { label: 'Spelling & Grammar', leadingIcon: 'ic:spellcheck' },
        { label: 'Word Count', leadingIcon: 'ic:outline-label-increase' }
      ]
    },
    {
      label: 'Tables',
      children: [
        { label: 'Insert Table', leadingIcon: 'ic:select-all' },
        { label: 'Delete Table', leadingIcon: 'ic:select-all' },
        { label: 'Select Table', leadingIcon: 'ic:select-all' },
        { label: 'Select Row', leadingIcon: 'ic:select-all' },
        { label: 'Select Column', leadingIcon: 'ic:select-all' },
        { label: 'Select Cell', leadingIcon: 'ic:select-all' },
        { label: 'Merge Cells', leadingIcon: 'ic:call-merge' },
        { label: 'Split Cells', leadingIcon: 'ic:call-split' },
        { label: 'Resize Table', leadingIcon: 'ic:select-all' },
        { label: 'Table Properties', leadingIcon: 'ic:select-all' }
      ]
    },
    {
      label: 'Add-ons',
      children: [
        { label: 'Get Add-ons...', leadingIcon: 'ic:get-app' },
        { label: 'Manage Add-ons...', leadingIcon: 'ic:settings' }
      ]
    },
    {
      label: 'Help',
      children: [
        { label: 'Docs', leadingIcon: 'ic:outline-description' },
        { label: 'Report an issue', leadingIcon: 'ic:report-problem' },
        { label: 'Keyboard shortcuts', leadingIcon: 'ic:keyboard' }
      ]
    }
  ])

  const fns = new Map<string, () => void>([
    [
      'Bold',
      () => {
        console.log('Bold')
      }
    ],
    [
      'Italic',
      () => {
        console.log('Italic')
      }
    ],
    [
      'Underline',
      () => {
        console.log('Underline')
      }
    ],
    [
      'Strikethrough',
      () => {
        console.log('Strikethrough')
      }
    ],
    [
      'Superscript',
      () => {
        console.log('Superscript')
      }
    ]
  ])

  return {
    state
  }
})

export default useToolbarMenuStore
