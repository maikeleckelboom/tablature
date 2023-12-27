<script setup lang="ts">
const { abstractList, navigationList } = useListStore()
</script>

<template>
  <KanbanLayout>
    <div class="flex flex-col gap-y-8">
      <div class="grid grid-cols-2"></div>
    </div>
  </KanbanLayout>
</template>

<style scoped></style>
