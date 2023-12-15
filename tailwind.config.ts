import type { Config } from 'tailwindcss'
import { materialThemePreset } from './modules/theme/tailwind.preset'

const srcDir: string = '.' as const

const config = {
  content: [
    `${srcDir}/modules/**/runtime/*.{js,ts,vue}`,
    `${srcDir}/modules/**/runtime/components/**/*.{js,ts,vue}`,
    `${srcDir}/modules/**/runtime/layouts/**/*.{js,ts,vue}`,
    `${srcDir}/modules/**/runtime/pages/**/*.{js,ts,vue}`
  ],
  presets: [materialThemePreset],
  theme: {
    supports: {
      svh: 'height: 100svh',
      svw: 'width: 100svw',
      dvh: 'height: 100dvh',
      dvw: 'width: 100dvw',
      subgrid: 'display: subgrid'
    },
    extends: {
      gridRow: {
        '0': '0fr'
      },
      gridColumn: {
        '0': '0fr'
      }
    }
  }
} satisfies Config

export default config
