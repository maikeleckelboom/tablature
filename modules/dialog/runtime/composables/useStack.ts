import { computed, effectScope, getCurrentInstance, onScopeDispose, ref, toRaw, watch } from 'vue'
import type { ComponentInternalInstance, Ref, EffectScope } from 'vue'

type VueComponentInternalInstance = Omit<
  ComponentInternalInstance,
  'appContext' | 'parent' | 'root'
>

const stack = ref<VueComponentInternalInstance[]>([])

export function useStack(isActive: Ref<boolean> = ref(true)) {
  const vm = getCurrentInstance()
  let scope: EffectScope | null = null

  watch(
    isActive,
    (active) => {
      if (!active) {
        scope?.stop()
        return
      }

      scope = effectScope()
      scope.run(() => {
        stack.value.push(vm)

        onScopeDispose(() => {
          const idx = stack.value.indexOf(vm)
          stack.value.splice(idx, 1)
        })
      })
    },
    { immediate: true }
  )

  const isTop = computed(() => {
    return toRaw(stack.value.at(-1)) === vm
  })

  return {
    isTop
  }
}
