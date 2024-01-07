<script setup lang="ts">
import { flip, shift, offset, type Placement, useFloating, autoUpdate } from '@floating-ui/vue'

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: Placement
    children?: {
      label?: string
      content?: string
      placement?: Placement
    }[]
  }>(),
  {
    placement: 'bottom'
  }
)

const referenceRef = ref<HTMLElement>()
const floatingRef = ref<HTMLElement>()

const open = ref<boolean>(false)

function show() {
  open.value = true
}

function hide() {
  open.value = false
}

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: props.placement,
  middleware: [flip(), shift({ padding: 4 }), offset(4)],
  whileElementsMounted: autoUpdate,
  open
})

function onHide() {
  setTimeout(() => {
    if (floatingRef.value?.contains(document.activeElement)) {
      return
    }

    hide()
  }, 100)
}
</script>

<template>
  <div ref="referenceRef" class="inline-block" @click="open ? hide() : show()">
    <slot />
  </div>
  <Teleport to="body">
    <div
      ref="floatingRef"
      class="absolute left-0 top-0 z-50"
      :style="floatingStyles"
      :class="{
        hidden: !open
      }"
    >
      <slot name="content" :styles="floatingStyles" :open="open">
        {{ content }}
      </slot>
    </div>
  </Teleport>
</template>

<style scoped></style>
