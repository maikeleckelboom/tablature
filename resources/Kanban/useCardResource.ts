import type { Card, CardsReorderUpsert, CardUpsert } from '~/types'

export function useCardResource() {
  const runtimeConfig = useRuntimeConfig()

  const create = async (payload: CardUpsert) => {
    return await $fetch<Card>(`${runtimeConfig.public.apiUrl}/kanban/${payload.column_id}/cards`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }

  const edit = async (payload: CardUpsert) => {
    return await $fetch<Card>(`${runtimeConfig.public.apiUrl}/kanban/cards/${payload.column_id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }

  const destroy = async (id: number) => {
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/cards/${id}`, {
      method: 'DELETE'
    })
  }

  const reorder = async (columns: CardsReorderUpsert) => {
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/cards/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ columns })
    })
  }

  return { create, destroy, edit, reorder }
}
