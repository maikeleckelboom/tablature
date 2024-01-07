<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    item: Record<string, any>
    level?: number
  }>(),
  {
    level: 1
  }
)

const { item, level } = toRefs(props)

function isRecursive(item: Record<string, any>) {
  return item?.children || item?.options
}

function onClicked(evt: MouseEvent) {
  if (isRecursive(item)) {
    item.value.open = !item.value.open
  }
}

// If options is defined, it will render a select
// If children is defined, it will render a submenu
// Multiple will render a checkbox group
// No multiple will render a radio group
</script>

<template>
  <button
    @click="onClicked"
    class="flex flex-row rounded-md border-outline-variant bg-surface-container p-2"
  >
    <span class="text-left text-on-surface">{{ item.label }}</span>
    <template v-if="isRecursive(item)">
      <Icon v-if="item.open" class="ml-2 size-4" name="ic:baseline-arrow-drop-down" />
      <Icon v-else class="ml-2 size-4" name="ic:baseline-arrow-drop-up" />
    </template>
  </button>
  <template v-if="isRecursive(item)">
    <div
      v-if="item?.open"
      class="absolute bg-surface-container"
      :style="{
        zIndex: level + 1
      }"
    >
      <template v-if="item?.children">
        <div v-for="child in item.children" :key="child.label">
          <ToolbarMenuItem :item="child" :level="level + 1" />
        </div>
      </template>
      <template v-if="item?.options">
        <div v-for="childOption in item.options" :key="childOption.label">
          <ToolbarMenuItem :item="childOption" :level="level + 1" />
        </div>
      </template>
    </div>
  </template>
</template>

<style scoped></style>
