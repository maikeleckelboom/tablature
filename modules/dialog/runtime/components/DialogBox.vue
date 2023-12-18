<script lang="ts" setup>
import type { DialogProps } from '../../types'

type DialogIntent = Pick<DialogProps, 'intent'>['intent']

const props = defineProps<{
  intent?: DialogIntent
}>()

const slots = defineSlots<{
  header(props: { intent: DialogIntent }): any
  body(props: { intent: DialogIntent }): any
  footer(props: { intent: DialogIntent }): any
}>()
</script>

<template>
  <dialog :data-intent="intent">
    <header>
      <slot :intent="intent" name="header" />
    </header>
    <article>
      <slot :intent="intent" name="body" />
    </article>
    <footer>
      <slot :intent="intent" name="footer" />
    </footer>
  </dialog>
</template>

<style scoped>
dialog {
  @apply bg-surface-container-highest text-on-surface;

  display: flex;
  flex-direction: column;
  inset: 0;
  margin: auto;
  position: fixed;
  z-index: 50;

  max-block-size: 80vh;

  @supports (max-block-size: 80svh) {
    max-block-size: 80svh;
  }

  max-inline-size: min(calc(100% - 48px), 560px);

  @supports (max-block-size: 80svh) {
    max-block-size: 80svh;
  }

  > :where(header, article, footer) {
    padding-inline: 24px;
  }

  > header {
    padding-block-start: 24px;

    @apply text-headline-sm;
  }

  > article {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-block: 16px 8px;
  }

  > footer {
    column-gap: 8px;
    display: flex;
    justify-content: flex-end;
    padding-block: 16px 24px;
  }

  &[data-intent='basic'] {
    border-radius: 28px;
    min-inline-size: min(280px, calc(100% - 48px));
  }

  &[data-intent='full-screen'] {
    border-radius: 0;
    min-block-size: 100vh;
    min-inline-size: 100vw;

    @supports (min-block-size: 100svh) {
      min-block-size: 100svh;
    }

    @supports (min-inline-size: 100svw) {
      min-inline-size: 100svw;
    }
  }
}
</style>
