<script lang="ts" setup>
import { Balloon } from '#components'

const slots = defineSlots<{
  default(): void
}>()

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1
})

const modelValue = defineModel<number>()

const progress = computed(() => {
  const { min, max, modelValue } = props
  return ((modelValue - min) / (max - min)) * 100
})

const balloonRef = ref<InstanceType<typeof Balloon>>()

const balloonLeft = computed(() => {
  if (!balloonRef.value) return
  // const target = unrefElement(balloonRef) as HTMLElement
  return progress.value * 0.01 * 100
})
</script>

<template>
  <div ref="root" class="relative">
    <Balloon
      ref="balloonRef"
      :style="{ left: `${balloonLeft}px` }"
      class="absolute left-0 top-0 -translate-y-[135%] transform"
    >
      {{ modelValue }}
    </Balloon>
    <input
      type="range"
      v-model.number="modelValue"
      class="input-slider"
      :min="min"
      :max="max"
      :step="step"
    />
  </div>
</template>

<style scoped>
.input-slider {
}
</style>
