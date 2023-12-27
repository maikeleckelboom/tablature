<script setup lang="ts">
const { abstractList, navigationList } = useListStore()
</script>

<template>
  <div class="grid grid-cols-3">
    <section>
      <h1 class="mb-2 text-title-lg text-secondary">AbstractList</h1>
      <AbstractList :list="abstractList" />
    </section>
    <!--    <section>
          <h1 class="mb-2 text-title-lg text-secondary">NavigationList</h1>
          <NavigationList :list="navigationList" />
        </section>-->
    <section class="">
      <h1 class="mb-2 text-title-lg text-secondary">AccordionList</h1>
      <AccordionList :list="navigationList"></AccordionList>
    </section>
  </div>
</template>

<style scoped></style>
