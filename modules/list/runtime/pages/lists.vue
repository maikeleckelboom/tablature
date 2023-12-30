<script lang="ts" setup>
const { list } = useNavigationStore()

const navigationList1 = ref(useCloneDeep(list))
const navigationList2 = ref(useCloneDeep(list))
</script>

<template>
  <ColumnLayout>
    <div class="grid h-full gap-8 md:grid-cols-2">
      <div
        class="scrollbar h-[90svh] overflow-y-auto overflow-x-clip rounded bg-surface-container-lowest p-6"
      >
        <RecursiveList
          :list="navigationList1"
          :list-class="(level) => 'pl-4 ' + (level > 0 ? 'list-[circle]' : 'list-disc')"
          :item-class="() => 'leading-loose whitespace-nowrap marker:accent-primary'"
        />
      </div>
      <div class="h-fit w-[max(400px,100%)] rounded bg-surface-container-lowest p-6">
        <NavigationList class="w-full" :list="navigationList1" type="single" />
      </div>
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
