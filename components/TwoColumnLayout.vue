<script lang="ts" setup>
interface Props {
  footerHeight?: string
  headerHeight?: string
  asideWidth?: string
  asideHeight?: string
}

const {
  footerHeight = '40px',
  headerHeight = '50px',
  asideWidth = '0px',
  asideHeight = 'calc(100vh - var(--h-footer) - var(--h-header))'
} = defineProps<Props>()

const slots = defineSlots<{
  header(): any
  aside(): any
  default(): any
  footer(): any
}>()
</script>

<template>
  <div data-layout="TwoColumn" class="h-svh w-svw overflow-clip">
    <header>
      <slot name="header" />
    </header>
    <aside>
      <slot name="aside" />
    </aside>
    <main>
      <slot name="default" />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
[data-layout='TwoColumn'] {
  --h-footer: v-bind(footerHeight);
  --h-header: v-bind(headerHeight);
  --w-aside: v-bind(asideWidth);
  --h-aside: calc(100svh - var(--h-footer) - var(--h-header));

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: var(--h-header) var(--h-aside) 1fr var(--h-footer);

  grid-template-areas:
    'header header'
    'main main'
    'aside aside '
    'footer footer';
  inline-size: 100svw;
  block-size: 100svh;

  @screen md {
    grid-template-columns: var(--w-aside) 1fr;
    grid-template-rows: var(--h-header) 1fr var(--h-footer);
    grid-template-areas:
      'header header '
      'aside main '
      'footer footer ';
  }

  > * {
    @apply p-3;
  }

  header {
    grid-area: header;
    @apply bg-surface-level-1;
  }

  aside {
    grid-area: aside;
    @apply scrollbar overflow-y-auto overflow-x-clip bg-surface-level-2;
  }

  main {
    grid-area: main;
    @apply scrollbar h-full overflow-x-auto overflow-y-clip bg-surface-container;
  }

  footer {
    grid-area: footer;
    @apply bg-surface-container-high;
  }
}
</style>
