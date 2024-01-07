<script lang="ts" setup>
import {
  autoUpdate,
  flip,
  type Middleware,
  offset,
  type Placement,
  shift,
  useFloating
} from '@floating-ui/vue'

const reference = ref<HTMLElement>()
const floating = ref<HTMLElement>()

const initialPlacement = ref<Placement>('bottom')
const middleware = ref<Middleware[]>([flip(), shift(), offset()])

const open = ref<boolean>(false)

const { floatingStyles, strategy } = useFloating(reference, floating, {
  placement: initialPlacement,
  middleware,
  whileElementsMounted: autoUpdate,
  open
})

function show() {
  open.value = true
}

function hide() {
  open.value = false
}

function getClickOutsideHandler(evt: MouseEvent) {
  if (evt.target instanceof HTMLElement) {
    if (reference.value.contains(evt.target)) {
      return
    }

    if (floating.value?.contains(evt.target)) {
      return
    }
  }

  hide()
}

onClickOutside(reference, getClickOutsideHandler)
</script>

<template>
  <button ref="reference" @click="show" class="relative size-fit">
    <slot name="trigger">Show tooltip</slot>
  </button>
  <div
    v-if="open"
    ref="floating"
    :style="floatingStyles"
    class="absolute z-50 max-h-fit max-w-xs rounded-xl bg-surface-container-high p-4 text-center"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
div {
}
</style>
