import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true, // 启用响应式语法糖$ref $computed $toRef
    }),
    Unocss(
      {
        presets: [
          presetAttributify(),
          presetUno(),
        ],
      }),
  ]
})
