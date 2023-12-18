import type { ButtonProps } from '~/modules/button/types'

type Title = {
  title: string
}

type Text = {
  text: string
}

type Icon = {
  icon: string
}

export type ContentProps = Title | Text | (Title & Text)

export type ActionBtn = Partial<ButtonProps> & {
  onClick: (...args: any) => any
}

export type DialogProps = Partial<{
  headline: string
  text: string
  icon: string
  intent: 'basic' | 'full-screen'
  divider: 'top' | 'bottom' | 'both'
  closeAffordance: boolean
  responsive: boolean
  actions: ActionBtn[]
}>
