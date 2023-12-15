<template>
  <div class="shape-balloon">
    <slot />
  </div>
</template>

<style scoped>
.shape-balloon {
  --balloon-size: 28px;
  --balloon-radius-start: 100px;
  --balloon-radius-end: 10px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: var(--balloon-size);
    height: var(--balloon-size);
    background-color: rgb(var(--primary-rgb));
    border: 1px solid rgb(var(--primary-rgb));
    border-radius: var(--balloon-radius-start) var(--balloon-radius-start) var(--balloon-radius-end);
    transform: rotate(45deg);
    z-index: -1;
  }
}
</style>
