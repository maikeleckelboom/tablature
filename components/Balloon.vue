<script lang="ts" setup>
const slots = defineSlots<{
  default(): void
}>()

const slotText = computed<string>(() => {
  if (!slots.default) return ''
  return slots.default()?.[0]?.children?.trim()
})

function getBalloonSizeByText(text: string) {
  return text.length * 8 + 16
}

const balloonRef = ref<HTMLElement>()

watchEffect(
  () => {
    if (!balloonRef.value) return
    const size = getBalloonSizeByText(slotText.value)
    balloonRef.value.style.setProperty('--size', `${size}px`)
  },
  { flush: 'post' }
)
</script>

<template>
  <div>
    <div ref="balloonRef" class="balloon">
      <div class="balloon-content">
        <span><slot /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.balloon {
  --size: 0px;
  --rotate: 135deg;

  inline-size: var(--size);
  block-size: var(--size);
  border-radius: 480% 60% 480% 480%;
  transform: rotate(var(--rotate));
  background: rgb(var(--primary-rgb));
  overflow: clip;

  > .balloon-content {
    inline-size: var(--size);
    block-size: var(--size);
    color: rgb(var(--on-primary-rgb));
    transform: rotate(calc(var(--rotate) * -1));
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      margin-block-start: calc(4px - var(--size) * 0.1);
      @apply text-center text-sm tabular-nums leading-none;
    }
  }
}
</style>
