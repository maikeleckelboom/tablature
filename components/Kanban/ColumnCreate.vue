<script lang="ts" setup>
const store = useKanbanStore()

const { board } = storeToRefs(store)

const textarea = ref<HTMLTextAreaElement>()

const input = ref<string>('')

const onSubmit = async () => {
  if (!board.value || input.value?.length < 2) return
  await store.createColumn({ title: input.value, board_id: board.value.id })
}
</script>

<template>
  <form @submit.prevent.stop="onSubmit" class="p-2">
    <textarea
      ref="textarea"
      v-model="input"
      rows="1"
      autocapitalize="on"
      class="w-full resize-none overflow-clip rounded-md border border-outline-variant bg-surface p-3 text-on-surface"
      placeholder="Enter list title..."
    />
    <Button intent="outlined" class="mt-2 w-full" type="submit"> Add a List</Button>
  </form>
</template>
