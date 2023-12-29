<script lang="ts" setup>
const store = useListStore()
</script>

<template>
  <KanbanLayout>
    <section class="mx-auto w-full max-w-md">
      <div class="rounded-md bg-surface-dim p-4">
        <NavigationList :list="store.navigationList"></NavigationList>
      </div>
    </section>
  </KanbanLayout>
</template>

<style scoped></style>
