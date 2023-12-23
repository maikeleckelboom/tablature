<script lang="ts" setup>
import type { ListItem, ListItemLink } from '~/types'

const { list } = defineProps<{
  list: ListItem[]
}>()

function isLink(item: ListItem): item is ListItemLink {
  return (<ListItemLink>item).href !== undefined
}
</script>

<template>
  <AbstractList :list="list">
    <template #item.name="{ item, level }">
      <span
        v-if="level > 0"
        class="mx-2 inline-flex h-1 self-center rounded bg-primary-container"
      />
      {{ item.name }}
    </template>
    <template #children="{ item, level }">
      <div class="flex flex-col">
        <NuxtLink v-for="child in item.children" :to="(<ListItemLink>child).href" :key="child.name">
          <div v-if="level > 0" class="inline-flex">
            <Icon
              name="ic:baseline-arrow-right"
              class="mx-2 inline-flex h-1 w-4 self-center text-on-surface"
            />
            {{ child.name }}
          </div>
        </NuxtLink>
      </div>
    </template>
  </AbstractList>
</template>

<style scoped></style>
