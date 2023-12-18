import { type Component, type MaybeRef, shallowRef } from 'vue'

interface DialogState<P, R> {
  component: Component
  props: P
  id: string
  ref: null | any
  setRef: (ref: Object | null) => void
  resolve: (value: R) => void
  reject: (reason?: string) => void
}

const dialogs = shallowRef<DialogState<any, any>[]>([])

function setRef(id: string, ref: Object | null): void {
  const dialog = dialogs.value.find((dialog) => dialog.id === id)
  if (!dialog) return
  dialog.ref = toRaw(ref)
}

async function openDialog<P, R>(
  component: Component,
  props: P
): Promise<{ data: R; isCanceled: boolean }> {
  const promise = new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(4)
    dialogs.value = [
      ...dialogs.value,
      {
        component,
        props,
        id,
        resolve,
        reject,
        ref: null,
        setRef: (ref: Object | null) => setRef(id, ref)
      }
    ]
  })

  const { data, isCanceled } = await promise
    .then((data) => ({ data, isCanceled: false }))
    .catch((data) => ({ data, isCanceled: true }))

  return { data, isCanceled }
}

async function closeDialog(data?: MaybeRef, unmountDelay: number = 0) {
  if (!dialogs.value.length) {
    console.warn('No dialogs to close')
    return
  }

  let returnValue = toValue(data)

  const dialog = dialogs.value.at(-1)

  if (returnValue === undefined) {
    if (dialog?.ref?.returnValue) {
      returnValue = dialog.ref.returnValue()
    }
  }

  if ([null, ''].includes(returnValue)) {
    dialog.reject(data ?? '')
  }

  if (unmountDelay) {
    await new Promise((resolve) => setTimeout(resolve, unmountDelay))
  }

  if (dialog?.resolve) {
    dialog.resolve(returnValue)
  }

  dialogs.value = dialogs.value.filter((d) => d.id !== dialog.id)
}

export { openDialog, closeDialog, type DialogState }

export default defineNuxtPlugin((_nuxt) => {
  return {
    provide: {
      dialogs: shallowReadonly(dialogs),
      openDialog,
      closeDialog
    }
  }
})
