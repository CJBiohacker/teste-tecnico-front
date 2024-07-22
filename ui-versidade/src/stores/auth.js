import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async register(userData) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post(`${API_BASE_URL}/register'`, userData);        
        this.user = response.data.user;
        this.isLoading = false;
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },
    async login(credentials) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        const { token, user } = response.data;
        this.token = token;
        this.user = user;
        localStorage.setItem('authToken', token);
        this.isLoading = false;
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
    },
  },
});
