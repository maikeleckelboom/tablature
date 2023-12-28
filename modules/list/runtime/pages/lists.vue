<script lang="ts" setup>
import type { AccordionItem } from '~/types'

const { navigationList } = useListStore()

const navigationList1 = ref(useCloneDeep(navigationList))

const navigationList2 = ref(useCloneDeep(navigationList))

const items = ref<AccordionItem[]>([
  {
    value: 'item-1',
    title: 'Item 1',
    content: 'Content 1'
  },
  {
    value: 'item-2',
    title: 'Item 2',
    content: 'Content 2',
    children: [
      {
        value: 'item-2-1',
        title: 'Item 2.1',
        content: 'Content 2.1'
      },
      {
        value: 'item-2-2',
        title: 'Item 2.2',
        content: 'Content 2.2'
      }
    ]
  },
  {
    value: 'item-3',
    title: 'Item 3',
    content: 'Content 3',
    children: [
      {
        value: 'item-3-1',
        title: 'Item 3.1',
        content: 'Content 3.1'
      },
      {
        value: 'item-3-2',
        title: 'Item 3.2',
        content: 'Content 3.2',
        children: [
          {
            value: 'item-3-2-1',
            title: 'Item 3.2.1',
            content: 'Content 3.2.1'
          },
          {
            value: 'item-3-2-2',
            title: 'Item 3.2.2',
            content: 'Content 3.2.2'
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <div class="mx-auto w-full max-w-4xl">
    <div class="grid gap-6 md:grid-cols-3">
      <Breadcrumbs class="col-span-full mb-5 mt-4" />
      <!--      <section class="">
              <h1 class="mb-4 text-title-lg text-secondary">[type='single']</h1>
              <AccordionList :list="navigationList2" type="single" />
            </section>-->
      <section class="">
        <h1 class="mb-4 whitespace-nowrap text-title-lg text-secondary">[type='multiple']</h1>
        <AccordionList :list="navigationList1" type="multiple" />
      </section>
      <section>
        <h1 class="mb-4 whitespace-nowrap text-title-lg text-secondary">Accordion</h1>
        <Accordion :list="items"></Accordion>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
