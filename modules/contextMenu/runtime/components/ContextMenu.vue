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
  <div ref="contextMenu" class="absolute w-[200px]">
    <div v-for="n in 5" :key="n" class="relative z-50 w-full border border-tertiary bg-surface">
      <button class="flex w-full justify-start p-3 hover:bg-tertiary-container/50">
        Item {{ n }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
