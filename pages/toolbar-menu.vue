<script lang="ts" setup>
import type { MenuItem } from '~/modules/menu/types'

const { state } = storeToRefs(useToolbarMenuStore())

watchEffect(() => {
  console.log('watchEffect triggered with state: ', state)
})

const fns = new Map<string, () => void>([
  [
    'Bold',
    () => {
      console.log('Bold')
    }
  ],
  [
    'Italic',
    () => {
      console.log('Italic')
    }
  ],
  [
    'Underline',
    () => {
      console.log('Underline')
    }
  ],
  [
    'Strikethrough',
    () => {
      console.log('Strikethrough')
    }
  ],
  [
    'Superscript',
    () => {
      console.log('Superscript')
    }
  ]
])

function recursiveAddChildren(item: MenuItem) {
  if (item.children) {
    item.children.forEach((child) => {
      recursiveAddChildren(child)
    })
  } else {
    if (!fns.has(item.name)) {
      return
    }
    item.onClick = fns.get(item.name)
  }
  return item
}

const items = computed(() => {
  return state.value.map(recursiveAddChildren)
})
</script>

<template>
  <ColumnLayout>
    <div class="flex flex-row items-start gap-4">
      <List :items="<any>items" />
    </div>

    <!--
      <Menu>
      <MenuButton>More</Menu.Button>
      <MenuItems>
        <MenuItem v-slot="{ open }">
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </MenuItem>
        <MenuItem disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </MenuItem>
      </Menu.Items>
    </Menu>

    -->
  </ColumnLayout>
</template>

<style scoped></style>
