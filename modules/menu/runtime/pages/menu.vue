<script lang="ts" setup>
const store = useToolbarMenuStore()

onMounted(() => {
  const selectedItems = mapRecursive(store.state, (item) => {
    return item
  })
  console.log(selectedItems)
})
</script>

<template>
  <ColumnLayout>
    <div class="flex flex-row items-start gap-4">
      <List :items="store.state" />
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
