<script lang="ts" setup>
import { repeatingLinearGradient } from '~/modules/theme/runtime/utils/color'

const { data, pending, error } = await useAsyncData<any>('boards', () =>
  $fetch('http://127.0.0.1:8000/api/v1/kanban/boards')
)
const store = useBoardStore()

if (data.value) {
  store.setBoards(data.value)
}

const onError = (err: Error) => {
  console.error(err)
}
</script>

<template>
  <NuxtErrorBoundary @error="onError">
    <NuxtLoadingIndicator :color="repeatingLinearGradient" />
    <NuxtPage />
    <DialogWrapper />
  </NuxtErrorBoundary>
</template>
