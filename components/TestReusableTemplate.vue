<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core'

const [DefineBar, ReuseBar] = createReusableTemplate<{ items: string[] }>()
</script>

<template>
  <DefineBar v-slot="{ items }">
    <div>{{ items.map((item) => item.toUpperCase()).join(' ') }}</div>
  </DefineBar>

  <ReuseBar :items="['hello', 'world']" />
</template>
