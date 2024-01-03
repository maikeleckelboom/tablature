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

// This helps us get the value of the option
// We can't rely on a falsy check to determine if the option is selected
// as the value could be 0
function optToValue(opt: TOption) {
  if (props.optionValue) {
    return props.optionValue(opt)
  }
  return opt
}

// This helps us get a string key of the option
// You can use a different approach here
function toKey(opt: TOption): string {
  return JSON.stringify(optToValue(opt))
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
