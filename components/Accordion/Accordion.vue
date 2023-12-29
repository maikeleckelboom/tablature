<script generic="TItem extends AccordionItem" lang="ts" setup>
import type { AccordionItem } from '~/types'

const { list, level = 1 } = defineProps<{
  list: TItem[]
  level?: number
}>()

const accordionRef = ref<HTMLElement>()

function getHeadingComponent(level: number) {
  return `h${level + 1}`
}
</script>

<template>
  <div ref="accordionRef" class="accordion">
    <div v-for="(item, index) in list" :key="index" class="accordion-item">
      <Component :is="getHeadingComponent(level)" class="accordion-header">
        <button
          :id="`trigger-${level}-${index}`"
          :aria-expanded="item.open"
          class="accordion-trigger"
          @click="item.open = !item.open"
        >
          {{ item.title || item.name }}

          <template v-if="item?.content">
            <Icon v-if="item.open" class="accordion-icon" name="ic:baseline-unfold-more" />
            <Icon v-else class="accordion-icon" name="ic:baseline-unfold-less" />
          </template>
        </button>
      </Component>
      <Transition name="accordion-list-item" :duration="400">
        <div
          v-show="item.open"
          :aria-controls="`trigger-${level}-${index}-panel`"
          :aria-labelledby="`trigger-${level}-${index}`"
          class="accordion-content"
          role="region"
        >
          <div class="size-full">
            {{ item.content }}
            <Accordion v-if="item?.children" :level="level + 1" :list="<TItem[]>item.children" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style>
.accordion {
  @apply flex flex-col;
}

.accordion-item {
  @apply rounded-sm border border-primary-container;
}

.accordion-header {
  @apply flex items-center justify-between;
}

.accordion-trigger {
  @apply flex w-full items-center justify-between rounded-sm p-4 hover:bg-primary-container/10 active:bg-primary-container/20;
}

.accordion-icon {
  @apply size-4;
}

.accordion-content {
  @apply flex flex-col gap-3 rounded-sm border border-primary-container/50 px-4;
}

.accordion {
  --transition-delay: var(--transition-delay, 100ms);
  --transition-duration: var(--transition-duration, 400ms);

  .accordion-item {
    display: grid;
    grid-template-rows: auto 0fr;

    transform: translateX(0px);
    transition-duration: var(--transition-duration);
    transition-property: grid-template-rows;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &:has([aria-expanded]) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 0fr;
      place-content: start;

      min-block-size: 100%;
      min-height: 0;

      .accordion-content {
        overflow: hidden;
        min-inline-size: 100%;
      }
    }

    &:has([aria-expanded='true']) {
      grid-template-rows: auto 1fr;
    }

    &:has([aria-expanded='false']) {
      transition-timing-function: ease-in-out;
      transition-delay: var(--transition-delay);
    }
  }

  .accordion-list-item-enter-active .accordion-content > div,
  .accordion-list-item-leave-active .accordion-content > div {
    transition-duration: var(--transition-duration);
    transition-property: transform, opacity;
  }

  .accordion-list-item-enter-from .accordion-content > div,
  .accordion-list-item-leave-to .accordion-content > div {
    opacity: 0;
    transform: translateX(1em);
  }

  .accordion-list-item-enter-active .accordion-content > div {
    transition-delay: calc(var(--transition-delay) * 2);
  }
}
</style>
