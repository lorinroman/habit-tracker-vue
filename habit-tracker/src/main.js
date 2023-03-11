import { createApp } from 'vue'
import App from './App.vue'

//global styles
import './assets/main.css'

//router
import router from './router'

createApp(App).use(router).mount('#app')
