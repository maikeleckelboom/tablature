<script generic="TItem extends NavListItem" lang="ts" setup>
import type { NavigationListItem as NavListItem } from '~/modules/list/types'

interface Props {
  list: TItem[]
}

const { list } = defineProps<Props>()

type VueTransition = {
  name: string
  mode: 'default' | 'out-in' | 'in-out'
  duration?: number
}

const transitionAttrs = shallowRef<VueTransition>({
  name: 'fade',
  mode: 'out-in'
})
</script>

<template>
  <AbstractList :list="list" data-component="NavigationList">
    <template #item="{ item, level, isRecursive }">
      <slot name="item" v-bind="{ item, level, isRecursive }">
        <NavigationListItem :item="item" :level="level">
          <span>{{ item.name }}</span>
          <Icon
            v-if="isRecursive"
            :class="item.open ? 'text-on-surface' : 'text-outline-variant'"
            :name="`ic:outline-unfold-more`"
            class="h-4 w-4"
          />
          <template #tail="{ item, level }">
            <Transition name="list-item" :duration="550">
              <div v-show="item.open" class="outer">
                <NavigationList :level="level + 1" :list="<TItem[]>item.children" class="inner" />
              </div>
            </Transition>
          </template>
        </NavigationListItem>
      </slot>
    </template>
  </AbstractList>
</template>

<style>
[data-component='NavigationList'] {
  li {
    display: grid;
    grid-template-rows: auto 0fr;

    transform: translateX(0px);
    transition-duration: 0.4s;
    transition-property: grid-template-rows;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &[aria-expanded] {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 0fr;
      justify-items: start;

      min-block-size: 100%;
      min-height: 0;

      div {
        overflow: hidden;
      }
    }

    &[aria-expanded='true'] {
      grid-template-rows: auto 1fr;
    }
  }
}

.list-item-leave-active {
  transition-delay: 0.2s;

  ul {
    transition-delay: 0s;
  }
}

.list-item-enter-active ul,
.list-item-leave-active ul {
  transition-duration: 0.4s;
  transition-property: transform, opacity;
}

.list-item-enter-from ul,
.list-item-leave-to ul {
  opacity: 0;
  transform: translateX(18px);
}

.list-item-enter-active ul {
  transition-delay: 0.1s;
}
</style>
