<script setup lang="ts">
import { hexFromArgb } from '@material/material-color-utilities'

const { $schemeContent } = useNuxtApp()

const accentColor = computed(() => {
  return hexFromArgb($schemeContent.value.sourceColorArgb)
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    class="min-size-8"
    xml:space="preserve"
    viewBox="0 27.08 600 545.83"
  >
    <path
      :fill="`rgb(var(--on-secondary-container-rgb))`"
      d="M564.054,195.714l-23.732-31.748L309.653,359.686v-81.363L134.3,414.396l-71.541,6.222    V376.52l288.979-202.007v95.392l163.048-140.099l-22.921-30.663L600,91.53L564.054,195.714z"
    />
    <path
      :fill="`rgb(var(--primary-rgb))`"
      d="M313.027,442.319v44.65c72.912-3.255,130.584,18.644,130.584,18.644 c-190.885,10.767-318.432,67.303-318.432,67.303c38.651-42.946,83.481-65.901,127.083-77.085l6.596-48.148L0,473.309V27.085    l500.58,49.557l-44.234,37.282L62.76,74.163v346.455l397.534-34.546V264.417l40.469-31.476v190.792L313.027,442.319z"
    />
  </svg>
</template>

<style scoped></style>
