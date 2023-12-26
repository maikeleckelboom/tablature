<script setup lang="ts">
const store = useListStore()

const { navigationList } = storeToRefs(store)
</script>

<template>
  <KanbanLayout> </KanbanLayout>
</template>

<style scoped></style>
