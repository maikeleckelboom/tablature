<script lang="ts" setup>
const { breadcrumbs, isNotFirstCrumb, isNotCurrentCrumb } = useBreadcrumbs()
</script>

<template>
  <div
    class="md:text-md relative z-10 flex w-full flex-nowrap items-center text-sm"
    data-component="Breadcrumbs"
  >
    <ul class="flex w-full flex-row flex-wrap items-center gap-2">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex flex-row items-center gap-2"
      >
        <!--
        Divider - can be multiple
        -->
        <div v-if="isNotFirstCrumb(crumb)" class="flex-row items-center">
          <NuxtLink
            :to="`/${crumb.path}` as any"
            class="on-surface-variant hover:on-surface-variant/90 rounded-md"
          >
            <Icon class="h-4 w-4" name="fluent:divider-short-16-filled" />
          </NuxtLink>
        </div>
        <!--
        Prev Breadcrumb (inactive) - can be multiple
        -->
        <div v-if="isNotCurrentCrumb(crumb)" class="flex-row items-center">
          <NuxtLink
            :to="`/${crumb.path}` as any"
            class="on-surface-variant hover:on-surface-variant/90 rounded-md capitalize"
          >
            {{ crumb.name }}
          </NuxtLink>
        </div>
        <!-- Current Breadcrumb (active) - always one -->
        <div v-else class="flex flex-row items-center">
          <span
            class="text-shadow-bold-variant rounded-md text-on-surface-variant/90 first-letter:uppercase"
          >
            {{ crumb.name }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
