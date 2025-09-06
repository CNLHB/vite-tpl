import { createApp } from 'vue'
// import './common/flexble'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'

const app = createApp(App)
const pinia = createPinia()
const a = 1
console.log('xxx')
console.log('xxx')
console.log('xxx')
console.log('xxx')
app.use(router)

app.use(pinia)

app.mount('#app')
