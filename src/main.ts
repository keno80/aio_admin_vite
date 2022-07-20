import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'uno.css'
// import '@/styles/element-ui.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/app.scss'

createApp(App).use(router).use(store).mount('#app')
