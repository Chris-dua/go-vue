import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/base.css"
import "@/assets/theme.css"
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import router from './router'
import "font-awesome/css/font-awesome.min.css"

const app = createApp(App)
app.use(ArcoVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
