import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMagicUI from './index'

const app = createApp(App)
app.use(router)
app.use(VueMagicUI)
app.mount('#app')
