<script lang="ts" setup>
const store = useListStore()
</script>

<template>
  <KanbanLayout>
    <AccordionList :list="store.navigationList"></AccordionList>
  </KanbanLayout>
</template>

<style scoped></style>
