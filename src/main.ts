import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 外部
import i18n from "./plugins/i18n"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import 'ant-design-vue/dist/antd.dark.css'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.use(Antd)

app.mount('#app')


