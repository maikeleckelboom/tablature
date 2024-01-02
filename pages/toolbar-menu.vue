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

const items = ref(
  mapRecursive(store.state, (item) => {
    const children = item.children?.map((child) => {
      if (fns.has(child.name)) {
        return {
          ...child,
          fn: fns.get(child.name)
        }
      }
      return child
    })

    if (children) {
      return {
        ...item,
        children
      }
    }

    if (fns.has(item.name)) {
      return {
        ...item,
        fn: fns.get(item.name)
      }
    }

    return item
  })
)
</script>

<template>
  <ColumnLayout>
    <div class="flex flex-row items-start gap-4">
      <List :items="items" />
    </div>
    <pre>{{ items }}</pre>
  </ColumnLayout>
</template>

<style scoped></style>
