<script setup lang="ts">
const store = useNavigationStore()
</script>

<template>
  <div
    class="grid h-screen-svh w-screen-svw grid-cols-1 grid-rows-[auto,auto,auto,1fr] flex-nowrap items-start justify-start md:grid-cols-[auto,1fr] md:grid-rows-[auto,1fr]"
  >
    <div class="col-start-1 row-start-1 flex size-full h-full items-center justify-start p-3">
      <slot name="top-left-corner">
        <div class="flex items-center gap-4 pt-2 md:p-0">
          <ExampleLogo3 class="size-8" />
          <p class="text-title-sm font-bold">AetherArtistry</p>
        </div>
      </slot>
    </div>
    <header class="col-span-full flex w-full items-center md:col-start-2">
      <slot name="header">
        <Breadcrumbs class="px-2 py-4" />
      </slot>
    </header>
    <aside
      class="scrollbar grid h-full overflow-y-auto pb-8 [min-block-size:100%] [min-inline-size:max(160px,360px)] [scrollbar-gutter:stable] md:py-0"
    >
      <slot name="aside">
        <NavigationList :list="store.list" />
      </slot>
    </aside>
    <main class="flex min-h-full w-full justify-start py-8 [min-block-size:100%] md:py-0">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped></style>
