import type { BoardUpsert } from '~/types'

export function useBoardResource() {
  const runtimeConfig = useRuntimeConfig()
  const create = async (payload: BoardUpsert) => {
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/boards`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }
  const edit = async (payload: BoardUpsert) => {
    if (!payload.id) return
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/boards/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }
  const destroy = async (id: number) => {
    if (!id) return
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/boards/${id}`, {
      method: 'DELETE'
    })
  }
  return {
    create,
    destroy,
    edit
  }
}
