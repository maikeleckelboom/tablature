import type { MenuItem } from '~/modules/menu/types'

const useToolbarMenuStore = defineStore('toolbar-menu-store', () => {
  const state = ref<MenuItem[]>([
    {
      label: 'Format',
      open: true,
      children: [
        {
          label: 'Text Styles',
          open: true,
          selectable: true,
          multiple: true,
          children: [
            {
              label: 'Bold',
              leadingIcon: 'ic:outline-format-bold',
              shortcuts: ['Ctrl', 'B'], // ['⌘', 'B']
              selected: true
            },
            {
              label: 'Italic',
              leadingIcon: 'ic:outline-format-italic',
              shortcuts: ['Ctrl', 'I']
            },
            {
              label: 'Underline',
              leadingIcon: 'ic:outline-format-underlined',
              shortcuts: ['Ctrl', 'U'],
              selected: true
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
          open: true,
          children: [
            {
              label: 'Line Spacing',
              open: true,
              selectable: true,
              minSelections: 1,
              children: [
                { label: 'Single' },
                { label: '1.15', selected: true },
                { label: 'Double' },
                { label: 'Custom: 1.2' }
              ]
            },
            {
              label: 'Custom Spacing...',
              leadingIcon: 'ic:outline-space-bar'
            },
            {
              label: 'Add Space Before Paragraph',
              leadingIcon: 'ic:keyboard-arrow-up'
            },
            {
              label: 'Add Space After Paragraph',
              leadingIcon: 'ic:keyboard-arrow-down'
            }
          ]
        },
        {
          label: 'List Options',
          name: 'list-options',
          selectable: true,
          open: true,
          minSelections: 1,
          children: [
            {
              label: 'None',
              leadingIcon: 'ic:format-list-bulleted',
              selected: true
            },
            {
              label: 'Numbered Lists',
              leadingIcon: 'ic:format-list-numbered'
            },
            {
              label: 'Bulleted Lists',
              leadingIcon: 'ic:format-list-bulleted'
            }
          ]
        },
        {
          label: 'Clear Formatting',
          leadingIcon: 'ic:format-clear'
        }
      ]
    },
    {
      label: 'Tools',
      children: [
        { label: 'Spelling & Grammar', leadingIcon: 'ic:baseline-spellcheck' },
        { label: 'Word Count', leadingIcon: 'ic:baseline-123' }
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

  return {
    state
  }
})

export default useToolbarMenuStore
