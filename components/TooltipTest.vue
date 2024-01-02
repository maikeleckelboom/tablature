<script lang="ts" setup>
import { Button } from '#components'
import {
  autoUpdate,
  flip,
  type Middleware,
  offset,
  type Placement,
  shift,
  useFloating
} from '@floating-ui/vue'

const triggerRef = ref<InstanceType<typeof Button>>()
const tooltipRef = ref<HTMLElement>()

const initialPlacement = ref<Placement>('top')
const middleware = ref<Middleware[]>([
  flip({
    padding: 2
  }),
  offset(2),
  shift()
])

const open = ref<boolean>(false)

const { floatingStyles, isPositioned, middlewareData, placement } = useFloating(
  triggerRef,
  tooltipRef,
  {
    open,
    middleware,
    placement: initialPlacement,
    whileElementsMounted: autoUpdate
  }
)

const opposedSide = computed(() => {
  if (!unref(placement)) return
  const [side] = unref(placement).split('-')
  const map = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  }
  return map[side] as Placement
})

const arrowStyles = computed(() => {
  const { arrow } = middlewareData.value
  if (!arrow) return {}
})

function show() {
  open.value = true
}

function hide() {
  open.value = false
}
</script>

<template>
  <Button
    ref="triggerRef"
    class="p-4"
    intent="text"
    @blur="hide"
    @focus="show"
    @mouseenter="show"
    @mouseleave="hide"
  >
    Hover me to show tooltip
  </Button>
  <div
    v-if="open"
    ref="tooltipRef"
    :style="floatingStyles"
    class="absolute left-0 top-0 z-50 max-h-fit max-w-xs rounded-xl bg-surface-container-high p-4 text-center"
  >
    <p>
      Hello (emoji: 👋) and another emoji: 🤖 and another: 🐶 and another: 🐱 and last one: 🐭 but
      not least: 🐹
    </p>
  </div>
</template>

<style scoped>
div {
}
</style>
