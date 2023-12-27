<script generic="TItem extends TNavigationListItem" lang="ts" setup>
import type { NavigationListItem as TNavigationListItem } from '~/modules/list/types'

interface Props {
  list: TItem[]
  transitionName?: string
  transitionDuration?: number
}

const {
  list,
  transitionName = 'list-item',
  transitionDuration = 400
} = defineProps<Props>()


const transitionDelay = shallowRef<number>(transitionDuration / (transitionDuration * 0.1));

const transitionTotalDuration = computed<number>(() => transitionDuration + transitionDelay.value);

watch(() => list, () => {
  transitionDelay.value = transitionDuration / (transitionDuration * 0.1);
}, { immediate: true });
</script>

<template>
  <AbstractList
    :list="list"
    :style="{
      '--transition-delay': `${transitionDelay}ms`,
      '--transition-duration': `${transitionDuration}ms`
    }"
  >
    <template #item="{ item, level, isRecursive }">
      <slot name="item" v-bind="{ item, level, isRecursive }">
        <NavigationListItem :item="item" :level="level">
          <div class="flex w-full justify-between gap-4 p-2">
            <span> {{ item.name }}</span>
            <template v-if="isRecursive">
              <Icon v-if="item.open" class="h-6 w-6" name="ic:baseline-folder" />
              <Icon v-else class="h-6 w-6" name="ic:outline-folder" />
            </template>
          </div>
          <template #tail="{ item, level }">
            <Transition :duration="transitionTotalDuration" :name="transitionName">
              <div v-show="item.open" :class="{ 'pl-4': level > 0 }">
                <AccordionList :level="level + 1" :list="<TItem[]>item.children" />
              </div>
            </Transition>
          </template>
        </NavigationListItem>
      </slot>
    </template>
  </AbstractList>
</template>

<style>
.list {
  --transition-delay: var(--transition-delay, 0.1s);
  --transition-duration: var(--transition-duration, 0.4s);

  li {
    display: grid;
    grid-template-rows: auto 0fr;

    transform: translateX(0px);
    transition-duration: var(--transition-duration);
    transition-property: grid-template-rows;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &[aria-expanded] {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 0fr;
      place-content: start;

      min-block-size: 100%;
      min-height: 0;

      > button + div {
        overflow: hidden;
        min-inline-size: 100%;
      }
    }

    &[aria-expanded='true'] {
      grid-template-rows: auto 1fr;
    }

    &[aria-expanded='false'] {
      transition-timing-function: ease-in-out;
      transition-delay: var(--transition-delay);
    }
  }

  /* List item transition */

  .list-item-enter-active ul,
  .list-item-leave-active ul {
    transition-duration: var(--transition-duration);
    transition-property: transform, opacity;
  }

  .list-item-enter-from ul,
  .list-item-leave-to ul {
    opacity: 0;
    transform: translateX(18px);
  }

  .list-item-enter-active ul {
    transition-delay:calc(var(--transition-delay * 2));
  }
}
</style>
