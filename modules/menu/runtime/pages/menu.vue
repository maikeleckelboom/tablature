<script lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

const isVisible = ref<boolean>(false)
const offset = ref<{ x: number; y: number }>({ x: 12, y: 12 })
const clickPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const store = useNavigationStore()

const indexClicked = ref<number>(-1)

function showContextMenu({ clientX, clientY }: MouseEvent, item: MenuItem) {
  if (item.children === undefined) return
  indexClicked.value = store.toolbarMenu.indexOf(item)
  const { x: offsetX, y: offsetY } = offset.value
  clickPosition.value = { x: clientX + offsetX, y: clientY + offsetY }
  isVisible.value = !isVisible.value
}
</script>

<template>
  <ColumnLayout>
    <template #header>
      <Breadcrumbs class="px-2 py-4" />
    </template>
    <div class="mx-auto w-full max-w-4xl">
      <div class="ml-auto flex w-fit px-2">
        <div class="flex flex-row">
          <template v-for="item in store.toolbarMenu" :key="item.name">
            <button
              class="text-balance break-words bg-surface-container px-3 py-1.5 text-title-sm outline-thin outline-inverse-primary first:rounded-l-md last:rounded-r-md hover:bg-surface-container-high focus-visible:z-10 active:bg-surface-container-highest"
              @click.prevent="showContextMenu($event, item)"
              @click.prevent.right="showContextMenu($event, item)"
            >
              {{ item.name }}
            </button>
          </template>
        </div>

        <Teleport to="body">
          <Transition name="fade-in-up">
            <ContextMenu
              v-if="isVisible && indexClicked !== -1"
              :menu="store.toolbarMenu[indexClicked].children"
              @click-outside="isVisible = false"
              :style="{
                top: clickPosition.y + 'px',
                left: clickPosition.x + 'px'
              }"
            />
          </Transition>
        </Teleport>
      </div>
    </div>
  </ColumnLayout>
</template>

<style scoped></style>
