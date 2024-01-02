<script lang="ts" setup>
import {
  autoPlacement,
  autoUpdate,
  type Middleware,
  offset,
  type Placement,
  useFloating
} from '@floating-ui/vue'

const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()

const initialPlacement = ref<Placement>('bottom')

const middleware = ref<Middleware[]>([
  offset(2),
  autoPlacement({
    padding: 2
  })
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

const arrowRef = ref<HTMLElement>()

function show() {
  open.value = true
}

function hide() {
  open.value = false
}
</script>

<template>
  <button
    ref="triggerRef"
    class="p-4"
    intent="text"
    @blur="hide"
    @focus="show"
    @mouseleave="hide"
    @mouseenter="show"
  >
    Hover me to show tooltip
  </button>

  <div
    v-if="open"
    ref="tooltipRef"
    :style="floatingStyles"
    class="absolute left-0 top-0 z-50 w-40 max-w-fit rounded-md bg-surface-container-high p-4 text-center"
  >
    Hello (emoji: 👋) and another emoji: 🤖 and another: 🐶 and another: 🐱 and last one: 🐭 but not
    least: 🐹
    <div
      ref="arrowRef"
      :style="{
        left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
        top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : ''
      }"
      class="absolute h-4 w-4 rotate-45 bg-secondary"
    />
  </div>
</template>
