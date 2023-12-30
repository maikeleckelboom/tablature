<script generic="TMenuItem extends MenuItem" lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

interface Props {
  menu: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
  menu: () => []
})

const rootElement = ref<HTMLElement>()

const emit = defineEmits<{
  (ev: 'click-outside'): void
}>()

onClickOutside(
  rootElement,
  () => {
    emit('click-outside')
  },
  { ignore: ['.menu'] }
)

function isRecursive(item: MenuItem): item is MenuItem & { children: MenuItem[] } {
  return item.children !== undefined
}

const nextOpenCoords = ref<{ x: number; y: number }>({ x: 0, y: 0 })

function openMenu(evt: MouseEvent, item: MenuItem) {
  if (isRecursive(item)) {
    if (!evt?.currentTarget) return
    const clickTargetRect = (evt.currentTarget as HTMLElement).getBoundingClientRect()

    nextOpenCoords.value = {
      x: clickTargetRect.right,
      y: clickTargetRect.top
    }

    if (item.open) {
      props.menu.forEach((item) => {
        item.open = item === item ? !item.open : false
      })
    }

    item.open = !item.open
  }
}
</script>

<template>
  <menu ref="rootElement" class="menu absolute bg-surface">
    <li
      v-for="(item, i) in menu"
      :key="item.name"
      class="relative z-50 flex h-[38px] w-full cursor-pointer items-center border-x-thin border-surface-variant bg-surface px-4 text-label-md shadow-2xl first:rounded-t first:border-t-thin last:rounded-b last:border-b-thin hover:bg-surface-level-1 active:bg-surface-level-2"
      @click="openMenu($event, item)"
    >
      <Icon
        v-if="item.leadingIcon"
        :name="item.leadingIcon"
        class="mr-4 size-[16px] text-outline"
      />

      <span>{{ item.name }}</span>

      <Icon v-if="item.trailingIcon" :name="item.trailingIcon" class="size-[22px] text-primary" />

      <span v-if="item.trailingText" class="ml-4 text-primary">{{ item.trailingText }}</span>

      <template v-if="isRecursive(item)">
        <span class="ml-auto">
          <Icon :name="`ic:round-arrow-${item.open ? 'left' : 'right'}`" class="ml-4 size-4" />
        </span>

        <Teleport to="body">
          <Transition name="fade-in-up">
            <ContextMenu
              v-if="item.open"
              :menu="item.children"
              :style="{
                top: nextOpenCoords.y + 'px',
                left: nextOpenCoords.x + 'px'
              }"
              @click-outside="item.open = false"
            />
          </Transition>
        </Teleport>
      </template>
    </li>
  </menu>
</template>

<style scoped></style>
