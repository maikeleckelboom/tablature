<script lang="ts" setup>
import InputSlider from '~/modules/theme/runtime/components/InputSlider.vue';

const { sourceColor, isDark, contrastLevel } = useThemeConfig();
</script>

<template>
  <form class="flex flex-col p-4 rounded gap-2">
    <div class="flex justify-between w-full">
      <label class="flex items-center justify-between gap-4 w-full text-label-lg" for="dark">
        <span>Dark Mode</span>
        <input id="dark" v-model="isDark" type="checkbox" />
      </label>
    </div>
    <div class="flex justify-between gap-4">
      <label class="text-label-lg" for="source">Source Color</label>
      <input id="source" v-model="sourceColor" type="color" />
    </div>
    <div class="flex justify-between gap-4">
      <InputSlider v-model.number="contrastLevel" :tick-marks="true" label="Contrast Level" max="1" min="0" step="0.1">
        <template #label="{ label }">
          <label class="text-label-lg" for="contrast-level">{{ label }}</label>
        </template>
      </InputSlider>
    </div>
  </form>
</template>
