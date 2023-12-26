<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ items: string[] }>()
</script>

<template>
  <DefineTemplate v-slot="{ items }">
    <div>{{ items.map((item) => item.toUpperCase()).join(' ') }}</div>
  </DefineTemplate>

  <ReuseTemplate :items="['hello', 'world']" />
</template>
