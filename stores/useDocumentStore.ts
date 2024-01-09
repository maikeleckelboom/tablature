import type { BaseListItem } from '~/modules/menu/types'

interface DocumentState extends BaseListItem {
  open?: boolean
  children?: DocumentState[]

  [key: string]: any
}

const realisticDocumentData: DocumentState[] = [
  {
    label: 'Company Documents',
    leadingIcon: 'ic:outline-business',
    open: true,
    children: [
      {
        label: 'Financial Reports',
        leadingIcon: 'ic:outline-bar-chart',
        open: false,
        children: [
          {
            label: 'Q1 2024',
            open: true,
            children: [
              {
                label: 'Balance Sheet',
                leadingIcon: 'ic:outline-account-balance'
              },
              {
                label: 'Income Statement',
                leadingIcon: 'ic:outline-trending-up'
              }
            ]
          },
          {
            label: 'Q2 2024',
            children: [
              {
                label: 'Balance Sheet',
                leadingIcon: 'ic:outline-account-balance'
              }
            ]
          }
        ]
      },
      {
        label: 'Project Files',
        leadingIcon: 'ic:baseline-folder',
        children: [
          {
            label: 'Project A',
            leadingIcon: 'ic:outline-folder'
          },
          {
            label: 'Project B',
            leadingIcon: 'ic:outline-folder'
          }
        ]
      },
      {
        label: 'HR Documents',
        leadingIcon: 'ic:outline-people',
        open: false,
        children: [
          {
            label: 'Employee Handbook',
            leadingIcon: 'ic:outline-book'
          },
          {
            label: 'Benefits Information',
            leadingIcon: 'ic:outline-favorite'
          },
          {
            label: 'Recruitment',
            leadingIcon: 'ic:outline-work',
            open: true,
            children: [
              {
                label: 'Job Descriptions',
                leadingIcon: 'ic:outline-description'
              },
              {
                label: 'Resumes',
                leadingIcon: 'ic:outline-description'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: 'Personal Documents',
    leadingIcon: 'ic:outline-person',
    children: [
      {
        label: 'Taxes',
        leadingIcon: 'ic:outline-attach-money',
        open: true,
        children: [
          {
            label: '2020'
          },
          {
            label: '2021'
          }
        ]
      },
      {
        label: 'Health',
        leadingIcon: 'ic:outline-healing',
        children: [
          {
            label: 'Medical Records'
          },
          {
            label: 'Insurance'
          }
        ]
      }
    ]
  }
]

const useDocumentStore = defineStore('document-store', () => {
  const state = ref<BaseListItem[]>(realisticDocumentData)

  return {
    state
  }
})

export default useDocumentStore
