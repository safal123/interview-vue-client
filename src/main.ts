import { createApp } from 'vue'
import './index.css'
import axios from 'axios'

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

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

createApp(App)
    .use(router)
    .mount('#app')
