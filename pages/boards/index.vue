<script lang="ts" setup>
const route = useRoute()
const { data, pending, error } = await useAsyncData<any>('boards', () =>
  $fetch('http://127.0.0.1:8000/api/v1/kanban/boards')
)
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
