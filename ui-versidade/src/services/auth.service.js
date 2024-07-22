import { useAuthStore } from '@/stores/auth';

const authService = {
  async register(userData) {
    const authStore = useAuthStore();
    return authStore.register(userData);
  },
  async login(credentials) {
    const authStore = useAuthStore();
    return authStore.login(credentials);
  },
  logout() {
    const authStore = useAuthStore();
    authStore.logout();
  },
};

export default authService;