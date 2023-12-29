<script lang="ts" setup>
const isVisible = ref<boolean>(false)
const offset = ref<{ x: number; y: number }>({ x: 20, y: 20 })
const clickPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })

function showContextMenu(evt: MouseEvent) {
  console.log('showContextMenu')
  const { x: offsetX, y: offsetY } = offset.value
  clickPosition.value = { x: evt.clientX + offsetX, y: evt.clientY + offsetY }
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl p-4">
    <div
      class="relative grid size-[200px] place-items-center rounded border border-outline-variant p-4"
    >
      <button class="absolute inset-0" @click.prevent.right="showContextMenu">Right-click</button>
    </div>
    <Teleport to="body">
      <ContextMenu
        v-if="isVisible"
        :style="{
          top: `${clickPosition.y}px`,
          left: `${clickPosition.x}px`
        }"
        @click-outside="isVisible = false"
      />
    </Teleport>
  </div>
</template>

<style scoped></style>
