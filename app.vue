<script lang="ts" setup>
import { repeatingLinearGradient } from '~/modules/theme/runtime/utils/color'

useHead({
  title: 'Tablature',
  meta: [
    {
      id: 'description',
      name: 'description',
      content:
        'Tablature is a playground for me to experiment with new technologies and design patterns.'
    }
  ]
})

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
