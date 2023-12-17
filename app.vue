<script setup lang="ts">
import { repeatingLinearGradient } from '~/modules/theme/runtime/utils/color'

const { data, pending, error } = await useAsyncData<any>('boards', () =>
  $fetch('http://127.0.0.1:8000/api/v1/kanban/boards')
)
const store = useBoardStore()

const { boards } = storeToRefs(store)

if (data.value) {
  store.setBoards(data.value)
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator :color="repeatingLinearGradient" />
    <div
      class="grid-cols-1 gap-x-2 md:grid md:grid-cols-[80px,1fr] md:gap-x-4 lg:grid-cols-[320px,1fr]"
    >
      <Sidebar />
      <NuxtPage />
    </div>
  </div>
</template>
