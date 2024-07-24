import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import UserCards from '@/components/UserCards.vue';
import HomeWelcome from '@/views/HomeWelcome.vue';
import LoginRegisterView from '@/views/LoginRegisterView.vue';

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
      component: () => UserCards,

    },
    {
      path: '/login',
      name: 'login',
      component: () => LoginRegisterView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => LoginRegisterView,
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard',
      component: () => LoginRegisterView,
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;