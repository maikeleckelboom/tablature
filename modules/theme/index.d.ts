import type { Ref } from 'vue';
import type { SchemeContent } from '@material/material-color-utilities';
import type { ThemeModuleOptions } from '~/modules/theme/types';

declare module '#app' {
  interface NuxtApp {
    $schemeContent: Ref<SchemeContent>
  }

  interface RuntimeConfig {
    public: {
      theme: ThemeModuleOptions
    }
  }

  interface AppConfigInput {
    theme: ThemeModuleOptions
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $schemeContent: Ref<SchemeContent>
  }
}

export { }
