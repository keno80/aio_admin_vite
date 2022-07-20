import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
          ['shadow-el-light', { 'box-shadow': 'var(--el-box-shadow-light)' }],
        ],
        safelist: 'w-260px w-60px'.split(' ')
      })
    ],
    base: env.VITE_BASE_URL,
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
  }
})

