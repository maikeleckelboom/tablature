<script setup lang="ts">
const store = useNavigationStore()
</script>

<template>
  <div
    class="grid h-screen-svh w-screen-svw grid-cols-1 grid-rows-[auto,auto,auto,1fr] items-start justify-start md:grid-cols-[auto,1fr] md:grid-rows-[auto,1fr]"
  >
    <div class="col-start-1 row-start-1 flex size-full h-full items-center justify-start p-3">
      <slot name="top-left-corner">
        <div class="flex items-center gap-4 pt-2 md:p-0">
          <ExampleLogo3 class="size-8" />
          <p class="text-title-sm font-bold">AetherArtistry</p>
        </div>
      </slot>
    </div>
    <header class="col-span-full flex h-[46px] w-full items-center md:col-start-2">
      <slot name="header">
        <Breadcrumbs class="px-2 py-4" />
      </slot>
    </header>
    <aside
      class="scrollbar flex h-full flex-col overflow-y-auto [min-inline-size:max(160px,360px)] [scrollbar-gutter:stable] md:h-[calc(100svh-50px)]"
    >
      <slot name="aside">
        <!--        <p class="mb-2 ml-[8px] mt-12 text-title-sm font-normal text-on-surface-variant">-->
        <!--          Navigation-->
        <!--        </p>-->
        <NavigationList :list="store.list" />
      </slot>
    </aside>
    <main
      class="row-start-3 flex w-full justify-start py-8 md:row-start-auto md:h-[calc(100svh-50px)] md:py-0"
    >
      <slot></slot>
    </main>
  </div>
</template>

<style scoped></style>
