<script setup lang="ts">
const { navigationList: navList } = useListStore()

const navigationList1 = ref(useCloneDeep(navList))

const navigationList2 = ref(useCloneDeep(navList))
</script>

<template>
  <div class="mx-auto w-full max-w-7xl">
    <div class="grid gap-4 md:grid-cols-3">
      <Breadcrumbs class="col-span-full mb-5 mt-4" />
      <div class="pl-4">
        <RecursiveList
          :list="navigationList1"
          class="text-on-accent-primary accent-primary"
          :list-class="(level) => 'pl-2 ' + (level > 0 ? 'list-[circle]' : 'list-disc')"
          :item-class="() => 'leading-loose whitespace-nowrap marker:accent-primary'"
        />
      </div>

      <NavigationList :list="navigationList2" type="single" />
      <NavigationList :list="navigationList1" type="multiple" />
    </div>
  </div>
</template>

<style scoped></style>
