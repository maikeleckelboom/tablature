<script setup lang="ts">
const store = useNavigationStore()

const isColorMenuOpen = ref<boolean>(false)
</script>

<template>
  <div
    class="h-screen-svh w-screen-svw grid grid-cols-1 grid-rows-[auto,auto,auto,1fr] items-start justify-start md:grid-cols-[minmax(100px,min(360px,100%)),1fr] md:grid-rows-[auto,1fr]"
  >
    <div class="col-start-1 row-start-1 flex size-full h-full items-center justify-start p-3">
      <slot name="top-left-corner">
        <div class="flex items-center gap-4 pt-2 md:p-0">
          <Logo class="size-8" />
          <p class="text-title-sm font-bold">AetherArtistry</p>
        </div>
      </slot>
    </div>
    <header class="col-span-full flex h-[46px] w-full items-center md:col-start-2">
      <slot name="header">
        <Breadcrumbs class="p-4" />
      </slot>
    </header>
    <aside
      class="scrollbar flex h-full flex-col overflow-y-auto [min-inline-size:min(160px,100%)] [scrollbar-gutter:stable] md:h-[calc(100svh-50px)]"
    >
      <slot name="aside">
        <NavigationList
          :list="store.list"
          class="scrollbar h-full overflow-y-auto p-4 [scrollbar-gutter:stable]"
        />

        <div class="flex w-full max-w-full flex-col gap-4 p-4 pt-8">
          <Button size="sm" @click="isColorMenuOpen = !isColorMenuOpen">
            <Icon name="ic:round-color-lens" class="mr-2" />
            <span>Appearance</span>
          </Button>
          <template v-if="isColorMenuOpen">
            <ColorMode />
            <KeyColorPickers />
          </template>
        </div>
      </slot>
    </aside>
    <main
      class="row-start-3 flex w-full justify-start overflow-clip md:row-start-auto md:h-[calc(100svh-50px)]"
    >
      <slot></slot>
    </main>
  </div>
</template>

<style scoped></style>
