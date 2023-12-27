<script lang="ts" setup>
const store = useListStore()
</script>

<template>
  <KanbanLayout>
    <section class="mx-auto w-full max-w-md">
      <div class="bg-surface-container-dim rounded-xl">
        <AccordionList :list="store.navigationList"></AccordionList>
      </div>
    </section>
  </KanbanLayout>
</template>

<style scoped></style>
