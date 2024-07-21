import { createRouter, createWebHistory } from 'vue-router';
import UserCards from '@/components/UserCards.vue';
import HomeWelcome from '@/views/HomeWelcome.vue';

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

    }
  ]
});

export default router;
