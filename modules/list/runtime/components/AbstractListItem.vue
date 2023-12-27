<script generic="T extends AbstractListItem" lang="ts" setup>
import type { AbstractListItem } from '~/modules/list/types'

interface Props {
  item?: T
  level?: number
}

const { item, level = 0 } = defineProps<Props>()

interface SlotProps {
  item: T
  level: number
}

defineSlots<{
  default({ item, level }: SlotProps): any
}>()
</script>

<template>
  <li>
    <slot :item="<T>item" :level="level">
      {{ item }}
    </slot>
  </li>
</template>
