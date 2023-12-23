import type { Column, ColumnsReorderUpsert, ColumnUpsert } from '~/types'

export function useColumnResource() {
  const runtimeConfig = useRuntimeConfig()

  const create = async (payload: ColumnUpsert) => {
    return await $fetch<Column>(
      `${runtimeConfig.public.apiUrl}/kanban/${payload.board_id}/columns`,
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    )
  }

  const edit = async (payload: ColumnUpsert) => {
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

  const reorder = async (payload: ColumnsReorderUpsert) => {
    return await $fetch(`${runtimeConfig.public.apiUrl}/kanban/columns/reorder`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  }

  return { create, destroy, edit, reorder }
}
