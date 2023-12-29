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
        <!-- Divider - can be multiple -->
        <Icon v-if="isNotFirstCrumb(crumb)" class="h-4 w-4" name="fluent:divider-short-16-filled" />
        <!-- Prev Breadcrumb (inactive) - can be multiple  -->
        <NuxtLink
          v-if="isNotCurrentCrumb(crumb)"
          :to="`/${crumb.path}` as any"
          class="on-surface-variant hover:on-surface-variant/90 rounded-md capitalize"
        >
          {{ crumb.name }}
        </NuxtLink>
        <!-- Current Breadcrumb (active) - can be multiple  -->
        <span
          v-else
          class="text-shadow-bold-variant rounded-md text-on-surface-variant/90 first-letter:uppercase"
        >
          {{ crumb.name }}
        </span>
      </li>
    </ul>
  </div>
</template>
