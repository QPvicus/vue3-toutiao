import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './style/index.less'
import { vantPlguin } from './vantPlugin'
const app = createApp(App)

app.use(store).use(router).use(vantPlguin).mount('#app')
