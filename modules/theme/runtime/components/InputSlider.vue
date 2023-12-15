<!--suppress ALL -->
<script lang="ts" setup>
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type SliderModelValue = number | number[];

type SliderTypes = 'continuous' | 'discrete';

type TickMark = {
  value: number;
  label: string;
};

type SliderTickMarks = TickMark[] | boolean;

interface InputSliderProps {
  type?: SliderTypes;
  label?: string;
  labelText?: string;
  supportingText?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  modelValue: SliderModelValue;
  tickMarks?: SliderTickMarks;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  invalid?: boolean;
  valid?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  fillBackground?: string;
  background?: string;
}

/** Utils **/
const rect = (el: HTMLElement) => el.getBoundingClientRect();

/** Default Props **/
const props = defineProps<InputSliderProps>();

const {modelValue, labelText, leadingIcon, trailingIcon} = toRefs(props);

const background = computed(() => {
  if (props.background) return props.background;
  return `rgb(var(--surface-variant-rgb) / 3)`;
});

const fillBackground = computed(() => {
  if (props.fillBackground) return props.fillBackground;
  return `rgb(var(--primary-rgb) / 20)`;
});

const {
  label,
  min = 0,
  max = 100,
  step = 1,
  tickMarks,
  disabled = false,
  type = 'continuous',
} = props;

const isContinuous = computed(() => type === 'continuous');
const isLabeledTickMarks = computed(
    () => Array.isArray(tickMarks) && tickMarks.every((obj) => obj.value && obj.label),
);

/** Emits **/
const emit = defineEmits<{
  (e: 'update:modelValue', value: SliderModelValue): void;
}>();

/** Refs **/
const slider = ref<HTMLElement>();
const track = ref<HTMLElement>();
const handle = ref<HTMLElement>();
const percent = ref<number>(0);
const percentEnd = ref<number>(0);

const updatePercent = () => {
  const minimum = Number(min);
  const maximum = Number(max);
  if (Array.isArray(modelValue.value)) {
    percent.value = (modelValue.value[0] - minimum) / (maximum - minimum);
    percentEnd.value = (modelValue.value[1] - minimum) / (maximum - minimum);
  } else {
    percent.value = (modelValue.value - minimum) / (maximum - minimum);
  }
};

/** State **/
const isHovering = useElementHover(slider);
const isDragging = ref<boolean>(false);

/** Sync the percent value with the modelValue */
watchEffect(updatePercent);

/** Sync the modelValue with the percent value */
watch([percent, percentEnd], () => {
  const minimum = Number(min);
  const maximum = Number(max);
  const range = maximum - minimum;
  const value = clamp(percent.value * range + minimum, minimum, maximum);
  const valueEnd = clamp(percentEnd.value * range + minimum, minimum, maximum);
  Array.isArray(modelValue.value)
      ? emit('update:modelValue', [value, valueEnd])
      : emit('update:modelValue', value);
});

const checkPointerTarget = (target: HTMLElement) => {
  const isLeftHandle = target.dataset?.ref === 'handle';
  const isRightHandle = target.dataset?.ref === 'handle-end';
  const isTrack = target === track.value;
  const isTrackFill = target.dataset?.ref === 'track-fill';
  return {isLeftHandle, isRightHandle, isTrack, isTrackFill};
};

/** Set the percent value to where the user clicks on the track */
const setPercentToClickPosition = ({clientX, target}: PointerEvent) => {
  const {left, width} = rect(target as HTMLElement);
  const x = clientX - left;
  percent.value = clamp(x / width, 0, 1);
};

/** Computed ticks count, so we can limit the number of ticks to 10% of total range */
const ticksCount = computed(() => {
  if (!tickMarks) return 0;
  const range = Number(max) - Number(min);
  return Math.floor(range / Math.max(Number(step), range * 0.1)) - 2;
});

/** Set the percent value to the closest tick mark */
const snapToClosestTickMark = (ev: PointerEvent) => {
  if (!track.value) return;
  const target = ev.target as HTMLElement;
  const {left, width} = rect(track.value);
  const x = ev.clientX - left;
  const tickWidth = width / ticksCount.value;
  const tickIndex = Math.round(x / tickWidth);
  const tickX = tickIndex * tickWidth;
  const tickPercent = clamp(tickX / width, 0, 1);
  const {isRightHandle} = checkPointerTarget(target);
  if (isRightHandle) {
    percentEnd.value = tickPercent;
    return;
  }
  percent.value = tickPercent;
};

const offsetHandlesAsWhole = (ev: PointerEvent) => {
  if (!track.value) return;
  const {left, width} = rect(track.value);
  const x = ev.clientX - left;
  const handleWidth = width * (percentEnd.value - percent.value);
  const handleX = x - handleWidth / 2;
  const handlePercent = handleX / width;
  const distance = percentEnd.value - percent.value;
  if (handlePercent < 0) {
    percent.value = 0;
    percentEnd.value = distance;
    return;
  }
  if (handlePercent + distance > 1) {
    percent.value = 1 - distance;
    percentEnd.value = 1;
    return;
  }
  percent.value = handlePercent;
  percentEnd.value = handlePercent + distance;
};

const onPointerdown = (ev: PointerEvent) => {
  if (disabled) {
    return;
  }

  isDragging.value = true;

  const target = ev.target as HTMLElement;

  const {isRightHandle, isTrack, isTrackFill} = checkPointerTarget(target);

  target.setPointerCapture(ev.pointerId);

  if (isTrack && !Array.isArray(modelValue.value)) {
    setPercentToClickPosition(ev);
  }
  const {left, width} = rect(track.value as HTMLElement);

  const onPointermove = (ev: PointerEvent) => {
    if (isTrackFill && Array.isArray(modelValue.value)) {
      offsetHandlesAsWhole(ev);
      return;
    }
    isRightHandle
        ? (percentEnd.value = clamp((ev.clientX - left) / width, 0, 1))
        : (percent.value = clamp((ev.clientX - left) / width, 0, 1));
  };

  const onPointerup = (ev: PointerEvent) => {
    target.releasePointerCapture(ev.pointerId);
    if (!isTrackFill && tickMarks) {
      snapToClosestTickMark(ev);
    }
    cleanupPointermove();
    cleanupPointerup();
    cleanupPointercancel();
    isDragging.value = false;
  };

  const cleanupPointercancel = useEventListener('pointercancel', onPointerup, {passive: true});

  const cleanupPointermove = useEventListener('pointermove', onPointermove, {passive: false});
  const cleanupPointerup = useEventListener('pointerup', onPointerup, {passive: true});
};

/** Attach pointerdown event listener to the track element */
useEventListener(track, 'pointerdown', onPointerdown, {passive: true});

function roundValue(value: number | number[]) :string{
  if (Array.isArray(value)) {
    return `${roundValue(value[0])} - ${roundValue(value[1])}`;
  }
  const inv = 1.0 / Number(step);
  return `${Math.round(value * inv) / inv}`;
}

/** Computed rounded value **/
const roundedValue = computed(() => {
  return (
      Math.round(
          Array.isArray(modelValue.value)
              ? Number(modelValue.value[0])
              : Number(modelValue.value) / Number(step),
      ) * Number(step)
  );
});

/** Computed rounded value **/
const roundedValueEnd = computed(
    () =>
        Math.round(
            Array.isArray(modelValue.value)
                ? Number(modelValue.value[1])
                : Number(modelValue.value) / Number(step),
        ) * Number(step),
);

/** Computed handle position **/
const handleStyle = computed(() => ({
  left: `${percent.value * 100}%`,
  transform: `translateX(-${percent.value * 100}%)`,
}));

/** Computed handle position **/
const handleEndStyle = computed(() => ({
  left: `${percentEnd.value * 100}%`,
  transform: `translateX(-${percentEnd.value * 100}%)`,
}));

/** Computed track fill style **/
const trackFillStyle = computed(() =>
    Array.isArray(modelValue.value)
        ? {
          transform: `scaleX(${percentEnd.value - percent.value})`,
          left: `${percent.value * 100}%`,
        }
        : {
          transform: `scaleX(${percent.value})`,
        },
);

/** Computed label value container style **/
const labelValueContainerStyle = computed(() => {
  const isActive = !disabled && (isDragging.value || isHovering.value);
  const translateX = `${percent.value * 100 * -1 + (isActive ? -20 : -10)}%`;
  const translateY = `-${isActive ? 10 : 0}px`;
  return {
    left: `${percent.value * 100}%`,
    transform: `translate(${translateX}, ${translateY}) scale(${isActive ? 1 : 0.5})`,
    opacity: isActive ? 1 : 0,
  };
});

/** Computed label value container style **/
const labelValueContainerEndStyle = computed(() => {
  const isActive = !disabled && (isDragging.value || isHovering.value);
  const translateX = `${percentEnd.value * 100 * -1 + (isActive ? -20 : -10)}%`;
  const translateY = `-${isActive ? 10 : 0}px`;
  return {
    left: `${percentEnd.value * 100}%`,
    transform: `translate(${translateX}, ${translateY}) scale(${isActive ? 1 : 0.5})`,
    opacity: isActive ? 1 : 0,
  };
});
const isActiveTickMark = (index: number) => {
  const isBetween =
      index / ticksCount.value >= Math.min(percent.value, percentEnd.value) &&
      index / ticksCount.value <= Math.max(percent.value, percentEnd.value);
  const hasPassed = index / ticksCount.value <= Math.max(percent.value, percentEnd.value);
  return Array.isArray(modelValue.value) ? isBetween : hasPassed;
};

/** Computed tick marks style **/
const tickMarksStyle = computed(() =>
    Array.from({length: ticksCount.value + 1}, (_, tick) => tick).map((tick, index) => ({
      left: `${(tick / ticksCount.value) * 100}%`,
      transform: `translateX(-${(tick / ticksCount.value) * 100}%)`,
      backgroundColor: isActiveTickMark(index) ? 'var(--tick-mark-active)' : 'var(--tick-mark-color)',
    })),
);

const slots = useSlots();

const hasLeadingIcon = computed(() => !!leadingIcon.value || slots.leadingIcon?.()?.length);
const hasTrailingIcon = computed(() => !!trailingIcon.value || slots.trailingIcon?.()?.length);
const hasLabel = computed(() => !!label || slots.label?.()?.length);

const dataAttributes = computed(() => ({
  'data-tick-marks': !!tickMarks,
  'data-leading-icon': hasLeadingIcon.value,
  'data-trailing-icon': hasTrailingIcon.value,
  'data-label': hasLabel.value,
  'data-double-handle': Array.isArray(modelValue.value),
}));

const classes = computed(() => ({
  'is-disabled': disabled,
  'is-dragging': isDragging.value,
}));
</script>

<template>
  <div
      ref="slider"
      :class="[classes, { 'touch-none': isDragging }]"
      class="input-slider"
      v-bind="dataAttributes"
  >
    <div class="text-label-lg">
      <slot name="label" v-bind="{ label, labelText }">
        <label v-if="hasLabel" class="input-slider--label">
          {{ label }}
        </label>
      </slot>
    </div>
    <div v-if="hasLeadingIcon" class="input-slider--leading-icon">
      <Icon :name="leadingIcon" class="leading-icon"/>
    </div>
    <div class="input-slider--container" tabindex="0">
      <div :style="labelValueContainerStyle" class="input-slider--balloon">
        <ShapeBalloon>
          <span class="label-text">
            <slot name="value-label" v-bind="{ value: roundValue(modelValue) }">
              {{ roundValue(modelValue) }}
            </slot>
          </span>
        </ShapeBalloon>
      </div>
      <div
          v-if="Array.isArray(modelValue)"
          :style="labelValueContainerEndStyle"
          class="input-slider--balloon"
      >
        <ShapeBalloon>
          <span class="label-text">
            <slot name="value-label" v-bind="{ value: roundValue(modelValue.at(-1)) }">
              {{ roundValue(modelValue.at(-1)) }}
            </slot>
          </span>
        </ShapeBalloon>
      </div>
      <div ref="track" class="input-slider--track">
        <span :style="trackFillStyle" class="input-slider-track--fill" data-ref="track-fill"/>
        <div
            ref="handle"
            :style="handleStyle"
            class="input-slider--handle handle--left"
            data-ref="handle"
        />
        <div
            v-if="Array.isArray(modelValue)"
            ref="handleEnd"
            :style="handleEndStyle"
            class="input-slider--handle handle--right"
            data-ref="handle-end"
        />
      </div>
      <template v-if="!isLabeledTickMarks">
        <div class="input-slider--tick-marks">
          <div
              v-for="(style, i) in tickMarksStyle"
              :key="i"
              :class="{ invisible: i === 0 || i === tickMarksStyle.length - 1 }"
              :style="style"
              class="input-slider--tick-mark"
          />
        </div>
      </template>
    </div>
    <template v-if="Array.isArray(tickMarks) && tickMarks?.every((obj) => obj.label)">
      <div class="relative w-full grid grid-rows-1 grid-flow-col">
        <div
            v-for="(tick, i) in tickMarks"
            :key="i"
            :class="i === tickMarks.length - 1 ? 'transform -translate-x-10' : ''"
            :style="{ left: `${tick.value * 100}%` }"
            class="relative mt-2 w-fit"
        >
          <span class="text-label-md">{{ tick.label }}</span>
        </div>
      </div>
    </template>
    <div v-if="hasTrailingIcon" class="input-slider--trailing-icon">
      <Icon :name="trailingIcon" class="trailing-icon"/>
    </div>
  </div>
</template>

<!--suppress CssUnresolvedCustomProperty -->
<style lang="postcss">
.input-slider {
  --touch-height: 40px;
  --track-height: 4px;
  --track-radius: 4px;
  --label-value-container-width: 28px;
  --label-value-container-height: 34px;
  --handle-size: 20px;
  --handle-offset: calc(var(--handle-size) / 2);
  --handle-radius: 28px;
  --handle-color: rgb(var(--primary-rgb));
  --track-color: v-bind(background);
  --track-fill-color: v-bind(fillBackground);
  --tick-mark-active: rgb(var(--on-primary-rgb));
  --tick-mark-color: rgb(var(--on-surface-variant-rgb));

  position: relative;
  width: max(100%, 100px);
  display: grid;
  column-gap: 24px;
  touch-action: pan-y;
  grid-template-areas:
    'label'
    'input'
    'tick-marks';

  &[data-trailing-icon='true']:not([data-leading-icon='true']) {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'label label'
      'input trailing-icon'
      'input trailing-icon'
      'tick-marks tick-marks';
  }

  &[data-leading-icon='true']:not([data-trailing-icon='true']) {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'leading-icon label'
      'leading-icon input'
      'leading-icon input'
      'tick-marks tick-marks';
  }

  &[data-leading-icon='true'][data-trailing-icon='true'] {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      'leading-icon label trailing-icon'
      'leading-icon input trailing-icon'
      'tick-marks tick-marks tick-marks';
  }

  .input-slider--leading-icon {
    grid-area: leading-icon;
    grid-row: 1/-1;
    align-self: center;
  }

  .input-slider--trailing-icon {
    grid-area: trailing-icon;
    grid-row: 1/-1;
    align-self: center;
  }

  .input-slider--container {
    grid-area: input;
    display: grid;
    height: var(--handle-size);
    grid-template-columns: 1fr;
    grid-template-areas: 'input';
    align-items: center;
    position: relative;
  }

  .input-slider--label {
    grid-area: label;
    display: grid;
    margin-bottom: 12px;
  }

  .input-slider--track {
    position: relative;
    cursor: pointer;
    height: 100%;
    background-color: transparent;
    border-radius: var(--track-radius);

    &::before {
      content: '';
      position: absolute;
      top: calc(var(--handle-offset) - var(--track-height) / 2);
      left: 0;
      width: 100%;
      height: var(--track-height);
      border-radius: var(--track-radius);
      background: var(--track-color);
    }
  }

  .input-slider-track--fill {
    height: var(--track-height);
    top: calc(var(--handle-offset) - var(--track-height) / 2);
    transform-origin: left;
    pointer-events: none;
    background: var(--track-fill-color);
    position: absolute;
    z-index: 0;
    left: 0;
    width: 100%;
    border-radius: var(--track-radius);
    transition: cubic-bezier(0.4, 0, 0.2, 1) all 0.2s;
  }

  .input-slider--handle {
    position: absolute;
    top: calc(50% - var(--handle-offset));
    width: var(--handle-size);
    height: var(--handle-size);
    border-radius: var(--handle-radius);
    background-color: var(--handle-color);
    outline: rgb(var(--primary-rgb) / 0.18) solid 0px;
    z-index: 2;
    cursor: ew-resize;
    transition: cubic-bezier(0.4, 0, 0.2, 1) all 0.2s;

    :not(.is-dragging) & {
    }
  }

  .input-slider--balloon {
    width: var(--handle-size);
    position: absolute;
    top: 0;
    transition: cubic-bezier(0.4, 0, 0.2, 1) all 0.2s;

    :not(.is-dragging) & {
    }

    .shape-balloon {
      position: absolute;
      top: calc(var(--handle-offset) * -1 - var(--label-value-container-height) / 2);
      width: var(--label-value-container-width);
      height: var(--label-value-container-height);

      .label-text {
        color: rgb(var(--on-primary-rgb));
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
        width: var(--label-value-container-width);
        height: var(--label-value-container-height);
        display: grid;
        align-items: center;
        padding-bottom: 5px;
        @apply text-label-md;
      }
    }
  }

  .input-slider--tick-marks {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .input-slider--tick-mark {
      position: absolute;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      top: calc(50% - 1px);
      transition: ease-out all 120ms;
      pointer-events: none;
    }
  }

  &:is(.is-disabled) {
    --track-color: rgb(var(--on-surface-rgb) / 0.12);
    --tick-mark-color: rgb(var(--on-surface-rgb) / 0.38);
    --tick-mark-active: rgb(var(--on-surface-rgb) / 0.52);

    .input-slider--track {
      cursor: not-allowed;
    }

    .input-slider--handle {
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  &:is(:hover, :focus, :focus-visible, .is-dragging):not(.is-disabled) {
    //--track-color: rgb(var(--primary-rgb) / 0.12);

    &:not([data-double-handle='true']) {
    }

    .input-slider--handle {
      outline-width: 4px;

      &:hover {
        outline-width: 6px;
      }
    }

    &:active,
    &.is-dragging {
      .input-slider--handle {
        outline-width: 10px;
        outline-color: rgb(var(--primary-rgb) / 0.18);
      }
    }
  }

  &.is-disabled {
    --handle-color: rgb(var(--on-surface-rgb));
    --track-fill-color: rgb(var(--on-surface-rgb));
  }

  &.is-dragging {
    transition: none;
    pointer-events: none;
    cursor: ew-resize;

    .input-slider-track--fill,
    .input-slider--handle,
    .input-slider--balloon {
      transition: none;
    }
  }

  &[data-double-handle='true'] {
    &:hover {
      /*
        Custom hover styles
      */
    }

    .input-slider--track {
      cursor: default;
      pointer-events: none;

      .input-slider--handle {
        cursor: ew-resize;
        pointer-events: all;
      }

      .input-slider-track--fill {
        cursor: pointer;
        pointer-events: all;
      }
    }
  }
}
</style>
