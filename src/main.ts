import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 外部
import i18n from "./plugins/i18n"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.use(ElementPlus)

app.mount('#app')


