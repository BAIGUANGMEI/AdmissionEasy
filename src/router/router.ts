import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes : any = [
    { 
        path: '/',
        component: HomeView 
    },
]

const router : any = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router