<script lang="ts" setup>
const users = [
  { firstName: 'John', lastName: 'Johan', id: 1 },
  { firstName: 'Ahmed', lastName: 'Kraft', id: 2 }
]

const selectedValue = ref<string>()
</script>

<template>
  <ColumnLayout>
    <InputSelect
      v-model="selectedValue"
      :option-label="(opt) => opt.firstName"
      :option-value="(opt) => opt.lastName"
      name="test name?"
      label="Test"
      :options="users"
    />
  </ColumnLayout>
</template>

<style scoped></style>
