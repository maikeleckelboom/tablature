<script lang="ts" setup>
const { navigationList } = useListStore()

const navigationList1 = ref(useCloneDeep(navigationList))
const navigationList2 = ref(useCloneDeep(navigationList))
</script>

<template>
  <div class="mx-auto w-full max-w-4xl">
    <div class="grid gap-6 md:grid-cols-2">
      <Breadcrumbs class="col-span-full mb-5 mt-4" />
      <NavigationList :list="navigationList1" type="multiple" />
    </div>
  </div>
</template>

<style scoped></style>
