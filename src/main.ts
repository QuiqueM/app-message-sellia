import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DependenciesLocatorPlugin } from './dependencies/DependeciesLocator'
import { i18n } from '@/plugins/i18n'

import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(DependenciesLocatorPlugin)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
