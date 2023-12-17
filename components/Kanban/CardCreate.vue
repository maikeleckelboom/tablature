<script lang="ts" setup>
const { columnId } = defineProps<{
  columnId: number
}>()

const store = useBoardStore()

const isFormVisible = ref<boolean>(false)

const isFormVisibleToggle = () => {
  isFormVisible.value = !isFormVisible.value
}

const formModel = reactive({
  content: ''
})

const errorMessages = ref<string[]>([])

const validate = () => {
  return formModel.content !== '' && formModel.content?.length
}

const onCreate = async () => {
  if (!validate()) {
    errorMessages.value = ['Content is required']
    return
  }
  const card = await store.createCard(columnId, {
    content: formModel.content,
    board_column_id: columnId
  })
  store.addCardToColumn(columnId, card)
  isFormVisibleToggle()
}
</script>

<template>
  <div>
    <Button intent="filled" @click="isFormVisibleToggle" icon="ic:round-add">
      <span>Add Card</span>
    </Button>
    <div>
      <div v-if="isFormVisible">
        <div v-if="errorMessages.length" class="text-red-500">
          <ul>
            <li v-for="message in errorMessages" :key="message">
              {{ message }}
            </li>
          </ul>
        </div>
        <form onsubmit="return false">
          <textarea v-model="formModel.content" class="h-12 w-full border" placeholder="" />
          <button @click="isFormVisibleToggle">Cancel</button>
          <button @click.stop.prevent="onCreate">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>
