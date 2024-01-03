<script lang="ts" setup>
const store = useToolbarMenuStore()
</script>

<template>
  <ColumnLayout>
    <div class="flex flex-row items-start gap-4">
      <List :items="store.state" />
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
