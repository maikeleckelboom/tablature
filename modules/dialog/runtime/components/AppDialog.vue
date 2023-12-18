<script lang="ts" setup>
import type { Slots } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'
import { useStack } from '~/modules/dialog/runtime/composables/useStack'
import { and } from '@vueuse/math'
import { closeDialog } from '~/modules/dialog/runtime/plugin'
import type { DialogProps } from '~/modules/dialog/types'
import { useFocusTrap } from '@vueuse/integrations'

const props = withDefaults(defineProps<DialogProps>(), {
  intent: 'basic',
  responsive: false,
  closeAffordance: true,
  actions: () => []
})

const slots = defineSlots<{
  default(): any
  icon(): any
  headline(): any
  actions(): any
  'fullscreen-action'(): any
}>()

function getCloseAnimation() {
  console.log('getCloseAnimation')
}

function getOpenAnimation() {
  console.log('getOpenAnimation')
}

const variants = tv({
  slots: {
    base: [
      'fixed',
      'm-auto',
      'inset-0',
      'p-0',
      'z-50',
      'bg-transparent',
      'flex',
      'flex-col',
      'justify-start',
      'items-center',
      'text-on-surface',
      'rounded-[28px]',
      'origin-top',
      'before:absolute',
      'before:inset-0',
      'before:z-[-1]',
      'before:shadow-2xl',
      'before:body-[""]',
      'before:origin-top'
    ],
    header: ['w-full bg-surface-container-highest'],
    icon: ['text-secondary icon:h-[24px] icon:w-[24px] mb-[16px]'],
    headline: ['text-headline-sm [text-wrap:balance]'],
    body: [
      'flex',
      'flex-1',
      'justify-start',
      'w-full',
      'px-[24px]',
      'pb-[8px]',
      'pt-[16px]',
      'text-left',
      'text-on-surface-variant',
      'overflow-y-auto',
      'overscroll-contain',
      'scrollbar',
      'scrollbar-thin'
    ],
    actions: ['w-full flex flex-wrap justify-end p-[8px_24px_24px] gap-[8px]'],
    wrapper: ['flex flex-col w-full']
  },
  variants: {
    'has:headline': {
      false: {
        body: 'pt-[24px]'
      }
    },
    'has:icon': {
      false: {
        body: 'pt-[24px]'
      },
      true: {
        headline: 'text-center'
      }
    },
    intent: {
      basic: {
        base: [
          '[max-inline-size:min(calc(100%-48px),560px)]',
          '[max-block-size:80vh]',
          'before:rounded-4xl',
          'before:bg-surface-container-highest'
        ],
        header: 'flex flex-col justify-center items-center pt-[24px] px-[24px] rounded-t-4xl',
        actions: 'rounded-b-4xl',
        wrapper: 'min-w-[280px] max-h-[50ch] max-w-[min(560px,100%)] w-full'
      },
      'full-screen': {
        base: 'h-screen w-screen supports-svh:h-[100svh] supports-svw:w-[100svw] left-0 top-0 m-0 rounded-none bg-surface before:bg-surface',
        icon: 'hidden',
        header:
          'grid grid-cols-[auto,1fr,auto] pl-[16px] pr-[16px] py-[6px] gap-[12px] min-h-[56px] items-center',
        headline: 'text-title-lg md:text-headline-sm leading-tighter line-clamp-2',
        body: 'px-[24px]',
        wrapper: 'max-h-[100dvh] max-w-[100dvw] w-full'
      }
    },
    divider: {
      top: {
        header: 'border-b border-outline-variant'
      },
      bottom: {
        actions: 'border-t border-outline-variant'
      },
      both: {
        header: 'border-b border-outline-variant',
        actions: 'border-t border-outline-variant'
      }
    }
  },
  /** Variants based on a combination of previously defined variants */
  compoundVariants: [
    {
      'has:icon': false,
      'has:headline': false,
      intent: 'basic',
      class: {
        body: 'pt-[24px]',
        actions: 'pb-[16px]'
      }
    },
    {
      'has:icon': true,
      'has:headline': true,
      intent: 'basic',
      class: {
        headline: 'text-center'
      }
    },
    {
      headline: false,
      intent: 'full-screen',
      class: {
        header: '[&_:nth-child(2)]:flex [&_:nth-child(2)]:justify-end'
      }
    },

    // for when headline is false and divider is bottom or both, then actions padding-bottom is 8px, else 16px
    {
      headline: false,
      divider: ['bottom', 'both'],
      class: {
        actions: 'pb-[8px]'
      }
    },
    /** headline is false and divider is either both or bottom */
    {
      headline: false,
      divider: ['both', 'bottom'],
      class: {
        body: 'pb-[16px]'
      }
    },
    /** headline false, icon false, intent basic */
    {
      headline: false,
      icon: false,
      intent: 'basic',
      class: {
        header: 'hidden',
        body: 'pt-[24px]'
      }
    },
    /** headline, icon and closeAffordance are false  */
    {
      intent: 'full-screen',
      headline: false,
      icon: false,
      closeAffordance: false,
      class: {
        header: 'hidden'
      }
    },
    /** Close affordance, full-screen */
    {
      intent: 'full-screen',
      closeAffordance: false,
      class: {
        header: 'grid grid-cols-[1fr,auto] '
      }
    },
    /** Intent - basic | Divider - (top, both) */
    {
      intent: 'basic',
      divider: ['top', 'both'],
      class: {
        body: 'pt-[12px] pb-[12px]',
        header: 'pb-[16px]'
      }
    },
    /** Intent - full-screen | Divider - (bottom, both) */
    {
      intent: 'full-screen',
      divider: ['bottom', 'both'],
      class: {
        actions: 'pb-[8px] ',
        body: 'py-[8px]'
      }
    },
    /** Intent - basic | Icon - false */
    {
      intent: 'basic',
      icon: false,
      class: {
        header: 'items-start px-[24px]',
        icon: 'hidden'
      }
    },
    {
      divider: ['both', 'bottom'],
      class: {
        body: 'grid',
        actions: 'pt-[12px] pb-[12px]'
      }
    }
  ]
})

const hasSlot = (name: keyof Slots): boolean => !!slots[name]?.().length
const hasIcon = () => hasSlot('icon') || !!(props.icon && props.icon.length)
const hasHeadline = () => hasSlot('headline') || (props.headline && props.headline !== '')
const hasActions = () => hasSlot('actions') || props.actions?.length

const viewport = useViewport()

const intent = computed(() => {
  if (props.responsive) {
    return viewport.isGreaterOrEquals('md') ? 'basic' : 'full-screen'
  }
  return props.intent
})

const dialogElement = ref<HTMLDialogElement>()

const bodyRef = ref<HTMLElement>()

type DialogVariants = VariantProps<typeof variants>

const vProps = computed<DialogVariants>(() => ({
  intent: intent.value,
  divider: props.divider,
  'has:icon': hasIcon(),
  'has:headline': hasHeadline(),
  'has:actions': hasActions()
}))

function initialFocus() {
  const focusable = Array.from(
    dialogElement.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  )
  return <HTMLElement>(
    (focusable.find((el) => ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) ??
      focusable.at(0))
  )
}

const { deactivate } = useFocusTrap(dialogElement, {
  immediate: true,
  returnFocusOnDeactivate: true,
  allowOutsideClick: true,
  initialFocus
})

const { isTop } = useStack()

onBeforeMount(() => {
  getOpenAnimation()
})

onClickOutside(dialogElement, async () => {
  if (!isTop.value) return
  await closeDialog()
})

const { escape } = useMagicKeys()
whenever(and(escape, isTop), closeDialog)

const {
  header: headerV,
  base: baseV,
  icon: iconV,
  headline: headlineV,
  body: bodyV,
  actions: actionsV,
  wrapper: wrapperV
} = variants(vProps.value)

const id = Math.random().toString(36).substring(2, 15)
const headlineId = `dialog-h-${id}` as const
const textId = `dialog-d-${id}` as const

const accessibilityAttrs = shallowReactive({
  'aria-labelledby': `dialog-headline-${id}`,
  'aria-describedby': `dialog-desc-${id}`,
  role: intent.value === 'basic' ? 'alertdialog' : 'dialog'
})
</script>

<template>
  <dialog ref="dialogElement" :class="baseV(vProps)" open v-bind="accessibilityAttrs">
    <div ref="bodyRef" :class="wrapperV(vProps)">
      <header v-if="hasHeadline() || hasIcon()" ref="header" :class="headerV(vProps)">
        <div v-if="hasIcon" :class="iconV(vProps)">
          <slot name="icon">
            <Icon v-if="icon" :name="icon" />
          </slot>
        </div>
        <div v-if="closeAffordance && intent === 'full-screen'">
          <Button intent="icon" size="sm" @click="closeDialog">
            <Icon name="ic:round-close" />
          </Button>
        </div>
        <h1 v-if="hasHeadline" :id="headlineId" :class="headlineV(vProps)">
          <slot name="headline">{{ props.headline }}</slot>
        </h1>
      </header>
      <article ref="body" :class="bodyV(vProps)">
        <slot>
          <p :id="textId">{{ props.text }}</p>
        </slot>
      </article>
      <footer ref="footer" :class="actionsV(vProps)">
        <slot :actions="actions" name="actions">
          <slot
            v-for="action in actions"
            :key="action.label"
            :action="action"
            :name="`action-${action.label}`"
          >
            <Button intent="text" @click="action.onClick">
              {{ action.label }}
            </Button>
          </slot>
        </slot>
      </footer>
    </div>
  </dialog>
</template>

<style scoped></style>
