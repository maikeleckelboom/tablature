<script lang="ts" setup>
const store = useToolbarMenuStore()

const fns = new Map<string, () => void>([
  [
    'Bold',
    () => {
      console.log('Bold')
    }
  ],
  [
    'Italic',
    () => {
      console.log('Italic')
    }
  ],
  [
    'Underline',
    () => {
      console.log('Underline')
    }
  ],
  [
    'Strikethrough',
    () => {
      console.log('Strikethrough')
    }
  ],
  [
    'Superscript',
    () => {
      console.log('Superscript')
    }
  ]
])

function mapToolbarFunctionItems() {
  return mapRecursive(store.state, (item) =>
    fns.has(item.label)
      ? {
          ...item,
          onAction: fns.get(item.label)
        }
      : item
  )
}

const items = ref(mapToolbarFunctionItems())
</script>

<template>
  <ColumnLayout>
    <div class="flex flex-row items-start gap-4">
      <List :items="items" />
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
