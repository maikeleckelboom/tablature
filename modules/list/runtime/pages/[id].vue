<script setup lang="ts">
const { abstractList, navigationList } = useListStore()
</script>

<template>
  <KanbanLayout>
    <div class="flex flex-col">
      <section class="">
        <h1 class="mb-2 text-title-lg text-secondary">AccordionList</h1>
        <AccordionList :list="navigationList"></AccordionList>
      </section>
    </div>
  </KanbanLayout>
</template>

<style scoped></style>
