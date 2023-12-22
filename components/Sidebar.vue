<script setup lang="ts">
const store = useBoardStore()

const { boards } = storeToRefs(store)

const boardsNavigation = computed(() => {
  return boards.value.map((board) => ({
    id: board.id,
    title: board.title,
    href: `/boards/${board.id}`
  }))
})
</script>

<template>
  <aside class="hidden w-[280px] flex-col overflow-x-clip md:flex">
    <header class="flex items-center justify-between p-4">
      <h2 class="text-lg font-semibold">Boards</h2>
    </header>
    <menu class="pl-2">
      <li v-for="board in boardsNavigation" :key="board.id">
        <NuxtLink :to="board.href" class="flex p-2">
          {{ board.title }}
        </NuxtLink>
      </li>
    </menu>
  </aside>
</template>

<style scoped></style>
