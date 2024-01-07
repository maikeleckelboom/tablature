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
  return slugify(JSON.stringify(optToValue(opt)))
}
</script>
<template>
  <div class="flex flex-col">
    <label :for="name">{{ label }}</label>
    <select :id="name" :name="name" v-model="model" class="bg-surface p-2">
      <option value="">
        {{ placeholder || 'Select an option' }}
      </option>
      <option v-for="opt in options" :key="toKey(opt)" :value="optToValue(opt)">
        {{ optionLabel(opt) }}
      </option>
    </select>
  </div>
</template>
