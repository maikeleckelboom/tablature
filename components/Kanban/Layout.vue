<script lang="ts" setup>
import type { MenuItem } from '~/types'

const menu = ref<MenuItem[]>([
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Boards',
    href: '/boards'
  },
  {
    name: 'Boards/1',
    href: '/boards/1'
  },
  {
    name: 'About',
    href: '/about'
  }
])
</script>

<template>
  <TwoColumnLayout>
    <template #header>
      <slot name="header" />
    </template>
    <template #aside>
      <VMenu :menu="menu" />
      <div class="my-4 h-0.5 w-full bg-outline-variant" />
      <slot name="aside" />
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </TwoColumnLayout>
</template>
