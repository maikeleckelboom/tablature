const removeRedundantSlashes = (path: string) => {
  path = path.endsWith('/') ? path.slice(0, -1) : path
  return path.startsWith('/') ? path.slice(1) : path
}

export interface Breadcrumb {
  path: string
  name: string
  icon?: string
}

type BreadCrumbOptions = {}

export const useBreadcrumbs = (options?: BreadCrumbOptions) => {
  const router = useRouter()
  const currentRoute = computed(() => router.currentRoute.value)

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const crumbs = removeRedundantSlashes(currentRoute.value.path).split('/')
    return [
      { path: '', name: 'Home' },
      ...crumbs.map((crumb, index) => ({
        path: crumbs.slice(0, index + 1).join('/'),
        name: crumb
      }))
    ]
  })

  const isLastCrumb = (crumb: Breadcrumb) => crumb.path === currentRoute.value.path
  const isCurrentCrumb = (crumb: Breadcrumb) => crumb.path === currentRoute.value.path
  const isNotLastCrumb = (crumb: Breadcrumb) => crumb.path !== currentRoute.value.path
  const navigateToCrumb = (crumb: Breadcrumb) => router.push(crumb.path)
  const isNotFirstCrumb = (crumb: Breadcrumb) => crumb.path !== breadcrumbs.value[0].path
  const isNotCurrentCrumb = (crumb: Breadcrumb) =>
    crumb.path !== removeRedundantSlashes(currentRoute.value.path)

  return {
    breadcrumbs,
    isLastCrumb,
    isCurrentCrumb,
    isNotLastCrumb,
    navigateToCrumb,
    isNotFirstCrumb,
    isNotCurrentCrumb
  }
}
