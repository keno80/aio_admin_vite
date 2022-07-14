import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'uno.css'
// import '@/styles/element-ui.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/app.scss'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
