import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          directives: true,
          version: "2.1.5"
        })
      ]
    }),
    UnoCss({
      presets: [
        presetAttributify(),
        presetIcons({
          scale: 1.5,
          warn: true
        }),
        presetUno()
      ],
      rules: [
        ['bg-black-22', { 'background-color': '#222222' }],
        ['bg-black-36', { 'background-color': '#1a1a1a' }],
      ],
      safelist: 'w-260px w-60px'.split(' ')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element-ui.scss" as *;`
      }
    }
  }
})

