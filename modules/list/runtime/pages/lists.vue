<script setup lang="ts">
import useListStore from '~/stores/useListStore'

const { abstractList, navigationList } = useListStore()
</script>

<template>
  <KanbanLayout>
    <div class="flex flex-col gap-y-8">
      <div class="grid grid-cols-2">
        <section>
          <h1 class="mb-2 text-title-lg text-secondary">AbstractList</h1>
          <AbstractList :list="abstractList" />
        </section>
        <section>
          <h1 class="mb-2 text-title-lg text-secondary">NavigationList</h1>
          <NavigationList :list="navigationList" />
        </section>
      </div>
    </div>
  </KanbanLayout>
</template>

<style scoped></style>
