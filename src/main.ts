import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { DependenciesLocatorPlugin } from './dependencies/DependeciesLocator'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(DependenciesLocatorPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
