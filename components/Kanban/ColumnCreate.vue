<script lang="ts" setup>
const store = useBoardStore()

const { board } = storeToRefs(store)

const formModel = reactive({
  title: ''
})

const commit = async () => {
  if (!board.value || formModel.title?.length < 2) return
  const column = await store.createColumn(board.value.id, {
    title: formModel.title,
    board_id: board.value.id
  })
  store.addColumn(column)
}

const onClick = () => {
  commit()
}
</script>

<template>
  <Button @click="onClick"> Create new list </Button>
</template>
