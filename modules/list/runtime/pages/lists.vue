<script setup lang="ts">
const { navigationList } = useListStore()

const navigationList1 = ref(useCloneDeep(navigationList))

const navigationList2 = ref(useCloneDeep(navigationList))
</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <div class="grid gap-6 md:grid-cols-2">
      <Breadcrumbs class="col-span-full mb-5 mt-4" />
      <section class="">
        <h1 class="mb-4 text-title-lg text-secondary">AccordionList [type='single']</h1>
        <AccordionList :list="navigationList2" type="single" class="bg-surface-container-low p-3" />
      </section>
      <section class="">
        <h1 class="mb-4 whitespace-nowrap text-title-lg text-secondary">
          AccordionList [type='multiple']
        </h1>
        <AccordionList :list="navigationList1" type="multiple" />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
