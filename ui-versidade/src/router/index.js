import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeWelcome from '@/views/HomeWelcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => HomeWelcome
    },
    {
      path: '/users',
      name: 'listUsers',
      component: () => import('@/views/UserCardsListView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginRegisterView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/LoginRegisterView.vue')
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
  } else {
    next()
  }
})

export default router
