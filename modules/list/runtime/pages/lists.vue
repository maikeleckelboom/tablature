<script setup lang="ts">
const { abstractList, navigationList } = useListStore()
</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <div class="grid max-w-xl gap-4 md:grid-cols-2">
      <section>
        <h1 class="mb-2 text-title-lg text-secondary">AbstractList</h1>
        <AbstractList :list="abstractList">
          <template #item="{ item, level }">
            <AbstractListItem>
              {{ item.name }}
            </AbstractListItem>
          </template>
        </AbstractList>
      </section>
      <section class="">
        <h1 class="mb-2 text-title-lg text-secondary">AccordionList</h1>
        <AccordionList :list="navigationList"></AccordionList>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
