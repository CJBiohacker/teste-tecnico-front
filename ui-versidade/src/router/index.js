import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeWelcome from '@/views/HomeWelcome.vue'
import LoginRegisterView from '@/views/LoginRegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import UserCardsListView from '@/views/UserCardsListView.vue'

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
      component: () => UserCardsListView
    },
    {
      path: '/login',
      name: 'login',
      component: () => LoginRegisterView
    },
    {
      path: '/register',
      name: 'register',
      component: () => LoginRegisterView
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: () => DashboardView
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
