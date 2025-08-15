import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router/router'
import { createPinia } from 'pinia'

const app : any = createApp(App)
const pinia: any = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
