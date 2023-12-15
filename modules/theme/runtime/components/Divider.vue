<script lang="ts" setup>
import { cva } from 'cva';

const { type = 'standard' } = defineProps<{
  type?: 'standard' | 'inset';
}>();

const divider = cva({
  base: ['border-t', 'border-outline-variant', 'my-[8px]'],
  variants: {
    type: {
      standard: 'w-full',
      inset: 'w-[calc(100%_-_32px)] ml-[16px]',
    },
    rounded: {
      true: 'rounded',
    },
  },
  defaultVariants: {
    rounded: true,
  },
});
</script>

<template>
  <div :class="divider({ type })">
    <slot />
  </div>
</template>
