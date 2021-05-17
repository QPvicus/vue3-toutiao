import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
