<script setup lang="ts">
const props = defineProps<{
  shortcuts: string[]
}>()
</script>

<template>
  <span class="text-sm">
    <span v-for="(shortcut, index) in shortcuts" :key="index">
      <kbd>{{ shortcut }}</kbd>
      <template v-if="index < shortcuts.length - 1">+</template>
    </span>
  </span>
</template>

<style scoped></style>
