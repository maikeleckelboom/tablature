<script lang="ts" setup>
import type { Board } from '~/types'

const { data } = await useAsyncData<Board[]>('boards', () =>
  $fetch('http://127.0.0.1:8000/api/v1/kanban/boards')
)
const store = useBoardStore()

if (data.value) {
  store.setBoards(data.value)
}
</script>

<template>
  <TwoColumnLayout>
    <template #header>
      <div class="mx-auto w-full max-w-md">
        <Breadcrumbs />
      </div>
    </template>
    <template #default>
      <div class="h-full overflow-y-auto p-3">
        <slot name="default" />
      </div>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </TwoColumnLayout>
</template>
