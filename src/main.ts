import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ja from 'element-plus/es/locale/lang/ja'
import App from './App.vue'
import { key, store } from './store'

const app = createApp(App)

app.use(ElementPlus, {
  locale: ja
})

app.use(store, key)

app.mount('#app')
