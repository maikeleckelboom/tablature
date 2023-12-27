<script setup lang="ts">
const { abstractList, navigationList } = useListStore()
</script>

<template>
  <KanbanLayout>
    <div class="flex flex-col">
      <section class="mx-auto w-full max-w-md">
        <div class="bg-surface-container-dim rounded-xl p-6">
          <AccordionList :list="navigationList"></AccordionList>
        </div>
      </section>
    </div>
  </KanbanLayout>
</template>

<style scoped></style>
