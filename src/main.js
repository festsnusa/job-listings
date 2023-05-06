import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import './assets/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
pinia.use(piniaPluginPersistedState)

app.mount('#app')
