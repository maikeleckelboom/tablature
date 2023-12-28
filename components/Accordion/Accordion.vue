<script generic="TItem extends AccordionItem" lang="ts" setup>
import type { AccordionItem } from '~/types'

const { list, level = 0 } = defineProps<{
  list: TItem[]
  level?: number
}>()
</script>

<template>
  <div class="accordion">
    <div v-for="(item, index) in list" :key="index" class="accordion-item">
      <h3 class="accordion-header">
        <button
          :id="`trigger-${level}-${index}`"
          :aria-expanded="item.expanded"
          class="accordion-trigger"
          @click="item.expanded = !item.expanded"
        >
          {{ item?.title || item.value }}

          <template v-if="item?.content">
            <Icon v-if="item.expanded" class="accordion-icon" name="ic:baseline-unfold-more" />
            <Icon v-else class="accordion-icon" name="ic:baseline-unfold-less" />
          </template>
        </button>
      </h3>
      <Transition name="accordion-item">
        <div
          v-show="item.expanded"
          :aria-labelledby="`trigger-${level}-${index}`"
          class="accordion-content"
          role="region"
        >
          <p>{{ item?.content }}</p>
          <template v-if="item?.children">
            <Accordion :level="level + 1" :list="<TItem[]>item.children" />
          </template>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  @apply flex flex-col;
}

.accordion-item {
  @apply grid rounded-sm border border-primary-container;
}

.accordion-header {
  @apply flex items-center justify-between;
}

.accordion-trigger {
  @apply flex w-full items-center justify-between rounded-sm p-2.5 hover:bg-primary-container/10 active:bg-primary-container/20;
}

.accordion-icon {
  @apply size-4;
}

.accordion-content {
  @apply flex flex-col gap-3 rounded-sm border border-primary-container/50 p-4;
}

.accordion-item-enter-active,
.accordion-item-leave-active {
  @apply transition-all;
}

.accordion-item-enter-from,
.accordion-item-leave-to {
  @apply opacity-0;
}

.accordion-item-enter-to,
.accordion-item-leave-from {
  @apply opacity-100;
}
</style>
