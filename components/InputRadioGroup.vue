<script
  setup
  lang="ts"
  generic="TOption extends string | Record<string, unknown>, TValue = TOption"
>
const props = defineProps<{
  name: string
  label: string
  options: TOption[]
  placeholder?: string
  optionLabel: (opt: TOption) => string
  optionValue: (opt: TOption) => TValue
}>()

const model = defineModel<TValue>()

function optToValue(opt: TOption) {
  if (props.optionValue) {
    return props.optionValue(opt)
  }
  return opt
}

function toKey(opt: TOption): string {
  return slugify(optToValue(opt).toString())
}

const classes = {
  wrapper: 'flex flex-row',
  input: 'bg-surface p-2',
  label: 'p-2'
}
</script>

<template>
  <div class="flex flex-col">
    <label :for="name">{{ label }}</label>
    <div :class="classes.wrapper">
      <div v-for="opt in options" :key="toKey(opt)">
        <input
          type="radio"
          :id="`${toKey(opt)}-${name}`"
          :name="`${toKey(opt)}-${name}`"
          :value="optToValue(opt)"
          v-model="model"
          :class="classes.input"
        />
        <label :for="`${toKey(opt)}-${name}`" :class="classes.label">
          {{ optionLabel(opt) }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
