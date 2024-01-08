<script lang="ts" setup>
const { breadcrumbs, isNotFirstCrumb, isNotCurrentCrumb } = useBreadcrumbs()

interface Props {
  currentClass?: string | string[]
  previousClass?: string | string[]
  dividerClass?: string | string[]
  dividerIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentClass:
    'text-shadow-bold-variant rounded-md text-on-surface-variant/90 first-letter:uppercase',
  previousClass: 'on-surface-variant hover:on-surface-variant/90 rounded-md capitalize',
  dividerClass: 'h-4 w-4',
  dividerIcon: 'tabler:slash'
})

const router = useRouter()

function routeExists(route: string): boolean {
  return router.options.routes.some((r) => r.path === route)
}
</script>

<template>
  <nav
    class="md:text-md relative z-10 flex w-full flex-nowrap items-center text-sm"
    data-component="Breadcrumbs"
  >
    <ul class="flex w-full flex-row flex-wrap items-center gap-2">
      <li v-for="crumb in breadcrumbs" :key="crumb.name" class="flex flex-row items-center gap-2">
        <!-- Divider -->
        <Icon v-if="isNotFirstCrumb(crumb)" :class="dividerClass" :name="dividerIcon" />
        <!-- Previous -->
        <template v-if="isNotCurrentCrumb(crumb)">
          <NuxtLink v-if="routeExists(crumb.path)" :class="previousClass" :to="crumb.path">
            {{ crumb.name }}
          </NuxtLink>
          <span v-else class="capitalize text-on-surface-variant/80">
            {{ crumb.name }}
          </span>
        </template>
        <!-- Currently Active -->
        <span v-else :class="currentClass">
          {{ crumb.name }}
        </span>
      </li>
    </ul>
  </nav>
</template>
