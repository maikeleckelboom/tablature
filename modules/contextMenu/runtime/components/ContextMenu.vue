<script lang="ts" setup>
const contextMenu = ref<HTMLElement>()

const emit = defineEmits<{
  (ev: 'click-outside'): void
}>()

onClickOutside(contextMenu, () => {
  emit('click-outside')
})
</script>

<template>
  <div ref="contextMenu" class="absolute bg-surface-container p-2">
    <div v-for="n in 5" :key="n" class="p-2">
      <button class="p-2">Item {{ n }}</button>
    </div>
  </div>
</template>

<style scoped></style>
