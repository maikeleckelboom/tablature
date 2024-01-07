<script lang="ts" setup>
import { ref } from 'vue'
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/vue'

type Item = {
  label: string
  open: boolean
  children?: Item[]
  options?: (Item & { selected?: boolean })[]
}

const props = withDefaults(
  defineProps<{
    item: Item
    level?: number
  }>(),
  {
    level: 0
  }
)

const reference = ref(null)
const floating = ref(null)

const { floatingStyles, update, placement } = useFloating(reference, floating, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [flip(), shift()]
})

function handleClick(ev: MouseEvent) {
  if (ev.target !== ev.currentTarget) return

  const rect = (ev.currentTarget as HTMLElement)?.getBoundingClientRect()

  reference.value = {
    getBoundingClientRect() {
      return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: props.level === 0 ? rect.left : rect.right,
        right: rect.right - rect.width,
        bottom: rect.bottom + rect.height
      }
    }
  }
}

const { width, height } = useWindowSize()
const { x: scrollX, y: scrollY } = useWindowScroll()
watch(
  [width, height, scrollX, scrollY],
  () => {
    update()
    console.log('update')
  },
  { immediate: true }
)

watch(placement, (placementValue) => {
  console.log('placement', placementValue)
})
</script>

<template>
  <button
    @click="handleClick"
    v-bind="$attrs"
    class="flex h-[48px] w-full max-w-[240px] flex-row items-center border-thin border-outline-variant/50 bg-surface px-3 py-1.5 drop-shadow-2xl"
  >
    {{ props.item.label }}
    <Icon
      v-if="props.item?.children"
      class="ml-2 size-4"
      :class="{
        'rotate-180': props.item.open
      }"
      name="ic:baseline-arrow-drop-down"
    />
  </button>
  <Teleport v-if="reference" to="body">
    <ul
      ref="floating"
      class="flex w-[220px] flex-col"
      :style="{
        ...floatingStyles,
        zIndex: Number(level) + 100
      }"
    >
      <li v-if="props.item?.children">
        <FloatingItem
          v-for="child in props.item.children"
          :key="child.label"
          :item="child"
          :level="level + 1"
        />
      </li>
    </ul>
  </Teleport>
</template>
