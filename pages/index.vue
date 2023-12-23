<script setup lang="ts">
import TestReusableTemplate from '~/components/TestReusableTemplate.vue'
</script>

<template>
  <KanbanLayout>
    <template #header>
      <div></div>
    </template>
    <template #default>
      <div>
        <TestReusableTemplate />
      </div>
    </template>
    <template #footer></template>
  </KanbanLayout>
</template>

<style scoped></style>
