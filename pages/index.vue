<script lang="ts" setup>
const store = useListStore()
</script>

<template>
  <KanbanLayout>
    <div class="mx-auto w-full max-w-md">
      <AccordionList :list="store.navigationList"></AccordionList>
    </div>
  </KanbanLayout>
</template>

<style scoped></style>
