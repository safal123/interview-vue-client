import { createApp } from 'vue'
import './index.css'

import App from './App.vue'
import Home from './pages/Home.vue'
import Customers from './pages/Customers.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 'path': '/', component: Home },
    { 'path': '/customers', component: Customers },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
