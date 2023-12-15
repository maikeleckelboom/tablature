<script lang="ts" setup>
import { hexFromArgb } from '@material/material-color-utilities';
import { colorsFromSchemeContent } from '~/modules/theme/runtime/utils/color';

const { $schemeContent } = useNuxtApp();

const schemeContentColors = computed(() => {
  const argbColors = colorsFromSchemeContent($schemeContent.value);
  return Object.keys(argbColors).reduce(
    (acc, key) => {
      const token = key.replace(/PaletteKeyColor/g, '');
      acc[token] = hexFromArgb(argbColors[key]);
      return acc;
    },
    {} as Record<string, string>
  );
});
</script>

<template>
  <div
    class="grid grid-cols-4 md:grid-cols-8 gap-1 overflow-hidden min-w-[180px] max-w-full w-auto"
  >
    <div
      v-for="(color, key) in schemeContentColors"
      :key="key"
      class="relative flex flex-col border border-outline-variant rounded group"
    >
      <span
        class="bg-surface-container-lowest py-2 px-4 absolute left-1/2 top-1/2 z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 rounded-2xl text-center opacity-0 scale-[0.5] group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 ease-in-out"
      >
        {{ key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) }}
      </span>
      <div :style="{ backgroundColor: color }" class="w-24 rounded aspect-video" />
    </div>
  </div>
</template>
