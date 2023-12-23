<script lang="ts" setup>
import { repeatingLinearGradient } from '~/modules/theme/runtime/utils/color'

const onError = (err: Error) => {
  console.error(err)
}
</script>

<template>
  <NuxtErrorBoundary @error="onError">
    <NuxtLoadingIndicator :color="repeatingLinearGradient" />
    <NuxtPage />
    <DialogWrapper />
  </NuxtErrorBoundary>
</template>
