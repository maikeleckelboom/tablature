<script lang="ts" setup>
import useKanbanStore from '~/stores/useKanbanStore'

const { columnId } = defineProps<{
  columnId: number
}>()

const store = useKanbanStore()

const formModel = reactive({
  content: ''
})

const errorMessages = ref<string[]>([])

const validate = () => {
  return formModel.content.length >= 2
}

const { shift, enter } = useMagicKeys()

const onSubmit = async () => {
  if (shift.value) {
    formModel.content += '\n'
    return
  }
  if (!validate()) {
    errorMessages.value = ['Content is required', 'Content must be at least 2 characters long']
    return
  }
  const card = await store.createCard({
    content: formModel.content,
    column_id: columnId
  })
  console.log(card)
  formModel.content = ''
  errorMessages.value = []
}
</script>

<template>
  <div>
    <div>
      <div v-if="errorMessages.length" class="text-error">
        <ul>
          <li v-for="message in errorMessages" :key="message">
            {{ message }}
          </li>
        </ul>
      </div>
      <form
        @submit.prevent="onSubmit"
        :class="{
          'border-error': errorMessages.length,
          'border-outline-variant': !errorMessages.length,
          'bg-surface-level-1': shift
        }"
      >
        <textarea
          v-model="formModel.content"
          class="w-full resize-none rounded-md border border-outline-variant/20 bg-surface p-3 text-on-surface focus:border-outline-variant focus-visible:border-outline-variant"
          placeholder="Enter card content..."
          @keydown.enter.exact.prevent="onSubmit"
        />
      </form>
    </div>
  </div>
</template>
