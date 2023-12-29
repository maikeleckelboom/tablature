<script setup lang="ts">
const { navigationList: navList } = useListStore()

const navigationList1 = ref(useCloneDeep(navList))

const navigationList2 = ref(useCloneDeep(navList))
</script>

<template>
  <div class="mx-auto w-full max-w-2xl">
    <div class="grid gap-4 md:grid-cols-3">
      <Breadcrumbs class="col-span-full mb-5 mt-4" />
      <RecursiveList
        :list="navigationList1"
        :list-class="(level) => (level > 0 ? 'pl-4 list-[circle]' : 'list-disc')"
      />
      <NavigationList :list="navigationList2" type="single" />
      <NavigationList :list="navigationList1" type="multiple" />
    </div>
  </div>
</template>

<style scoped></style>
