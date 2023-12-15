<script lang="ts" setup>
import { Hct, hexFromArgb, TonalPalette } from "@material/material-color-utilities";
import chroma from "chroma-js";

const { $schemeContent } = useNuxtApp();
const { sourceColor, contrastLevel } = useThemeConfig();

const primaryKeyColor = computed(() => {
  const primaryPalette = $schemeContent.value.primaryPalette;
  return primaryPalette.keyColor;
});

type FormModel = {
  hue: number;
  chroma: number;
  tone: number;
};

type FormModelBounds = {
  [K in keyof FormModel]: {
    min: number;
    max: number;
    default?: number;
  };
};

const formModelBounds = readonly<FormModelBounds>({
  hue: { min: 0, max: 360 },
  chroma: { min: 0, max: 150, default: 130 },
  tone: { min: 0, max: 100, default: 60 },
});

const formModel = reactive<FormModel>({
  hue: primaryKeyColor.value?.hue ?? 0,
  chroma: primaryKeyColor.value?.chroma ?? 0,
  tone: primaryKeyColor.value?.internalTone ?? 0,
});

const onHctFormModelChange = ({ hue, chroma, tone }: FormModel) => {
  sourceColor.value = hexFromArgb(TonalPalette.fromHueAndChroma(hue, chroma).tone(tone));
};

watch(formModel, onHctFormModelChange, { deep: true });

const hueSpectra = computed(() => ({
  background: `linear-gradient(to right, ${chroma
    .scale([
      hexFromArgb(Hct.from(0, formModelBounds.chroma.default, formModelBounds.tone.default).toInt()),
      hexFromArgb(
        Hct.from(formModelBounds.hue.max / 4, formModelBounds.chroma.default, formModelBounds.tone.default).toInt(),
      ),
      hexFromArgb(
        Hct.from(formModelBounds.hue.max / 2, formModelBounds.chroma.default, formModelBounds.tone.default).toInt(),
      ),
      hexFromArgb(Hct.from((formModelBounds.hue.max / 4) * 3, formModel.chroma, formModelBounds.tone.default).toInt()),
      hexFromArgb(
        Hct.from(formModelBounds.hue.max, formModelBounds.chroma.default, formModelBounds.tone.default).toInt(),
      ),
    ])
    .mode("lab")
    .colors(formModelBounds.hue.max)
    .join(", ")})`,
}));

const hueConicGradientSpectra = computed(() => ({
  background: `conic-gradient(from 0deg, ${chroma
    .scale([
      hexFromArgb(Hct.from(0, formModelBounds.chroma.default, formModelBounds.tone.default).toInt()),
      hexFromArgb(
        Hct.from(formModelBounds.hue.max / 4, formModelBounds.chroma.default, formModelBounds.tone.default).toInt(),
      ),
      hexFromArgb(
        Hct.from(formModelBounds.hue.max / 2, formModelBounds.chroma.default, formModelBounds.tone.default).toInt(),
      ),
      hexFromArgb(Hct.from((formModelBounds.hue.max / 4) * 3, formModel.chroma, formModelBounds.tone.default).toInt()),
      hexFromArgb(
        Hct.from(formModelBounds.hue.max, formModelBounds.chroma.default, formModelBounds.tone.default).toInt(),
      ),
    ])
    .mode("lab")
    .colors(formModelBounds.hue.max)
    .join(", ")})`,
}));

const chromaSpectra = computed(() => ({
  background: `linear-gradient(to right, ${chroma
    .scale([
      hexFromArgb(Hct.from(formModel.hue, 0, formModelBounds.tone.default).toInt()),
      hexFromArgb(Hct.from(formModel.hue, formModelBounds.chroma.max / 4, formModelBounds.tone.default).toInt()),
      hexFromArgb(Hct.from(formModel.hue, formModelBounds.chroma.max / 2, formModelBounds.tone.default).toInt()),
      hexFromArgb(Hct.from(formModel.hue, (formModelBounds.chroma.max / 4) * 3, formModelBounds.tone.default).toInt()),
      hexFromArgb(Hct.from(formModel.hue, formModelBounds.chroma.max, formModelBounds.tone.default).toInt()),
    ])
    .mode("lab")
    .colors(formModelBounds.chroma.max)
    .join(", ")})`,
}));

const tonalSpectra = computed(() => ({
  background: `linear-gradient(to right, ${chroma
    .scale([
      hexFromArgb(Hct.from(formModel.hue, 0, 0).toInt()),
      hexFromArgb(Hct.from(formModel.hue, 0, formModelBounds.tone.max / 4).toInt()),
      hexFromArgb(Hct.from(formModel.hue, 0, formModelBounds.tone.max / 2).toInt()),
      hexFromArgb(Hct.from(formModel.hue, 0, (formModelBounds.tone.max / 4) * 3).toInt()),
      hexFromArgb(Hct.from(formModel.hue, 0, formModelBounds.tone.max).toInt()),
    ])
    .mode("lab")
    .colors(formModelBounds.tone.max)
    .join(", ")})`,
}));

function roundValue(value: number, step: number) {
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

const onInput = (ev: Event, key: keyof FormModel) => {
  formModel[key] = Number((ev.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="max-w-compact mx-auto p-4 md:p-2 grid">
    <div class="flex flex-col gap-4 mb-8">
      <fieldset>
        <InputSlider
          v-model="contrastLevel"
          :tick-marks="[
            { value: 0, label: 'Low' },
            { value: 1, label: 'High' },
          ]"
          max="1"
          label="Contrast level"
          min="0"
          step="0.1"
        >
        </InputSlider>
      </fieldset>
      <fieldset>
        <InputSlider
          v-model="formModel.hue"
          :max="formModelBounds.hue.max"
          :min="formModelBounds.hue.min"
          :step="1"
          class="h-fit"
          label="Hue"
          label-text="The type of color, such as red, blue, or green"
        >
          <template #label="{ label, labelText }">
            <div class="grid grid-cols-[1fr,auto] items-start justify-center">
              <div class="grid grid-cols-[1fr,auto] items-start justify-center">
                <div class="flex flex-col">
                  <label class="">
                    {{ label }}
                  </label>
                  <span class="text-body-sm text-on-surface-variant hidden">
                    {{ labelText }}
                  </span>
                </div>
              </div>
              <input
                :max="formModelBounds.hue.max"
                :min="formModelBounds.hue.min"
                :value="roundValue(formModel.hue, 1)"
                class="hide-number-input-arrows w-14 h-10 flex justify-center items-center bg-surface-container border-outline-variant rounded-lg text-center tabular-nums"
                type="number"
                @input="onInput($event, 'hue')"
              />
            </div>
          </template>
        </InputSlider>
        <ColorSpectrum :style="hueSpectra" />
      </fieldset>
      <fieldset>
        <InputSlider
          v-model="formModel.chroma"
          :max="formModelBounds.chroma.max"
          :min="formModelBounds.chroma.min"
          :step="1"
          label="Chroma"
          label-text="How colorful or neutral a color appears"
        >
          <template #label="{ label, labelText }">
            <div class="grid grid-cols-[1fr,auto] items-start justify-center">
              <div class="grid grid-cols-[1fr,auto] items-start justify-center">
                <div class="flex flex-col">
                  <label class="">
                    {{ label }}
                  </label>
                  <span class="text-body-sm text-on-surface-variant hidden">
                    {{ labelText }}
                  </span>
                </div>
              </div>
              <input
                :value="roundValue(formModel.chroma, 1)"
                class="hide-number-input-arrows w-14 h-10 flex justify-center items-center bg-surface-container border-outline-variant rounded-lg text-center tabular-nums"
                type="number"
                @input="onInput($event, 'chroma')"
              />
            </div>
          </template>
        </InputSlider>
        <ColorSpectrum :style="chromaSpectra" />
      </fieldset>
      <fieldset>
        <InputSlider
          v-model="formModel.tone"
          :max="formModelBounds.tone.max"
          :min="formModelBounds.tone.min"
          :step="1"
          label="Tone"
          label-text="The amount of white or black mixed with the color hidden "
        >
          <template #label="{ label, labelText }">
            <div class="grid grid-cols-[1fr,auto] items-start justify-center">
              <div class="flex flex-col">
                <label class="text-title-sm">
                  {{ label }}
                </label>
                <span class="text-body-xs text-on-surface-variant hidden">
                  {{ labelText }}
                </span>
              </div>
              <input
                :value="roundValue(formModel.tone, 1)"
                class="hide-number-input-arrows w-14 h-10 flex justify-center items-center bg-surface-container border-outline-variant rounded-lg text-center tabular-nums"
                type="number"
                @input="onInput($event, 'tone')"
              />
            </div>
          </template>
        </InputSlider>
        <ColorSpectrum :style="tonalSpectra" />
      </fieldset>
    </div>
  </div>
</template>

<style></style>
