<script lang="ts" setup>
import { tv } from 'tailwind-variants'
import type { ButtonProps } from '../../../button/types'

const props = defineProps<Partial<ButtonProps>>()

const button = tv({
  base: [
    'flex',
    'items-center',
    'justify-center',
    'shrink-0',
    'relative',
    'overflow-hidden',
    'label-text:text-ellipsis',
    'label-text:capitalize',
    'label-text:shrink-0',
    'icon:shrink-0',

    // Before
    'before:z-0',
    'before:opacity-0',
    'before:content',
    'before:absolute',
    'before:inset-0',
    'before:bg-current',
    'before:pointer-events-none',
    // Hover, active, focus and focus-visible
    'hover:before:opacity-[0.08]',
    'hover:before:active:opacity-[0.18]',
    'active:before:opacity-[0.16]',
    'border',
    'border-transparent',
    'outline-none',
    'focus-visible:before:opacity-[0.12]'
  ],
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-fit'
    },
    disabled: {
      true: [
        'bg-surface-container/20',
        'opacity-50',
        'text-on-surface-variant/50',
        'cursor-not-allowed',
        'pointer-events-none'
      ]
    },
    intent: {
      elevated: [
        'bg-surface-level-2',
        'text-primary',
        'transition-shadow',
        'shadow-sm',
        'shadow-shadow/50',
        'hover:shadow-shadow/10',
        'active:shadow-shadow/20'
      ],
      filled: ['bg-primary', 'text-on-primary'],
      tonal: ['bg-secondary-container', 'text-on-secondary-container'],
      outlined: ['bg-transparent', 'text-primary', 'border', 'border-outline-variant'],
      text: ['bg-transparent', 'label-text:text-primary', 'text-primary'],
      icon: [
        'bg-transparent',
        'text-primary',
        'label-text:text-primary',
        'icon:text-on-surface',
        'icon:group-hover:text-secondary',
        'icon:active:text-secondary',
        'aspect-square'
      ]
    },
    size: {
      sm: [
        'px-5',
        'label-text:text-label-sm',
        'h-[38px]',
        'rounded-[24px]',
        'icon:w-[24px]',
        'icon:h-[24px]'
      ],
      md: [
        'label-text:text-label-lg font-normal',
        'py-5',
        'px-5',
        'h-[42px]',
        'rounded-[24px]',
        'icon:w-[24px]',
        'icon:h-[24px]'
      ],
      lg: [
        'label-text:text-label-lg',
        'p-5',
        'h-[56px]',
        'rounded-[28px]',
        'icon:w-[24px]',
        'icon:h-[24px]'
      ]
    }
  },
  compoundVariants: [
    {
      intent: 'tonal',
      size: 'md',
      class: 'uppercase'
    }
  ],
  defaultVariants: {
    intent: 'filled',
    size: 'md',
    disabled: false,
    fullWidth: false,
    icon: undefined
  }
})
</script>

<template>
  <button :class="button(props)" type="button">
    <span :class="{ 'label-text': intent !== 'icon' }">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="icon || $slots.icon?.()?.length" class="ml-2">
      <slot name="icon">
        <Icon :name="icon" />
      </slot>
    </span>
  </button>
</template>
