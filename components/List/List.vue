<script lang="ts" setup>
import type { ListItem } from '~/types'

const { list } = defineProps<{
  list: ListItem[]
}>()
</script>

<template>
  <AbstractList :list="list">
    <template #item.name="{ item, level }">
      <span
        v-if="level > 0"
        class="mx-2 inline-flex h-1 w-4 self-center rounded bg-primary-container"
      />
      {{ item.name }}
    </template>
    <template #children="{ item, level }">
      <div v-for="child in item.children" :key="child.name">
        <div v-if="level > 0" class="inline-flex">
          <Icon
            name="ic:baseline-arrow-right"
            class="mx-2 inline-flex h-1 w-4 self-center text-on-surface"
          />
        </div>
      </div>
    </template>
  </AbstractList>
</template>

<style scoped></style>
