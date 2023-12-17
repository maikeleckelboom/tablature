<script lang="ts" setup>
import type { ButtonProps } from '../types'

const props = defineProps<Partial<ButtonProps>>()
</script>

<template>
  <button type="button">
    <slot />
  </button>
</template>
