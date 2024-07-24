import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    token: null
  }),
  actions: {
    async register(userData) {
      try {
        const response = await axios.post(`${API_BASE_URL}/register'`, userData)
        this.userId = response.data.id
        return response
      } catch (error) {
        return error
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials)
        const { token } = response.data
        this.token = token
        localStorage.setItem('authToken', token)
        return response
      } catch (error) {
        return error
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('authToken')
    }
  }
})
