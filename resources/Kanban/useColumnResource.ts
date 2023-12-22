import type { Column, ColumnsReorderRequest, CreateColumn } from '~/types'

export function useColumnResource() {
  const runtimeConfig = useRuntimeConfig()

  const create = async (payload: CreateColumn) => {
    return await $fetch<Column>(
      `${runtimeConfig.public.apiUrl}/kanban/${payload.board_id}/columns`,
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    )
  }

  const edit = async (payload: CreateColumn) => {
    return await $fetch<Column>(
      `${runtimeConfig.public.apiUrl}/kanban/columns/${payload.board_id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload)
      }
    )
  }

  const destroy = async (id: number) => {
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/columns/${id}`, {
      method: 'DELETE'
    })
  }

  const reorder = async (payload: ColumnsReorderRequest) => {
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/columns/reorder`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }

  return { create, destroy, edit, reorder }
}
